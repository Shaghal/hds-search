FROM docker.hasti.co/node/node:16-alpine AS builder
WORKDIR /build
COPY . .
RUN npm install -g pnpm@8.4.0
RUN pnpm install --production
ENV REACT_APP_MINIO_SERVER=http://172.27.226.72:9000
ENV REACT_APP_QUERY_SERVER=http://172.27.226.11:5544/api/v2
ENV REACT_APP_API_ENV=test
ENV REACT_APP_BUCKET_NAME=dartil-production
ENV REACT_APP_API_VENDOR=demo
RUN pnpm build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build"]