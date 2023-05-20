package buzzer

import (
	"gobot.io/x/gobot"
	"gobot.io/x/gobot/drivers/gpio"
	"gobot.io/x/gobot/platforms/raspi"
)

type Buzzer struct {
	buzzerDriver *gpio.BuzzerDriver
	robot        *gobot.Robot
}

func New() *Buzzer {
	r := raspi.NewAdaptor()
	buzzerDriver := gpio.NewBuzzerDriver(r, "7")

	robot := gobot.NewRobot("buzzer",
		[]gobot.Connection{r},
		[]gobot.Device{
			buzzerDriver,
		},
	)
	return &Buzzer{
		buzzerDriver: buzzerDriver,
		robot:        robot,
	}
}

func (b *Buzzer) Start() error {
	return b.robot.Start()
}

func (b *Buzzer) Tone(hz, duration float64) error {
	return b.buzzerDriver.Tone(hz, duration)
}
