package service

import (
	"context"
	"fmt"
	"sync"
	"time"

	"github.com/srybnik/dme-dashboard/internal/mcp"
	"github.com/srybnik/dme-dashboard/internal/models"
)

type ItemMcpKey struct {
	BoardID int
	PinID   int
}

type Item struct {
	ID        int
	TypeID    int
	IsInverse bool
	IsInput   bool
	dur       time.Duration

	BoardID  int
	PinID    int
	PreValue bool
	Value    bool
	HasErr   bool

	init      bool
	initValue bool

	mu sync.Mutex

	msgCh       chan models.Msg
	signalCh    chan struct{}
	mcpOutputCh chan mcp.PinValue

	bCtx      context.Context
	stopBlink context.CancelFunc

	waitCtx  context.Context
	stopWait context.CancelFunc

	repo Repo
}

func NewItem(id int,
	typeID int,
	boardID int,
	pinID int,
	durSec float32,
	isInverse bool,
	isInput bool,
	msgCh chan models.Msg,
	signalCh chan struct{},
	mcpOutputCh chan mcp.PinValue,
	repo Repo,
) *Item {
	return &Item{
		ID:          id,
		TypeID:      typeID,
		IsInverse:   isInverse,
		IsInput:     isInput,
		dur:         time.Duration(durSec*1000) * time.Millisecond,
		BoardID:     boardID,
		PinID:       pinID,
		msgCh:       msgCh,
		signalCh:    signalCh,
		mcpOutputCh: mcpOutputCh,
		repo:        repo,
	}
}

func (c *Item) StartBlink(ctx context.Context) {
	go func() {
		defer func() {
			c.PreValue = c.Value
			c.init = false
			c.SendMsgCurrentValue()
		}()

		select {
		case c.signalCh <- struct{}{}:
		default:
		}

		ticker := time.NewTicker(500 * time.Millisecond)
		defer ticker.Stop()
		for {
			c.SendMsgBlinkValue()

			select {
			case <-ctx.Done():
				return
			case <-ticker.C:
			}

			c.SendMsgCurrentValue()

			select {
			case <-ctx.Done():
				return
			case <-ticker.C:
			}
		}
	}()
}

func (c *Item) SendMsgCurrentValue() {
	c.msgCh <- models.Msg{
		ID:     c.ID,
		TypeID: c.TypeID,
		Value:  c.Color(),
	}
}

func (c *Item) SendMsgBlinkValue() {
	c.msgCh <- models.Msg{
		ID:     c.ID,
		TypeID: c.TypeID,
		Value:  c.ColorBlink(),
	}
}

func (c *Item) StopBlink() {
	if c.stopBlink != nil {
		c.stopBlink()
	}
}

func (c *Item) IsBlink() bool {
	if c.bCtx == nil {
		return false
	}
	select {
	case <-c.bCtx.Done():
		return false
	default:
		return true
	}
}

func (c *Item) StopWait() {
	if c.stopWait != nil {
		c.stopWait()
	}
}

func (c *Item) IsWait() bool {
	if c.waitCtx == nil {
		return false
	}
	select {
	case <-c.waitCtx.Done():
		return false
	default:
		return true
	}
}

func (c *Item) SetFromMcpValue(ctx context.Context, val bool, err bool) {
	c.mu.Lock()
	defer c.mu.Unlock()

	if c.IsInverse {
		val = !val
	}

	if c.init && c.initValue == val && !err {
		c.Value = c.initValue
		c.PreValue = c.initValue
		c.HasErr = false
		c.init = false
		c.StopWait()
		c.StopBlink()
		return
	}

	if c.Value == val && c.HasErr == err {
		return
	}

	c.Value = val
	c.HasErr = err

	if !c.IsInput {
		return
	}

	c.StopWait()

	if c.PreValue == val && c.HasErr == err {
		return
	}

	waitCtx, cancel := context.WithCancel(ctx)
	c.waitCtx = waitCtx
	c.stopWait = cancel

	go func() {
		defer cancel()
		timer := time.NewTimer(c.dur)
		defer timer.Stop()
		select {
		case <-ctx.Done():
			return
		case <-waitCtx.Done():
			return
		case <-timer.C:
			c.mu.Lock()
			defer c.mu.Unlock()

			if c.Value == val && c.HasErr == err {
				c.StopBlink()
				bCtx, cancel := context.WithCancel(ctx)
				c.bCtx = bCtx
				c.stopBlink = cancel
				c.StartBlink(bCtx)
				c.repo.SetValue(c.ID, c.Value)
			}
		}
	}()
}

func (c *Item) SetToMcpValue(ctx context.Context, val bool) {
	c.mu.Lock()
	defer c.mu.Unlock()

	if c.IsInverse {
		val = !val
	}

	msg := mcp.PinValue{
		Device: c.BoardID,
		Pin:    c.PinID,
		Value:  mcp.PinLevel(val),
		Mode:   mcp.GetMode(c.IsInput),
	}

	select {
	case <-ctx.Done():
	case c.mcpOutputCh <- msg:
	}

	c.repo.SetValue(c.ID, val)
}

func (c *Item) Init(ctx context.Context) {
	c.initValue = c.repo.GetValue(c.ID)
	c.init = true
	c.Value = c.initValue
	c.PreValue = c.initValue

	msg := mcp.PinValue{
		Device: c.BoardID,
		Pin:    c.PinID,
		Value:  mcp.PinLevel(c.Value),
		Mode:   mcp.GetMode(c.IsInput),
	}

	select {
	case <-ctx.Done():
	case c.mcpOutputCh <- msg:
	}
}

func (c *Item) Color() string {
	if c.HasErr && c.TypeID != ItemTypeSlider {
		return "redblink"
	}

	switch c.TypeID {
	case ItemTypeSlider:
		return fmt.Sprintf("%v", c.Value)
	case ItemTypeLed:
		if c.Value {
			return "green"
		}
		return "red"
	case ItemTypePanel:
		if c.Value {
			return "white"
		}
		return "red"
	default:
		return "white"
	}
}

func (c *Item) ColorBlink() string {
	if c.HasErr && c.TypeID != ItemTypeSlider {
		return "red"
	}

	switch c.TypeID {
	case ItemTypeSlider:
		return fmt.Sprintf("%v", c.Value)
	case ItemTypeLed:
		if !c.PreValue && c.Value {
			return "greenblink"
		}
		return "redblink"
	case ItemTypePanel:
		if !c.PreValue && c.Value {
			return "red"
		}
		return "redblink"
	default:
		return "white"
	}
}
