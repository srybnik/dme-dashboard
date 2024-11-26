FROM golang:1.23 as builder

WORKDIR /src
COPY . .

RUN GOARM=6 GOARCH=arm GOOS=linux go build -mod=vendor -o dme-dashboard cmd/main.go

FROM alpine
RUN apk add --no-cache ca-certificates tzdata
ENV TZ=Europe/Moscow
RUN apk add --no-cache tzdata \
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone
WORKDIR /root/
COPY --from=builder /src/dme-dashboard .
COPY --from=builder /src/web ./web
COPY --from=builder /src/config ./config
CMD ["./dme-dashboard"]

