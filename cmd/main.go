package main

import (
	"context"
	"github.com/srybnik/dme-dashboard/internal/databases"
	"github.com/srybnik/dme-dashboard/internal/repo"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/rs/zerolog/log"

	_ "github.com/mattn/go-sqlite3"
	"github.com/srybnik/dme-dashboard/internal/config"
	"github.com/srybnik/dme-dashboard/internal/controls"
	"github.com/srybnik/dme-dashboard/internal/handler"
)

func main() {
	//log := zerolog.New(os.Stdout).With().Timestamp().Logger()
	//cfg, err := config.NewConfig("/home/dme-dashboard/config.json")
	cfg, err := config.NewConfig("./config.json")
	if err != nil {
		log.Fatal().Msgf("Config error: %v", err)
	}

	//db, err := databases.New("sqlite3", "/home/dme-dashboard/repo.db")
	db, err := databases.New("sqlite3", "./repo.db")
	if err != nil {
		log.Fatal().Msgf("DB error: %v", err)
	}
	logRepo := repo.New(db)
	logRepo.Event("Старт 🚀")
	defer logRepo.Event("Завершение ☹️")
	//
	//mcpManager, err := mcp.New()
	//if err != nil {
	//	log.Fatal().Msgf("MCP error: %v", err)
	//}
	//defer mcpManager.CloseAll()
	//
	//buz := buzzer.New()
	//buzzerErrors := make(chan error, 1)
	//go func() {
	//	log.Info().Msgf("Start buzzer")
	//	buzzerErrors <- buz.Start()
	//}()

	controlManager := controls.New(cfg)
	apiHandler := handler.New(controlManager, logRepo)
	//srv := service.New(controlManager, apiHandler, mcpManager, buz, logRepo)
	//serviceErrors := make(chan error, 1)
	//go func() {
	//	log.Info().Msgf("Start service")
	//	serviceErrors <- srv.Start()
	//}()

	router := echo.New()
	router.Use(middleware.Recover())
	router.Use(handler.LogMiddleware())
	router.HideBanner = true
	router.HidePort = true

	router.GET("/", apiHandler.HomePage)
	router.GET("/log", apiHandler.LogPage)
	router.GET("/ws", apiHandler.Websocket)
	//router.GET("/element/:elementID", apiHandler.GetElementProperties)
	//router.PUT("/element/:elementID", apiHandler.SetElementProperties)
	//router.Static("/static", "/home/dme-dashboard/web")
	router.Static("/static", "./web")
	router.GET("/ping", func(ctx echo.Context) error {
		return ctx.NoContent(http.StatusNoContent)
	})

	//router.GET("/logs/:startDate/:endDate", apiHandler.Logs)

	//Debug
	//router.GET("/debug/pprof/profile", func(ctx echo.Context) error {
	//	pprof.Profile(ctx.Response(), ctx.Request())
	//	return nil
	//})
	//router.GET("/debug/pprof/heap", func(ctx echo.Context) error {
	//	pprof.Handler("heap").ServeHTTP(ctx.Response(), ctx.Request())
	//	return nil
	//})
	//router.GET("/debug/pprof/goroutine", func(ctx echo.Context) error {
	//	pprof.Handler("goroutine").ServeHTTP(ctx.Response(), ctx.Request())
	//	return nil
	//})

	serverErrors := make(chan error, 1)
	go func() {
		log.Info().Msgf("Start listen http on %s", cfg.Host)
		serverErrors <- router.StartServer(&http.Server{
			Addr:         cfg.Host,
			ReadTimeout:  cfg.TimeoutDuration,
			WriteTimeout: cfg.TimeoutDuration,
		})
	}()

	osSignals := make(chan os.Signal, 1)
	signal.Notify(osSignals, syscall.SIGINT, syscall.SIGTERM)
	select {
	//case err := <-buzzerErrors:
	//	log.Error().Msgf("Error buzzer: %v", err)
	//case err := <-serviceErrors:
	//	log.Error().Msgf("Error service: %v", err)
	case err := <-serverErrors:
		log.Error().Msgf("Error starting server: %v", err)
	case <-osSignals:
		log.Info().Msg("Start shutdown...")
		if err := router.Shutdown(context.Background()); err != nil {
			log.Error().Msgf("Graceful shutdown error: %v", err)
			os.Exit(1)
		}
	}
}
