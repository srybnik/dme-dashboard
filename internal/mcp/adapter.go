package mcp

import (
	"fmt"
	"time"

	"github.com/racerxdl/go-mcp23017"
)

type McpAdapter struct {
	debug bool
}

func NewMcpAdapter(debug bool) *McpAdapter {
	return &McpAdapter{debug: debug}
}

func (m *McpAdapter) Open(bus, devNum uint8) (Device, error) {
	if m.debug {
		return NewMcpDummy(devNum), nil
	}
	return mcp23017.Open(bus, devNum)
}

type McpDummy struct {
	devNum uint8
	portA  uint8
	portB  uint8
}

func NewMcpDummy(devNum uint8) *McpDummy {
	mcp := McpDummy{devNum: devNum, portA: 255, portB: 255}
	go mcp.worker()
	return &mcp
}

func (m *McpDummy) ReadGPIOAB() (uint16, error) {
	// имитация выхода из строя
	if m.devNum == 4 && time.Now().Minute()%2 == 0 {
		return 0, fmt.Errorf("mcp adapter does not support GPIO")
	}
	return uint16(m.portA)<<8 + uint16(m.portB), nil
}

func (m *McpDummy) DigitalWrite(pin uint8, level mcp23017.PinLevel) error {
	v := uint8(0)
	if level == mcp23017.LOW {
		v = 1
	}

	bit := bitForPin(pin)

	if pin < 8 {
		m.portA = bitWrite(m.portA, bit, v)
	} else {
		m.portB = bitWrite(m.portB, bit, v)
	}

	return nil
}

func (m *McpDummy) PinMode(pin uint8, mode mcp23017.PinMode) error {
	return nil
}

func (m *McpDummy) Close() error {
	return nil
}

func bitForPin(pin uint8) uint8 {
	return pin % 8
}

func bitRead(value, bit uint8) uint8 {
	return value >> bit & 0x01
}

func bitSet(value, bit uint8) uint8 {
	return value | 1<<bit
}

func bitClear(value, bit uint8) uint8 {
	return value & ^(1 << bit)
}

func bitWrite(value, bit, b uint8) uint8 {
	if b > 0 {
		return bitSet(value, bit)
	}
	return bitClear(value, bit)
}

func (m *McpDummy) worker() {
	// имитируем работу
	if m.devNum == 1 {
		for {
			time.Sleep(20 * time.Second)
			m.portA = 255
			time.Sleep(20 * time.Second)
			m.portA = 0
		}
	}
}
