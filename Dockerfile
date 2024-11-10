FROM node:18-alpine

ARG NPM_TOKEN

WORKDIR /app

COPY package*.json ./
RUN echo "@jimy.velasquez:registry=http://192.168.162.26:8929/api/v4/projects/59/packages/npm/" >> .npmrc && \
    echo "//192.168.162.26:8929/api/v4/projects/59/packages/npm/:_authToken=${NPM_TOKEN}" >> .npmrc && \
    echo "" >> .npmrc && \
    echo "@jimy.velasquez2:registry=http://192.168.162.26:8929/api/v4/projects/50/packages/npm/" >> .npmrc && \
    echo "//192.168.162.26:8929/api/v4/projects/50/packages/npm/:_authToken=${NPM_TOKEN}" >> .npmrc && \
    echo "" >> .npmrc

RUN apk add --no-cache git
RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "run", "start:prod"]