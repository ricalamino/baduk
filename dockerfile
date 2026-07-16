FROM ghcr.io/gohugoio/hugo:v0.162.0 AS builder
WORKDIR /src
COPY --chown=hugo:hugo . .
RUN hugo --minify

FROM nginx:alpine
COPY --from=builder /src/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
