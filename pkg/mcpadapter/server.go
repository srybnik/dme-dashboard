package mcpadapter

import (
	"fmt"
	"net"

	"github.com/srybnik/dme-dashboard/internal/mcp"
	"golang.org/x/sync/errgroup"
	"google.golang.org/grpc"
)

type Server struct {
	outputChan chan mcp.PinValue
	inputChan  chan mcp.PinValue
}

func NewServer(inputChan chan mcp.PinValue, outputChan chan mcp.PinValue) *Server {
	return &Server{
		outputChan: outputChan,
		inputChan:  inputChan,
	}
}

func (s *Server) Stream(stream StreamService_StreamServer) error {
	var eg errgroup.Group
	eg.Go(func() error {
		for {
			resp, err := stream.Recv()
			if err != nil {
				return err
			}
			s.outputChan <- mcp.PinValue{
				Device: int(resp.Device),
				Pin:    int(resp.Pin),
				Value:  mcp.PinLevel(resp.Value),
				HasErr: resp.HasErr,
				Mode:   mcp.PinMode(resp.Mode),
			}
		}
	})

	eg.Go(func() error {
		for v := range s.inputChan {
			data := Data{
				Device: int32(v.Device),
				Pin:    int32(v.Pin),
				Value:  bool(v.Value),
				HasErr: v.HasErr,
				Mode:   int32(v.Mode),
			}
			if err := stream.Send(&data); err != nil {
				return err
			}
		}
		return nil
	})

	return eg.Wait()
}

func (s *Server) Run(host string) error {
	lis, err := net.Listen("tcp", host)
	if err != nil {
		return fmt.Errorf("failed to listen: %v", err)
	}
	gs := grpc.NewServer()
	RegisterStreamServiceServer(gs, s)

	if err = gs.Serve(lis); err != nil {
		return fmt.Errorf("failed to serve: %v", err)
	}
	return nil
}
