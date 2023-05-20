package config

import (
	"encoding/json"
	"os"
	"time"
)

type Config struct {
	Timeout         string `json:"timeout"`
	TimeoutDuration time.Duration
	Host            string          `json:"port"`
	Controls        []ControlConfig `json:"controls"`
	filePath        string
}

type ControlConfig struct {
	ElementID string `json:"elementID"`
	DeviceID  int64  `json:"deviceID"`
	PinID     int64  `json:"pinID"`
	IsDisable bool   `json:"isDisable"`
	Type      int64  `json:"type"`
	IsChecked bool   `json:"isChecked"`
	Value     string `json:"-"`
	//Labels    []string `json:"labels"`
}

func NewConfig(filePath string) (*Config, error) {
	cfg := &Config{filePath: filePath}
	file, err := os.Open(filePath)
	if err != nil {
		return nil, err
	}
	err = json.NewDecoder(file).Decode(cfg)
	if err != nil {
		return nil, err
	}
	cfg.TimeoutDuration, err = time.ParseDuration(cfg.Timeout)
	return cfg, err
}

func (c *Config) SaveControlProperties(control ControlConfig) error {
	for i, val := range c.Controls {
		if val.ElementID == control.ElementID {
			c.Controls[i] = control
		}
	}
	file, err := os.Create(c.filePath)
	if err != nil {
		return err
	}
	return json.NewEncoder(file).Encode(c)
}
