FROM docker.hasti.co/node/node:16-alpine AS builder
WORKDIR /build
COPY . .
RUN npm install -g pnpm@8.4.0
RUN pnpm install --production
RUN pnpm build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build"]