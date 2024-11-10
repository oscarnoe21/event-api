FROM node:18-alpine

ARG NPM_TOKEN

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache git
RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "run", "start:prod"]
