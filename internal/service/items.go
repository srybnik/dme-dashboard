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

	Wait  bool
	Blink bool
	mu    sync.Mutex

	msgCh       chan models.Msg
	signalCh    chan struct{}
	mcpOutputCh chan mcp.PinValue
	stopBlink   context.CancelFunc
	stopWait    context.CancelFunc

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
			c.mu.Lock()
			c.PreValue = c.Value
			c.Blink = false
			c.mu.Unlock()
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

func (c *Item) SetFromMcpValue(ctx context.Context, val bool, err bool) {
	c.mu.Lock()
	defer c.mu.Unlock()

	if c.IsInverse {
		val = !val
	}

	if c.Value == val && c.HasErr == err {
		return
	}

	c.Value = val
	c.HasErr = err

	if !c.IsInput {
		return
	}

	if c.stopWait != nil {
		c.stopWait()
	}
	waitCtx, cancel := context.WithCancel(ctx)
	c.stopWait = cancel

	if c.PreValue == val && c.HasErr == err {
		return
	}

	//if !c.Wait {
	c.Wait = true

	go func() {
		timer := time.NewTimer(c.dur)
		defer timer.Stop()
		select {
		case <-ctx.Done():
			return
		case <-waitCtx.Done():
			c.mu.Lock()
			defer c.mu.Unlock()
			c.Wait = false
			return
		case <-timer.C:
			c.mu.Lock()
			defer c.mu.Unlock()
			c.Wait = false

			if c.Value == val && c.HasErr == err {
				c.StopBlink()
				bCtx, cancel := context.WithCancel(ctx)
				c.stopBlink = cancel
				c.Blink = true
				c.StartBlink(bCtx)
			}
		}
	}()
	//}
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
	c.Value = c.repo.GetValue(c.ID)
	c.PreValue = c.Value

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
