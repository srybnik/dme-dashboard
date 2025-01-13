package handler

import (
	"html/template"
	"time"

	"github.com/labstack/echo/v4"
)

type Data struct {
	Version string
}

func (h *Handler) HomePage(ctx echo.Context) error {
	t, err := template.ParseFiles("./web/index.html")
	if err != nil {
		return err
	}
	data := Data{
		Version: time.Now().Format("20060102150405"),
	}
	return t.Execute(ctx.Response(), data)
}

func (h *Handler) LogPage(ctx echo.Context) error {
	t, err := template.ParseFiles("./web/logs.html")
	if err != nil {
		return err
	}
	return t.Execute(ctx.Response(), ctx.Request().Host)
}

func (h *Handler) ConfigPage(ctx echo.Context) error {
	t, err := template.ParseFiles("./web/config-index.html")
	if err != nil {
		return err
	}
	return t.Execute(ctx.Response(), ctx.Request().Host)
}
