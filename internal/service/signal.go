package service

import (
	"context"
	"github.com/srybnik/dme-dashboard/internal/models"
	"time"
)

func (s *Service) StopSignal() {
	select {
	case s.stopSignalCh <- struct{}{}:
	default:
	}
	for _, item := range s.itemIDs {
		item.StopBlink()
	}
}

func (s *Service) StartSignal(ctx context.Context) {
	defer s.SendMsgStopSignal()

	ticker := time.NewTicker(1 * time.Second)
	defer ticker.Stop()
	for {
		s.SendMsgSignal()

		select {
		case <-ctx.Done():
			return
		case <-s.stopSignalCh:
			return
		case <-ticker.C:
		}

		s.SendMsgStopSignal()

		select {
		case <-ctx.Done():
			return
		case <-s.stopSignalCh:
			return
		case <-ticker.C:
		}
	}

}

func (s *Service) SendMsgSignal() {
	s.msgCh <- models.Msg{
		ID:     1,
		TypeID: ItemTypeSignal,
		Value:  "imgred",
	}
}

func (s *Service) SendMsgStopSignal() {
	s.msgCh <- models.Msg{
		ID:     1,
		TypeID: ItemTypeSignal,
		Value:  "img",
	}
}
