package mcpadapter

import (
	"context"
	"time"

	"github.com/rs/zerolog/log"
	"github.com/srybnik/dme-dashboard/internal/mcp"
	"golang.org/x/sync/errgroup"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

type Client struct {
	host       string
	outputChan chan mcp.PinValue
	inputChan  chan mcp.PinValue
}

func New(host string) *Client {
	return &Client{
		host:       host,
		outputChan: make(chan mcp.PinValue, 128),
		inputChan:  make(chan mcp.PinValue, 128),
	}
}

func (c *Client) Run(ctx context.Context) (chan mcp.PinValue, chan mcp.PinValue) {
	go func() {
		for {
			select {
			case <-ctx.Done():
				return
			default:
			}
			conn, err := grpc.Dial(c.host, grpc.WithTransportCredentials(insecure.NewCredentials()))
			if err != nil {
				log.Error().Msgf("can not connect with server %v", err)
				time.Sleep(time.Second) //TODO:пофиксить
				continue
			}

			client := NewStreamServiceClient(conn)
			stream, err := client.Stream(ctx)
			if err != nil {
				log.Error().Msgf("open stream error %v", err)
				time.Sleep(time.Second)
				continue
			}

			eg, ctx := errgroup.WithContext(ctx)
			eg.Go(func() error {
				for {
					select {
					case <-ctx.Done():
						return ctx.Err()
					default:
					}

					resp, err := stream.Recv()
					if err != nil {
						return err
					}
					c.inputChan <- mcp.PinValue{
						Device: int(resp.Device),
						Pin:    int(resp.Pin),
						Value:  mcp.PinLevel(resp.Value),
						HasErr: resp.HasErr,
					}
				}
			})

			eg.Go(func() error {
				for v := range c.outputChan {
					data := Data{
						Device: int32(v.Device),
						Pin:    int32(v.Pin),
						Value:  bool(v.Value),
						HasErr: v.HasErr,
					}
					if err := stream.Send(&data); err != nil {
						return err
					}
				}
				return nil
			})

			if err = eg.Wait(); err != nil {
				log.Error().Msgf("Error: %v", err)
				time.Sleep(time.Second)
			}
		}
	}()
	return c.inputChan, c.outputChan
}
