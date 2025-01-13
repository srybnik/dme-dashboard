package service

import (
	"context"
	"encoding/json"
	"fmt"
	"sync"
	"time"

	"github.com/gorilla/websocket"
	"github.com/rs/zerolog/log"
	"github.com/srybnik/dme-dashboard/internal/config"
	"github.com/srybnik/dme-dashboard/internal/mcp"
	"github.com/srybnik/dme-dashboard/internal/models"
	"github.com/srybnik/dme-dashboard/internal/repo"
)

const (
	ItemTypeLed = iota + 1
	ItemTypePanel
	ItemTypeSlider
	ItemTypeSignal
	ItemTypeTablo
	ItemTypeTimer
	ItemTypeErr
)

type Service struct {
	cfg  *config.Config
	mcp  *mcp.McpManager
	repo *repo.Repo

	conns map[*websocket.Conn]struct{}
	mu    sync.RWMutex

	itemKeys map[ItemMcpKey]*Item
	itemIDs  map[int]*Item

	tabloItemKeys map[ItemMcpKey]*TabloItem
	tabloItemIDs  map[int]*TabloItem

	wg           sync.WaitGroup
	msgCh        chan models.Msg
	signalCh     chan struct{}
	stopSignalCh chan struct{}
	refreshCh    chan struct{}

	ctx        context.Context
	cancelFunc context.CancelFunc

	mcpErr [mcp.Devs]bool
}

func New(cfg *config.Config, m *mcp.McpManager, r *repo.Repo) *Service {
	return &Service{
		cfg:   cfg,
		mcp:   m,
		repo:  r,
		conns: make(map[*websocket.Conn]struct{}),

		msgCh:        make(chan models.Msg, 50),
		signalCh:     make(chan struct{}),
		stopSignalCh: make(chan struct{}),
		refreshCh:    make(chan struct{}),
	}
}

func (s *Service) Start(ctx context.Context, cancelFunc context.CancelFunc) {
	s.ctx = ctx
	s.cancelFunc = cancelFunc

	s.itemKeys = make(map[ItemMcpKey]*Item)
	s.itemIDs = make(map[int]*Item)
	s.tabloItemKeys = make(map[ItemMcpKey]*TabloItem)
	s.tabloItemIDs = make(map[int]*TabloItem)

	mcpInputCh, mcpOutputCh := s.mcp.Run(ctx)

	for _, v := range s.cfg.Items {
		if v.IsActive {
			item := NewItem(v.ID, v.TypeID, v.BoardID, v.PinID, v.Duration, v.IsInverse, v.IsInput, s.msgCh, s.signalCh, mcpOutputCh, s.repo)
			s.itemKeys[ItemMcpKey{v.BoardID, v.PinID}] = item
			s.itemIDs[v.ID] = item

			item.Init(ctx)
		}
	}

	for _, v := range s.cfg.TabloItems {
		item := NewTabloItem(v.ID, v.BoardID, v.PinID, v.ManageBoardID, v.ManagePinID, v.IsInverse, v.IsActive, s.msgCh, mcpOutputCh, s.repo)
		s.tabloItemKeys[ItemMcpKey{v.BoardID, v.PinID}] = item
		s.tabloItemIDs[v.ID] = item

		item.Init(ctx)
	}

	// Чтение изменений из mcp
	s.wg.Add(1)
	go func() {
		defer s.wg.Done()
		for {
			select {
			case <-ctx.Done():
				return
			case msg := <-mcpInputCh:
				if item, ok := s.itemKeys[ItemMcpKey{msg.Device, msg.Pin}]; ok {
					item.SetFromMcpValue(ctx, bool(msg.Value), msg.HasErr)
				}

				if item, ok := s.tabloItemKeys[ItemMcpKey{msg.Device, msg.Pin}]; ok {
					item.SetFromMcpValue(ctx, bool(msg.Value), msg.HasErr)
				}

				s.mcpErr[msg.Device] = msg.HasErr
			}
		}
	}()

	// Обновление текущих данных
	s.wg.Add(1)
	go func() {
		defer s.wg.Done()

		ticker := time.NewTicker(5100 * time.Millisecond)
		defer ticker.Stop()

		tickerRange := time.NewTicker(220 * time.Millisecond)
		defer tickerRange.Stop()
		for {
			select {
			case <-ctx.Done():
				return
			case <-s.refreshCh:
			case <-ticker.C:
			}

			for _, item := range s.itemIDs {
				if !item.Wait {
					select {
					case <-ctx.Done():
						return
					case <-tickerRange.C:
					}
					item.SendMsgCurrentValue()
				}
			}
			for _, item := range s.tabloItemIDs {
				item.SendMsgCurrentValue()
			}
		}
	}()

	// Обработка сигнла сирены
	s.wg.Add(1)
	go func() {
		defer s.wg.Done()
		time.Sleep(10 * time.Second)
		for {
			select {
			case <-ctx.Done():
				return
			case <-s.signalCh:
				s.StartSignal(ctx)
			}
		}
	}()

	// отправка в сокеты
	s.wg.Add(1)
	go func() {
		defer s.wg.Done()
		for {
			select {
			case <-ctx.Done():
				return
			case msg := <-s.msgCh:
				msgBody, err := json.Marshal(msg)
				if err != nil {
					log.Error().Msgf("can not marshal msg: %v", err)
					continue
				}
				s.mu.RLock()
				for conn := range s.conns {
					conn.WriteMessage(1, msgBody)
				}
				s.mu.RUnlock()
			}
		}
	}()

	// Таймер
	s.wg.Add(1)
	go func() {
		defer s.wg.Done()
		ticker := time.NewTicker(1 * time.Second)
		defer ticker.Stop()
		for {
			select {
			case <-ctx.Done():
				return
			case t := <-ticker.C:
				s.msgCh <- models.Msg{
					ID:     2,
					TypeID: ItemTypeTimer,
					Value:  t.Format("15:04:05"),
				}
			}
		}
	}()

	// Чек отвалившихся плат
	s.wg.Add(1)
	go func() {
		defer s.wg.Done()
		ticker := time.NewTicker(5 * time.Second)
		defer ticker.Stop()

		var preErr bool

		for {
			select {
			case <-ctx.Done():
				return
			case <-ticker.C:
				var hasErr bool
				for _, item := range s.itemIDs {
					if item.HasErr && !item.Wait {
						hasErr = true
						break
					}
				}

				var color = "timer"
				if hasErr {
					color = "redtimer"
				}

				s.msgCh <- models.Msg{
					ID:     2,
					TypeID: ItemTypeErr,
					Value:  color,
				}

				if !hasErr {
					preErr = false
					continue
				}

				if hasErr && !preErr {
					preErr = true
					select {
					case s.signalCh <- struct{}{}:
					default:
					}
				}
			}
		}
	}()

}

