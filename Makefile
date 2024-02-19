run:
	go run cmd/main.go

lint:
	go fmt ./...
	go vet ./...
	golangci-lint run -E gofmt -E golint -E vet

build:
	GOARM=6 GOARCH=arm GOOS=linux go build -o dme_dashboard cmd/main.go

builserver:
	GOARM=6 GOARCH=arm GOOS=linux go build -o mcpserver cmd/mcpserver/main.go

gen:
	protoc --go_out=plugins=grpc:pkg/mcpadapter  pkg/mcpadapter/*.proto
