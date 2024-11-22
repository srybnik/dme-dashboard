package handler

import (
	"html/template"

	"github.com/labstack/echo/v4"
)

func (h *Handler) HomePage(ctx echo.Context) error {
	t, err := template.ParseFiles("./web/index.html")
	if err != nil {
		return err
	}
	return t.Execute(ctx.Response(), ctx.Request().Host)
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
