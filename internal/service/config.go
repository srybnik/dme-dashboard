package service

import "time"

func (s *Service) GetConfig() ([]byte, error) {
	return s.cfg.Get()
}

func (s *Service) UpdateConfig(body []byte) error {
	err := s.cfg.Update(body)
	if err != nil {
		return err
	}
	go func() {
		time.Sleep(3 * time.Second)
		s.Close()
	}()

	return nil
}
