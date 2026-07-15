# Build the static site once on the native builder arch (the output is
# platform-independent), then assemble it into a per-arch Caddy image below.
# The final stage is COPY-only, so multi-arch needs no QEMU emulation.
FROM --platform=$BUILDPLATFORM node:22 AS builder

WORKDIR /app
ADD . /app
RUN yarn
RUN yarn run build

FROM caddy:2-alpine

WORKDIR /app
COPY --from=builder /app/build /app
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80
