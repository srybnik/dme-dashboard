package handler

import (
	"io"
	"net/http"

	"github.com/labstack/echo/v4"
)

func (h *Handler) GetConfig(ctx echo.Context) error {
	ctx.Response().Header().Add("Access-Control-Allow-Origin", "*")
	body, err := h.srv.GetConfig()
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}
	return ctx.JSONBlob(http.StatusOK, body)
}

func (h *Handler) UpdateConfig(ctx echo.Context) error {
	body, err := io.ReadAll(ctx.Request().Body)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}
	if err = h.srv.UpdateConfig(body); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}
	return ctx.NoContent(http.StatusOK)
}
