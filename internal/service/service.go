package service

import (
	"encoding/json"
	"fmt"
	"github.com/srybnik/dme-dashboard/internal/buzzer"
	"github.com/srybnik/dme-dashboard/internal/controls"
	"github.com/srybnik/dme-dashboard/internal/handler"
	"github.com/srybnik/dme-dashboard/internal/mcp"
	"time"
)

type Service struct {
	apiHandler     *handler.Handler
	mcpManager     *mcp.McpManager
	buzzer         *buzzer.Buzzer
	controlManager *controls.ControlManager
	//logRepo        *repo.Repo
}

func New(controlManager *controls.ControlManager, apiHandler *handler.Handler, mcpManager *mcp.McpManager, buzzer *buzzer.Buzzer) *Service {
	return &Service{
		apiHandler:     apiHandler,
		mcpManager:     mcpManager,
		buzzer:         buzzer,
		controlManager: controlManager,
		//logRepo:        logRepo,
	}
}

func (s *Service) Start() error {
	chanError := make(chan error)

	//обработка обновлений
	go func() {
		for range s.apiHandler.RefreshNotify() {
			err := s.RefreshAll()
			if err != nil {
				chanError <- err
				return
			}
		}
	}()

	//обработка сокет сообщений
	go func() {
		for msg := range s.apiHandler.ReadWebsocketMessage() {
			s.ServeMsg(msg)
		}
	}()

	//отображение текущего времени
	go func() {
		location, _ := time.LoadLocation("Europe/Moscow")
		timer := time.Tick(1 * time.Second)
		for t := range timer {
			if err := s.SetElementProperties("timer", controls.ControlTypeTimer, "", false, t.In(location).Format("15:04:05")); err != nil {
				chanError <- err
				return
			}
		}
	}()

	//обход пинов платы
	go func() {
		type key struct {
			DeviceID int64
			PinID    int64
		}
		type val struct {
			Value   bool
			Expired time.Time
		}
		cache := make(map[key]val)

		//получение значений при старте, не мигаем
		for _, control := range s.controlManager.Controls {
			if control.Type == controls.ControlTypeButton {
				if err := s.mcpManager.WritePin(control.McpParam.DeviceID, control.McpParam.PinID, control.IsChecked); err != nil {
					chanError <- err
					return
				}
			}
			currentValue, err := s.mcpManager.ReadPin(control.McpParam.DeviceID, control.McpParam.PinID)
			if err != nil {
				chanError <- err
				return
			}
			//if control.Type == controls.ControlTypeButton {
			//	currentValue = !currentValue
			//}
			if control.Type == controls.ControlTypePanel && control.ElementID != "Led19" {
				currentValue = !currentValue
			}
			k := key{
				DeviceID: control.McpParam.DeviceID,
				PinID:    control.McpParam.PinID,
			}
			cache[k] = val{
				Value:   currentValue,
				Expired: time.Now().Add(2 * time.Second),
			}
			control.McpParam.Value = currentValue
		}

		for {
			for _, control := range s.controlManager.Controls {
				if control.IsDisable {
					continue
				}
				currentValue, err := s.mcpManager.ReadPin(control.McpParam.DeviceID, control.McpParam.PinID)
				if err != nil {
					chanError <- err
					return
				}
				//if control.Type == controls.ControlTypeButton {
				//	currentValue = !currentValue
				//}
				if control.Type == controls.ControlTypePanel && control.ElementID != "Led19" {
					currentValue = !currentValue
				}
				k := key{
					DeviceID: control.McpParam.DeviceID,
					PinID:    control.McpParam.PinID,
				}
				v := cache[k]
				if v.Value != currentValue {
					v.Value = currentValue
					v.Expired = time.Now().Add(2 * time.Second)
					cache[k] = v
				}

				if control.McpParam.Value != currentValue && time.Now().After(v.Expired) {
					control.McpParam.Value = currentValue
					err = s.RefreshAll()
					if err != nil {
						chanError <- err
						return
					}
					if control.Type == controls.ControlTypeLed || control.Type == controls.ControlTypePanel {
						s.controlManager.Lock()
						s.controlManager.ControlsBlink = append(s.controlManager.ControlsBlink, control)
						s.controlManager.Unlock()
					}
					//s.logRepo.Event("%s: %t", control.GetName(), control.IsChecked)
				}
				time.Sleep(time.Millisecond * 10)
			}
			time.Sleep(time.Second / 2)
		}
	}()

	//мигание и бузер
	go func() {
		for {
			if len(s.controlManager.ControlsBlink) == 0 {
				continue
			}
			s.controlManager.Lock()
			for _, control := range s.controlManager.ControlsBlink {
				err := s.SetElementProperties(control.ElementID, control.Type, control.GetColor(), control.IsChecked, "")
				if err != nil {
					chanError <- err
					return
				}
			}
			s.controlManager.Unlock()

			err := s.SetElementProperties("buzzer", controls.ControlTypeBuzzer, controls.BuzzerColorBlink, false, "")
			if err != nil {
				chanError <- err
				return
			}

			err = s.buzzer.Tone(2000, 0.800)
			if err != nil {
				time.Sleep(time.Second)
			}

			s.controlManager.Lock()
			for _, control := range s.controlManager.ControlsBlink {
				err := s.SetElementProperties(control.ElementID, control.Type, control.GetColorBlink(), control.IsChecked, "")
				if err != nil {
					chanError <- err
					return
				}
			}
			s.controlManager.Unlock()

			err = s.SetElementProperties("buzzer", controls.ControlTypeBuzzer, controls.BuzzerColor, false, "")
			if err != nil {
				chanError <- err
				return
			}

			time.Sleep(time.Second / 3)
		}
	}()

	return <-chanError
}

