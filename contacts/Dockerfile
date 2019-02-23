FROM golang:1.11.5-alpine AS builder
RUN apk add --no-cache git gcc
WORKDIR /src
ADD go.mod go.sum ./
RUN CGO_ENABLED=0 go get
ADD . ./
RUN CGO_ENABLED=0 go vet
RUN CGO_ENABLED=0 go build -o ./bittr-contacts

FROM scratch
COPY --from=builder /src/bittr-contacts .

ENTRYPOINT ["./bittr-contacts"]