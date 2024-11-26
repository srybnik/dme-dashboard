package main

import (
	"context"
	"net/http"
	"os/signal"
	"syscall"

	"github.com/labstack/echo/v4"
	"github.com/rs/zerolog/log"

	"github.com/srybnik/dme-dashboard/internal/config"
	"github.com/srybnik/dme-dashboard/internal/handler"
	"github.com/srybnik/dme-dashboard/internal/mcp"
	"github.com/srybnik/dme-dashboard/internal/service"
)

const (
	debug = false
	host  = ":80"
)

func main() {
	cfg, err := config.NewConfig()
	if err != nil {
		log.Fatal().Msgf("cfg error: %v", err)
	}

	ctx, cancel := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer cancel()

	mgr := mcp.New(mcp.NewMcpAdapter(debug))
	svc := service.New(cfg, mgr)
	hdlr := handler.New(svc)

	router := echo.New()
	hdlr.RegisterHandlers(router)

	go func() {
		for {
			select {
			case <-ctx.Done():
				return
			default:
				log.Info().Msgf("Start service")
				sCtx, sCancel := context.WithCancel(ctx)
				svc.Start(sCtx, sCancel)
				svc.Wait()
			}
		}
	}()

	errCh := make(chan error, 1)
	go func() {
		log.Info().Msgf("Start listen http on %s", host)
		errCh <- router.StartServer(&http.Server{Addr: host})
	}()

	select {
	case err := <-errCh:
		log.Error().Msgf("Error starting server: %v", err)
	case <-ctx.Done():
		log.Info().Msgf("Stop app")
	}

}
