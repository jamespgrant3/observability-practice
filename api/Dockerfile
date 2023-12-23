FROM node:18 AS build-env

WORKDIR /app

COPY package* /app

RUN npm ci --omit=dev

COPY dist/* /app

FROM gcr.io/distroless/nodejs18-debian11
COPY --from=build-env /app /app
WORKDIR /app

CMD ["/app/main.js"]