func (s *Service) Wait() {
	s.mcp.Wait()
	s.wg.Wait()
}

func (s *Service) Close() {
	if s.cancelFunc != nil {
		s.cancelFunc()
	}
}

func (s *Service) Websocket(ctx context.Context, conn *websocket.Conn) error {
	s.mu.Lock()
	s.conns[conn] = struct{}{}
	s.mu.Unlock()

	defer func() {
		s.mu.Lock()
		delete(s.conns, conn)
		s.mu.Unlock()
	}()

	s.refreshCh <- struct{}{}

	msgCh := make(chan models.Msg)
	errCh := make(chan error)
	go func() {
		for {
			_, body, err := conn.ReadMessage()
			if err != nil {
				errCh <- err
				return
			}

			var msg models.Msg
			if err = json.Unmarshal(body, &msg); err != nil {
				errCh <- err
				return
			}
			msgCh <- msg
		}
	}()

	for {
		select {
		case <-ctx.Done():
			return ctx.Err()
		case <-s.ctx.Done():
			return fmt.Errorf("service closed")
		case err := <-errCh:
			return err
		case msg := <-msgCh:

			switch msg.TypeID {
			case ItemTypeSlider:
				if item, ok := s.itemIDs[msg.ID]; ok {
					item.SetToMcpValue(ctx, strToBool(msg.Value))
				}
			case ItemTypeTablo:
				if item, ok := s.tabloItemIDs[msg.ID]; ok {
					item.SetToMcpValue(ctx, strToBool(msg.Value))
				}
			case ItemTypeSignal:
				s.StopSignal()
			default:
				return fmt.Errorf("unsupported message type: %v", msg.TypeID)
			}
		}
	}
}

func strToBool(s string) bool {
	if s == "true" {
		return true
	}
	return false
}

func (s *Service) GetActiveBoards() []int {
	var res []int
	for i, hasErr := range s.mcpErr {
		if !hasErr {
			res = append(res, i)
		}
	}
	return res
}
