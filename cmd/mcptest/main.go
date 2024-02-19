package main

import (
	"context"
	"fmt"
	"os/signal"
	"sync"
	"syscall"
	"time"

	"github.com/srybnik/dme-dashboard/internal/mcp"
	"github.com/srybnik/dme-dashboard/pkg/mcpadapter"
)

type key struct {
	Device int
	Pin    int
}

type DevicePin struct {
	Device int
	Pin    int
	Value  bool
	hasErr bool
	dur    time.Duration
	wait   bool
	mu     sync.Mutex
	ch     chan mcp.PinValue
}

func NewDevicePin(dev int, pin int, dur time.Duration, ch chan mcp.PinValue) *DevicePin {
	return &DevicePin{
		Device: dev,
		Pin:    pin,
		dur:    dur,
		ch:     ch,
	}
}

//func (d *DevicePin) Key() key {
//	return key{
//		Device: d.Device,
//		Pin:    d.Pin,
//	}
//}

func (d *DevicePin) SetValue(ctx context.Context, val bool, err bool) {
	d.mu.Lock()
	defer d.mu.Unlock()

	d.Value = val
	d.hasErr = err

	if !d.wait {
		d.wait = true

		go func() {
			ticker := time.NewTicker(d.dur)
			defer ticker.Stop()
			select {
			case <-ctx.Done():
				return
			case <-ticker.C:
				d.mu.Lock()
				defer d.mu.Unlock()

				d.wait = false

				if d.Value == val && d.hasErr == err {
					d.ch <- mcp.PinValue{
						Device: d.Device,
						Pin:    d.Pin,
						Value:  mcp.PinLevel(d.Value),
						HasErr: d.hasErr,
					}
				}
			}
		}()
	}

}

func main() {
	host := "192.168.1.9:50005"

	cli := mcpadapter.New(host)

	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	input, output := cli.Run(ctx)

	ch := make(chan mcp.PinValue, 100)
	go func() {

		mp := make(map[key]*DevicePin)

		for v := range input {
			k := key{v.Device, v.Pin}
			dp, ok := mp[k]
			if !ok {
				dp = NewDevicePin(v.Device, v.Pin, time.Second*3, ch)
				mp[k] = dp
			}

			dp.SetValue(ctx, bool(v.Value), v.HasErr)
			fmt.Println(fmt.Sprintf("Отправлен - Device: %d, Pin: %d, Value: %v, Error: %v,  time: %v", v.Device, v.Pin, v.Value, v.HasErr, time.Now()))
		}
	}()

	go func() {
		for v := range ch {
			fmt.Println(fmt.Sprintf("Получен - Device: %d, Pin: %d, Value: %v, Error: %v, time: %v", v.Device, v.Pin, v.Value, v.HasErr, time.Now()))
		}
	}()
	go func() {
		for {
			var device int
			var pin int
			var val bool
			fmt.Println("Device Pin Value")
			fmt.Scan(&device, &pin, &val)
			p := mcp.PinValue{
				Device: device,
				Pin:    pin,
				Value:  true,
				HasErr: false,
			}
			fmt.Println(p)
			output <- p
		}
	}()

	fmt.Println("Start...")
	<-ctx.Done()

}
