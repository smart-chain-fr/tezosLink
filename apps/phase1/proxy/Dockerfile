FROM alpine:latest

ENV ENV local
ENV DATABASE_TABLE tezoslink
ENV DATABASE_ADDITIONAL_PARAMETER sslmode=disable
ENV SERVER_PORT 8001
ENV TEZOS_NETWORK MAINNET

RUN apk --no-cache add ca-certificates

RUN adduser -D proxy
USER proxy

WORKDIR /home/proxy

COPY ./bin/proxy .
COPY ./data/proxy ./data

EXPOSE $API_PORT

CMD ["sh", "-c", "./proxy --conf ./data/conf/$ENV.toml"]