func (s *Service) SetElementProperties(elementID string, controlType int64, color string, isChecked bool, value string) error {
	msg := struct {
		ElementID   string `json:"elementID"`
		ControlType int64  `json:"controlType"`
		Color       string `json:"color"`
		IsChecked   bool   `json:"isChecked"`
		Value       string `json:"value"`
		//Label       string `json:"label"`
	}{
		ElementID:   elementID,
		ControlType: controlType,
		Color:       color,
		IsChecked:   isChecked,
		Value:       value,
		//Label:       label,
	}
	body, err := json.Marshal(msg)
	if err != nil {
		return err
	}
	return s.apiHandler.WriteWebsocketMessage(body)
}

func (s *Service) ServeMsg(msg []byte) {
	m := struct {
		ElementID   string `json:"elementID"`
		ControlType int64  `json:"controlType"`
		IsChecked   bool   `json:"isChecked"`
	}{}
	err := json.Unmarshal(msg, &m)
	if err != nil {
		fmt.Println(err)
		return
	}

	if m.ControlType == controls.ControlTypeBuzzer {
		s.controlManager.ControlsBlink = []*controls.Control{}
	}
	if m.ControlType == controls.ControlTypeButton {
		control, err := s.controlManager.GetByElementID(m.ElementID)
		if err != nil {
			fmt.Println(err)
			return
		}
		err = s.mcpManager.WritePin(control.McpParam.DeviceID, control.McpParam.PinID, m.IsChecked)
		if err != nil {
			fmt.Println(err)
			return
		}
		control.IsChecked = m.IsChecked
		err = s.controlManager.SaveControlProperties(control)
		if err != nil {
			fmt.Println(err)
		}
	}
	s.RefreshAll()
}

func (s *Service) RefreshAll() error {
	for _, control := range s.controlManager.Controls {
		err := s.SetElementProperties(control.ElementID, control.Type, control.GetColor(), control.IsChecked, "")
		if err != nil {
			return err
		}
	}
	return s.SetElementProperties("buzzer", controls.ControlTypeBuzzer, controls.BuzzerColor, false, "")
}
