FROM alpine:latest

RUN apk add --no-cache curl
RUN curl -s -X POST -H "x-auth-token: md2N7s" --data-binary 'Hi from Dockerfile!' https://mealz.andcreations.io:8443/log
