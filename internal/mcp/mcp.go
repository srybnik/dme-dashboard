package mcp

import (
	"fmt"
	"github.com/racerxdl/go-mcp23017"
)

type McpManager struct {
	mcps [6]*mcp23017.Device
}

func New() (*McpManager, error) {
	mcp0, err := mcp23017.Open(0, 0)
	if err != nil {
		return nil, fmt.Errorf("can not open mcp-0: %v",err)
	}
	mcp1, err := mcp23017.Open(0, 1)
	if err != nil {
		return nil, fmt.Errorf("can not open mcp-1: %v",err)
	}
	mcp2, err := mcp23017.Open(0, 2)
	if err != nil {
		return nil, fmt.Errorf("can not open mcp-2: %v",err)
	}
	mcp3, err := mcp23017.Open(0, 3)
	if err != nil {
		return nil, fmt.Errorf("can not open mcp-3: %v",err)
	}
	mcp4, err := mcp23017.Open(0, 4)
	if err != nil {
		return nil, fmt.Errorf("can not open mcp-4: %v",err)
	}
	mcp5, err := mcp23017.Open(0, 5)
	if err != nil {
		return nil, fmt.Errorf("can not open mcp-5: %v",err)
	}
	for i := 0; i < 16; i++ {
		err = mcp0.PinMode(uint8(i), mcp23017.OUTPUT)
		if err != nil {
			return nil, fmt.Errorf("can not set pinmode mcp-0: %v",err)
		}
		err = mcp1.PinMode(uint8(i), mcp23017.INPUT)
		if err != nil {
			return nil, fmt.Errorf("can not set pinmode mcp-1: %v",err)
		}
		err = mcp2.PinMode(uint8(i), mcp23017.INPUT)
		if err != nil {
			return nil, fmt.Errorf("can not set pinmode mcp-2: %v",err)
		}
		err = mcp3.PinMode(uint8(i), mcp23017.INPUT)
		if err != nil {
			return nil, fmt.Errorf("can not set pinmode mcp-3: %v",err)
		}
		err = mcp4.PinMode(uint8(i), mcp23017.INPUT)
		if err != nil {
			return nil, fmt.Errorf("can not set pinmode mcp-4: %v",err)
		}
		err = mcp5.PinMode(uint8(i), mcp23017.INPUT)
		if err != nil {
			return nil, fmt.Errorf("can not set pinmode mcp-5: %v",err)
		}
	}
	return &McpManager{
		mcps: [6]*mcp23017.Device{mcp0, mcp1, mcp2, mcp3, mcp4, mcp5},
	}, nil
}

func (m *McpManager) CloseAll() {
	for _, mcp := range m.mcps {
		if mcp != nil {
			mcp.Close()
		}
	}
}

func (m *McpManager) ReadPin(mcp int64, pin int64) (bool, error) {
	val, err := m.mcps[mcp].DigitalRead(uint8(pin))
	return bool(val), err
}

func (m *McpManager) WritePin(mcp int64, pin int64, value bool) error {
	return m.mcps[mcp].DigitalWrite(uint8(pin), mcp23017.PinLevel(value))
}
