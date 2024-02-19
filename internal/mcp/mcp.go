package mcp

import (
	"context"
	"time"

	"github.com/racerxdl/go-mcp23017"
)

type PinMode uint8
type PinLevel bool

const (
	INPUT  PinMode = 0
	OUTPUT         = 1
)

const (
	LOW  PinLevel = false
	HIGH          = true
)

const (
	Devs uint8 = 8
	Pins uint8 = 16
)

type PinValue struct {
	Device int      `json:"device"`
	Pin    int      `json:"pin"`
	Value  PinLevel `json:"value"`
	HasErr bool     `json:"has_err"`
}

var defaultMcpValues [Pins]PinLevel

type McpManager struct {
	mcps       [Devs]*mcp23017.Device
	mcpErrs    [Devs]bool
	pinLevels  [Devs][Pins]PinLevel
	pinModes   [Devs][Pins]PinMode
	outputChan chan PinValue
	inputChan  chan PinValue
}

type Config struct {
	PinModes [Devs][Pins]PinMode
}

func New(cfg *Config) *McpManager {
	return &McpManager{
		pinModes:   cfg.PinModes,
		outputChan: make(chan PinValue, 128),
		inputChan:  make(chan PinValue, 128),
	}
}

func (m *McpManager) SetConfig(cfg *Config) {
	m.pinModes = cfg.PinModes
	for i, mcp := range m.mcps {
		if mcp != nil {
			for pin, val := range m.pinModes[i] {
				mcp.PinMode(uint8(pin), mcp23017.PinMode(val))
			}
		}
	}
}

func (m *McpManager) Run(ctx context.Context) (chan PinValue, chan PinValue) {
	go func() {
		ticker := time.NewTicker(time.Millisecond * 50)
		defer func() {
			ticker.Stop()
			for _, mcp := range m.mcps {
				if mcp != nil {
					mcp.Close()
				}
			}
		}()

		for {
			select {
			case <-ctx.Done():
				return
			case <-ticker.C:
				for i, mcp := range m.mcps {
					if mcp == nil {
						mcp, _ = mcp23017.Open(0, uint8(i))
						if mcp != nil {
							for pin, val := range m.pinModes[i] {
								mcp.PinMode(uint8(pin), mcp23017.PinMode(val))
							}
							m.mcps[i] = mcp
						}
					}

					res, hasErr := mcpRead(mcp)
					if hasErr {
						m.mcps[i] = nil
						mcp.Close()
					}
					for pin, val := range m.pinLevels[i] {
						if val != res[pin] || m.mcpErrs[i] != hasErr {
							m.inputChan <- PinValue{
								Device: i,
								Pin:    pin,
								Value:  res[pin],
								HasErr: hasErr,
							}
							m.pinLevels[i][pin] = res[pin]
							m.mcpErrs[i] = hasErr
						}
					}
				}
			}
		}
	}()

	go func() {
		for {
			select {
			case <-ctx.Done():
				return
			case val := <-m.outputChan:
				if m.pinModes[val.Device][val.Pin] == OUTPUT && m.mcps[val.Device] != nil {
					m.mcps[val.Device].DigitalWrite(uint8(val.Pin), !mcp23017.PinLevel(val.Value)) //надо инверс почемуто
				}
			}
		}
	}()

	return m.inputChan, m.outputChan
}

func mcpRead(mcp *mcp23017.Device) ([Pins]PinLevel, bool) {
	mcpValues := defaultMcpValues
	if mcp == nil {
		return mcpValues, false
	}

	res, err := mcp.ReadGPIOAB()
	if err != nil {
		return mcpValues, true
	}
	res = res<<8 + res>>8 //меняем местами первые 8бит, сначала идет порт A потом B

	for i := range mcpValues {
		bit := uint8(i)
		if uint8(res>>bit)&0x1 > 0 {
			mcpValues[i] = HIGH
		}
	}
	return mcpValues, false
}
