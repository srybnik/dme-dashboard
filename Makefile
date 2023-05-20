run:
	go run cmd/main.go

lint:
	go fmt ./...
	go vet ./...
	golangci-lint run -E gofmt -E golint -E vet

build:
	GOARM=6 GOARCH=arm GOOS=linux go build -o dme_dashboard cmd/main.go

