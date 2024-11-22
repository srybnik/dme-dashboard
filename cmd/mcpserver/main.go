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

const host = ":50005"

func main() {

	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	input, output := mcp.New(mcp.NewMcpAdapter(false)).Run(ctx)

	srv := mcpadapter.NewServer(input, output)

	go func() {
		if err := srv.Run(host); err != nil {
			log.Fatal(err)
		}
	}()

	fmt.Println("Start...")
	<-ctx.Done()

	fmt.Println("Shutdown.")
}
