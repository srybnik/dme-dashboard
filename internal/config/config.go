package config

import (
	"encoding/json"
	"fmt"
	"os"
)

type Config struct {
	TabloItems []struct {
		ID            int    `json:"id"`
		Name          string `json:"name"`
		BoardID       int    `json:"boardID"`
		PinID         int    `json:"pinID"`
		ManageBoardID int    `json:"manageBoardID"`
		ManagePinID   int    `json:"managePinID"`
		IsActive      bool   `json:"isActive"`
		IsInverse     bool   `json:"isInverse"`
	} `json:"tabloItems"`
	Objects []struct {
		ObjectID   int    `json:"objectID"`
		ObjectName string `json:"objectName"`
		PanelID    int    `json:"panelID"`
	} `json:"objects"`
	Items []struct {
		ID        int     `json:"id"`
		Name      string  `json:"name"`
		TypeID    int     `json:"typeID"`
		ObjectID  int     `json:"objectID"`
		BoardID   int     `json:"boardID"`
		PinID     int     `json:"pinID"`
		IsInput   bool    `json:"isInput"`
		IsActive  bool    `json:"isActive"`
		IsInverse bool    `json:"isInverse"`
		Duration  float32 `json:"duration"`
	} `json:"items"`
	Comment string `json:"comment"`
}

const cfgFileName = "cfg.json"

func NewConfig() (*Config, error) {
	var cfg Config
	file, err := os.Open(cfgFileName)
	if err != nil {
		return nil, fmt.Errorf("can not open file: %w", err)
	}
	err = json.NewDecoder(file).Decode(&cfg)
	if err != nil {
		return nil, fmt.Errorf("can not decode file: %w", err)
	}

	return &cfg, nil
}

func (c *Config) Update(fileBody []byte) error {
	err := json.Unmarshal(fileBody, &c)
	if err != nil {
		return fmt.Errorf("can not unmarshal file: %w", err)
	}

	file, err := os.Create(cfgFileName)
	if err != nil {
		return fmt.Errorf("can not create file: %w", err)
	}

	if _, err = file.Write(fileBody); err != nil {
		return fmt.Errorf("can not write file: %w", err)
	}
	return nil
}

func (c *Config) Get() ([]byte, error) {
	body, err := json.Marshal(&c)
	if err != nil {
		return nil, fmt.Errorf("can not marshal file: %w", err)
	}
	return body, nil
}
