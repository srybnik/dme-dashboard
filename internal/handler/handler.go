package handler

import (
	"html/template"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
	"github.com/srybnik/dme-dashboard/internal/controls"
	"github.com/srybnik/dme-dashboard/internal/repo"
)

type Handler struct {
	upgrader       websocket.Upgrader
	msgChan        chan []byte
	refreshChan    chan struct{}
	controlManager *controls.ControlManager
	//logRepo        *repo.Repo
	conns map[*websocket.Conn]struct{}
	mu    sync.Mutex
}

func New(controlManager *controls.ControlManager, logRepo *repo.Repo) *Handler {
	return &Handler{
		upgrader:       websocket.Upgrader{CheckOrigin: func(r *http.Request) bool { return true }},
		msgChan:        make(chan []byte),
		refreshChan:    make(chan struct{}),
		controlManager: controlManager,
		//logRepo:        logRepo,
		conns: make(map[*websocket.Conn]struct{}),
	}
}

func (h *Handler) HomePage(ctx echo.Context) error {
	//t, err := template.ParseFiles("/home/dme-dashboard/web/index.html")
	t, err := template.ParseFiles("./web/index_new.html")
	if err != nil {
		return err
	}
	return t.Execute(ctx.Response(), ctx.Request().Host)
}

func (h *Handler) LogPage(ctx echo.Context) error {
	//t, err := template.ParseFiles("/home/dme-dashboard/web/logs.html")e
	t, err := template.ParseFiles("./web/logs.html")
	if err != nil {
		return err
	}
	return t.Execute(ctx.Response(), ctx.Request().Host)
}

//func (h *Handler) Logs(ctx echo.Context) error {
//	start := ctx.Param("startDate")
//	end := ctx.Param("endDate")
//
//	startDate, err := civil.ParseDate(start)
//	if err != nil {
//		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("can't parse startDate: %v", start))
//	}
//	endDate, err := civil.ParseDate(end)
//	if err != nil {
//		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("can't parse endDate: %v", end))
//	}
//	data, err := h.logRepo.GetData(startDate, endDate)
//	if err != nil {
//		return echo.NewHTTPError(http.StatusInternalServerError, fmt.Sprintf("can't get data: %v", err))
//	}
//	var body bytes.Buffer
//	for _, v := range data {
//		body.WriteString(fmt.Sprintf("<tr><td>%s</td><td>%s</td></tr>", v.Date.Format("2006-01-02 15:04:05"), v.Msg))
//	}
//	return ctx.JSON(http.StatusOK, body.String())
//}

//func (h *Handler) GetElementProperties(ctx echo.Context) error {
//	control, err := h.controlManager.GetByElementID(ctx.Param("elementID"))
//	if err != nil {
//		return echo.NewHTTPError(http.StatusInternalServerError, err)
//	}
//	body := fmt.Sprintf(`{"name":"%s", "isDisable":%v}`, control.GetName(), control.IsDisable)
//	return ctx.JSON(http.StatusOK, body)
//}

//func (h *Handler) SetElementProperties(ctx echo.Context) error {
//	control, err := h.controlManager.GetByElementID(ctx.Param("elementID"))
//	if err != nil {
//		return echo.NewHTTPError(http.StatusInternalServerError, err)
//	}
//	control.IsDisable, _ = strconv.ParseBool(ctx.QueryParam("isDisable"))
//	err = h.controlManager.SaveControlProperties(control)
//	if err != nil {
//		return echo.NewHTTPError(http.StatusInternalServerError, err)
//	}
//	h.refreshChan <- struct{}{}
//	return ctx.NoContent(http.StatusNoContent)
//}

func (h *Handler) Websocket(ctx echo.Context) error {
	ws, err := h.upgrader.Upgrade(ctx.Response(), ctx.Request(), nil)
	if err != nil {
		return err
	}
	defer ws.Close()

	h.mu.Lock()
	h.conns[ws] = struct{}{}
	h.mu.Unlock()

	defer func(conn *websocket.Conn) {
		h.mu.Lock()
		delete(h.conns, conn)
		h.mu.Unlock()
	}(ws)

	//h.refreshChan <- struct{}{}

	for {
		_, message, err := ws.ReadMessage()
		if err != nil {
			return err
		}
		//h.msgChan <- message
	}
	return nil
}

func (h *Handler) ReadWebsocketMessage() chan []byte {
	return h.msgChan
}

func (h *Handler) RefreshNotify() chan struct{} {
	return h.refreshChan
}

func (h *Handler) WriteWebsocketMessage(msg []byte) error {
	h.connectionPool.Lock()
	defer h.connectionPool.Unlock()
	for connection := range h.connectionPool.connections {
		if err := connection.WriteMessage(1, msg); err != nil {
			return err
		}
	}
	return nil
}
