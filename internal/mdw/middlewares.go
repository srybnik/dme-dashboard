package mdw

import (
	"fmt"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/rs/zerolog/log"
)

func LogMiddleware() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(ctx echo.Context) error {
			t := time.Now()
			err := next(ctx)

			status := ctx.Response().Status
			var msg string
			if err != nil {
				if httpErr, ok := err.(*echo.HTTPError); ok {
					status = httpErr.Code
					msg = fmt.Sprintf("%v", httpErr.Message)
				} else {
					msg = err.Error()
					status = 0
				}
			}

			evt := log.Info()
			if err != nil || status > 399 {
				evt = log.Error()
			}

			r := ctx.Request()
			url := r.RequestURI
			if len(url) > 100 {
				url = url[:99] + "...truncated..."
			}
			evt.
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
