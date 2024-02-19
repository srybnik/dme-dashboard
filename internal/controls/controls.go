package controls

import (
	"errors"
	"fmt"
	"github.com/srybnik/dme-dashboard/internal/config"
	"github.com/srybnik/dme-dashboard/internal/mcp"
	"sync"
)

const (
	ColorRed         = "red"
	ColorRedBlink    = "redblink"
	ColorGreen       = "green"
	ColorGreenBlink  = "greenblink"
	ColorWhite       = "white"
	ColorGrey        = "grey"
	BuzzerColor      = "img"
	BuzzerColorBlink = "img imgred"

	ControlTypeLed    = 1
	ControlTypeButton = 2
	ControlTypePanel  = 3
	ControlTypeBuzzer = 4
	ControlTypeLedVPP = 5
	ControlTypeTimer  = 6
	ControlTypeLuk    = 7
)

//type McpParam struct {
//	DeviceID int64
//	PinID    int64
//	Value    bool
//}

type Control struct {
	McpPinValue mcp.PinValue
	ElementID   string
	IsDisable   bool
	IsChecked   bool
	Type        int64
	Value       string
}

type ControlManager struct {
	Controls      []*Control
	ControlsBlink []*Control
	cfg           *config.Config
	sync.Mutex
}

func New(cfg *config.Config) *ControlManager {
	controls := make([]*Control, len(cfg.Controls))
	for i, v := range cfg.Controls {
		controls[i] = &Control{
			McpParam: McpParam{
				DeviceID: v.DeviceID,
				PinID:    v.PinID,
			},
			ElementID: v.ElementID,
			IsDisable: v.IsDisable,
			Type:      v.Type,
			IsChecked: v.IsChecked,
			Value:     v.Value,
		}
	}
	return &ControlManager{Controls: controls, ControlsBlink: []*Control{}, cfg: cfg}
}

func (c *ControlManager) GetByElementID(elementID string) (*Control, error) {
	for _, control := range c.Controls {
		if control.ElementID == elementID {
			return control, nil
		}
	}
	return nil, errors.New("not found")
}

func (c *Control) GetName() string {
	pinID := c.McpParam.PinID
	blockName := "PA"
	if pinID > 7 {
		pinID = pinID - 8
		blockName = "PB"
	}
	return fmt.Sprintf("Плата %d. Пин %s%d.", c.McpParam.DeviceID, blockName, pinID)
}

//func (c *Control) GetLabel() string {
//	if c.Type != ControlTypeLabel || len(c.Labels) != 2 {
//		return ""
//	}
//	if c.IsDisable {
//		return "--"
//	}
//	if c.McpParam.Value {
//		return c.Labels[0]
//	}
//	return c.Labels[1]
//}

func (c *ControlManager) SaveControlProperties(control *Control) error {
	return c.cfg.SaveControlProperties(config.ControlConfig{
		ElementID: control.ElementID,
		DeviceID:  control.McpParam.DeviceID,
		PinID:     control.McpParam.PinID,
		IsDisable: control.IsDisable,
		Type:      control.Type,
		IsChecked: control.IsChecked,
	})
}

func (c *Control) GetColor() string {
	switch {
	case c.Type == ControlTypeLed && c.IsDisable:
		return ColorGrey
	case c.Type == ControlTypeLed && c.McpParam.Value:
		return ColorRed
	case c.Type == ControlTypeLed && !c.McpParam.Value:
		return ColorGreen

	case c.Type == ControlTypePanel && c.IsDisable:
		return ColorGrey
	case c.Type == ControlTypePanel && c.McpParam.Value:
		return ColorRed
	case c.Type == ControlTypePanel && !c.McpParam.Value:
		return ColorWhite

	case c.Type == ControlTypeLedVPP && c.IsDisable:
		return ColorGrey
	case c.Type == ControlTypeLedVPP && c.McpParam.Value:
		return ColorWhite
	case c.Type == ControlTypeLedVPP && !c.McpParam.Value:
		return ColorGreen
	default:
		return ""
	}
}

func (c *Control) GetColorBlink() string {
	switch {
	case c.Type == ControlTypeLed && c.IsDisable:
		return ColorGrey
	case c.Type == ControlTypeLed && c.McpParam.Value:
		return ColorRedBlink
	case c.Type == ControlTypeLed && !c.McpParam.Value:
		return ColorGreenBlink

	case c.Type == ControlTypePanel && c.IsDisable:
		return ColorGrey
	case c.Type == ControlTypePanel && c.McpParam.Value:
		return ColorRedBlink
	case c.Type == ControlTypePanel && !c.McpParam.Value:
		return ColorRed

	case c.Type == ControlTypeLedVPP && c.IsDisable:
		return ColorGrey
	case c.Type == ControlTypeLedVPP && c.McpParam.Value:
		return ColorGreenBlink
	case c.Type == ControlTypeLedVPP && !c.McpParam.Value:
		return ColorGreen
	default:
		return ""
	}
}
