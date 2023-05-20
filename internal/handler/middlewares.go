package handler

import (
	"context"
	"encoding/base32"
	"fmt"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/rs/zerolog"
	"hash/fnv"
	"time"
)

func requestID(t time.Time) string {
	tb, _ := t.MarshalBinary()
	h := fnv.New64()
	_, _ = h.Write(tb)
	bin := h.Sum(nil)
	return base32.StdEncoding.EncodeToString(bin[:5])
}

func LogMiddleware(loger zerolog.Logger, skipper middleware.Skipper) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			t := time.Now()
			l := loger.With().Str("request_id", requestID(t)).Logger()
			c.Set("logger", l)
			err := next(c)
			if skipper != nil && skipper(c) {
				return err
			}
			status := c.Response().Status
			var msg string
			if err != nil {
				httpError, ok := err.(*echo.HTTPError)
				if ok {
					status = httpError.Code
					msg = fmt.Sprintf("%v", httpError.Message)
				} else {
					msg = err.Error()
					status = 0
				}
			}
			r := c.Request()
			var level *zerolog.Event
			if err != nil || status > 399 {
				level = l.Error()
			} else {
				level = l.Info()
			}
			url := r.RequestURI
			if len(url) > 80 {
				url = url[:79] + "...truncated..."
			}
			level.
				Str("host", r.Host).
				Str("url", url).
				Int("status", status).
				Dur("latency", time.Since(t)).
				Str("source", r.RemoteAddr).
				Str("method", r.Method).
				Msg(msg)
			return err
		}
	}
}

func TimeoutMiddleware(timeout time.Duration) echo.MiddlewareFunc {
	return func(handlerFunc echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			ctx, cancel := context.WithTimeout(c.Request().Context(), timeout)
			defer cancel()
			c.SetRequest(c.Request().WithContext(ctx))
			err := handlerFunc(c)
			return err
		}
	}
}
