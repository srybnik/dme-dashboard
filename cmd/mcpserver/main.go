package main

import (
	"context"
	"fmt"
	"log"
	"os/signal"
	"syscall"

	"github.com/srybnik/dme-dashboard/internal/mcp"
	"github.com/srybnik/dme-dashboard/pkg/mcpadapter"
)

func main() {

	host := ":50005"

	var cfg mcp.Config
	for i := range cfg.PinModes[0] {
		cfg.PinModes[0][i] = mcp.OUTPUT
	}

	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	input, output := mcp.New(&cfg).Run(ctx)

	srv := mcpadapter.NewServer(input, output)

	go func() {
		if err := srv.Run(host); err != nil {
			log.Fatal(err)
		}
	}()

	fmt.Println("Start...")
	<-ctx.Done()
}
