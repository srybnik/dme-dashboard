package handler

import (
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"github.com/srybnik/dme-dashboard/internal/service"
)

type Handler struct {
	srv      *service.Service
	upgrader websocket.Upgrader
}

func New(srv *service.Service) *Handler {
	return &Handler{
		srv: srv,
		upgrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				return true
			}},
	}
}

func (h *Handler) Ping(ctx echo.Context) error {
	return ctx.NoContent(http.StatusNoContent)
}

func (h *Handler) RegisterHandlers(r *echo.Echo) {
	r.Use(middleware.Recover())
	//r.Use(mdw.LogMiddleware())
	r.HideBanner = true
	r.HidePort = true

	r.Static("/static", "./web")
	r.GET("/", h.HomePage)

	r.GET("/cfg", h.GetConfig)
	r.POST("/cfg", h.UpdateConfig)

	r.GET("/ping", h.Ping)
	r.GET("/ws", h.Websocket)
	r.GET("/boards", h.GetAcviveBoards)
	r.GET("/config", h.ConfigPage)
	r.GET("/log", h.LogPage)
}

func (h *Handler) Websocket(ctx echo.Context) error {
	conn, err := h.upgrader.Upgrade(ctx.Response(), ctx.Request(), nil)
	if err != nil {
		return err
	}
	defer conn.Close()

	return h.srv.Websocket(ctx.Request().Context(), conn)
}

func (h *Handler) GetAcviveBoards(ctx echo.Context) error {
	boards := h.srv.GetActiveBoards()

	type board struct {
		BoardID int `json:"boardID"`
	}
	var res = make([]board, len(boards))
	for i, val := range boards {
		res[i].BoardID = val
	}

	return ctx.JSON(http.StatusOK, res)
}
