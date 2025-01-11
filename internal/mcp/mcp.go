package mcp

import (
	"context"
	"sync"
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
	Device int
	Pin    int
	Value  PinLevel
	HasErr bool
	Mode   PinMode
}

type Device interface {
	ReadGPIOAB() (uint16, error)
	DigitalWrite(uint8, mcp23017.PinLevel) error
	PinMode(uint8, mcp23017.PinMode) error
	Close() error
}

type Adapter interface {
	Open(bus, devNum uint8) (Device, error)
}

var defaultMcpValues [Pins]PinLevel

type McpManager struct {
	adapter         Adapter
	mcps            [Devs]Device
	mcpErrs         [Devs]bool
	pinLevels       [Devs][Pins]PinLevel
	pinOutputLevels [Devs][Pins]PinLevel
	pinModes        [Devs][Pins]PinMode
	outputCh        chan PinValue
	inputCh         chan PinValue
	wg              sync.WaitGroup
}

func New(adapter Adapter) *McpManager {
	return &McpManager{
		adapter:  adapter,
		outputCh: make(chan PinValue),
		inputCh:  make(chan PinValue),
	}
}

func (m *McpManager) Run(ctx context.Context) (chan PinValue, chan PinValue) {
	m.wg.Add(1)
	go func() {
		ticker := time.NewTicker(50 * time.Millisecond)
		refreshTicker := time.NewTicker(3 * time.Second)
		defer func() {
			ticker.Stop()
			refreshTicker.Stop()
			for _, mcp := range m.mcps {
				if mcp != nil {
					_ = mcp.Close()
				}
			}
			m.wg.Done()
		}()

		for {
			select {
			case <-ctx.Done():
				return
			case <-ticker.C:
				for i, mcp := range m.mcps {
					if mcp == nil {
						var err error
						mcp, err = m.adapter.Open(0, uint8(i))
						if err != nil {
							m.mcpErrs[i] = true
							continue
						}
						for pin, val := range m.pinModes[i] {
							_ = mcp.PinMode(uint8(pin), mcp23017.PinMode(val))
							if val == OUTPUT {
								_ = mcp.DigitalWrite(uint8(pin), !mcp23017.PinLevel(m.pinOutputLevels[i][pin]))
							}
						}
						m.mcps[i] = mcp
					}

					res, hasErr := mcpRead(mcp)
					if hasErr {
						m.mcps[i] = nil
						_ = mcp.Close()
					}
					for pin, val := range m.pinLevels[i] {
						if val != res[pin] || m.mcpErrs[i] != hasErr {
							m.inputCh <- PinValue{
								Device: i,
								Pin:    pin,
								Value:  res[pin],
								HasErr: hasErr,
								Mode:   m.pinModes[i][pin],
							}
							m.pinLevels[i][pin] = res[pin]
							m.mcpErrs[i] = hasErr
						}
					}
				}
			case <-refreshTicker.C:
				for i := range m.mcps {
					for pin := range m.pinLevels[i] {
						m.inputCh <- PinValue{
							Device: i,
							Pin:    pin,
							Value:  m.pinLevels[i][pin],
							HasErr: m.mcpErrs[i],
							Mode:   m.pinModes[i][pin],
						}
					}
				}
			}
		}
	}()

	m.wg.Add(1)
	go func() {
		defer m.wg.Done()

		for {
			select {
			case <-ctx.Done():
				return
			case val := <-m.outputCh:
				if m.pinModes[val.Device][val.Pin] != val.Mode {
					m.pinModes[val.Device][val.Pin] = val.Mode
					if m.mcps[val.Device] != nil {
						_ = m.mcps[val.Device].PinMode(uint8(val.Pin), mcp23017.PinMode(val.Mode))
					}
				}
				m.pinOutputLevels[val.Device][val.Pin] = val.Value

				if m.pinModes[val.Device][val.Pin] == OUTPUT && m.mcps[val.Device] != nil {
					_ = m.mcps[val.Device].DigitalWrite(uint8(val.Pin), !mcp23017.PinLevel(val.Value))
				}
			}
		}
	}()

	return m.inputCh, m.outputCh
}

func (m *McpManager) Wait() {
	m.wg.Wait()
}

func mcpRead(mcp Device) ([Pins]PinLevel, bool) {
	mcpValues := defaultMcpValues
	if mcp == nil {
		return mcpValues, true
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

func GetMode(input bool) PinMode {
	if input {
		return INPUT
	}
	return OUTPUT
}
