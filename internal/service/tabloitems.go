package service

import (
	"context"
	"fmt"
	"sync"

	"github.com/srybnik/dme-dashboard/internal/mcp"
	"github.com/srybnik/dme-dashboard/internal/models"
)

type TabloItem struct {
	ID        int
	TypeID    int
	IsInverse bool
	IsActive  bool

	BoardID int
	PinID   int

	ManageBoardID int
	ManagePinID   int

	Value  bool
	HasErr bool

	msgCh       chan models.Msg
	mcpOutputCh chan mcp.PinValue

	mu sync.Mutex
}

func NewTabloItem(
	id int,
	boardID int,
	pinID int,
	manageBoardID int,
	managePinID int,
	isInverse bool,
	isActive bool,
	msgCh chan models.Msg,
	mcpOutputCh chan mcp.PinValue,
) *TabloItem {
	return &TabloItem{
		ID:            id,
		TypeID:        ItemTypeTablo,
		IsInverse:     isInverse,
		IsActive:      isActive,
		BoardID:       boardID,
		PinID:         pinID,
		ManageBoardID: manageBoardID,
		ManagePinID:   managePinID,
		msgCh:         msgCh,
		mcpOutputCh:   mcpOutputCh,
	}
}

func (t *TabloItem) SendMsgCurrentValue() {
	t.msgCh <- models.Msg{
		ID:     t.ID,
		TypeID: t.TypeID,
		Value:  fmt.Sprintf("%v", t.Value),
	}
}

func (t *TabloItem) SetFromMcpValue(ctx context.Context, val bool, err bool) {
	t.mu.Lock()
	defer t.mu.Unlock()

	if t.IsInverse {
		val = !val
	}

	if t.Value == val && t.HasErr == err {
		return
	}

	t.Value = val
	t.HasErr = err

	t.SendMsgCurrentValue()

}

func (t *TabloItem) SetToMcpValue(ctx context.Context, val bool) {
	t.mu.Lock()
	defer t.mu.Unlock()

	if t.IsInverse {
		val = !val
	}

	msg := mcp.PinValue{
		Device: t.BoardID,
		Pin:    t.PinID,
		Value:  mcp.PinLevel(val),
		Mode:   mcp.OUTPUT,
	}

	select {
	case <-ctx.Done():
	case t.mcpOutputCh <- msg:
	}

	msg = mcp.PinValue{
		Device: t.ManageBoardID,
		Pin:    t.ManagePinID,
		Value:  mcp.PinLevel(t.IsActive),
		Mode:   mcp.OUTPUT,
	}

	select {
	case <-ctx.Done():
	case t.mcpOutputCh <- msg:
	}
}
