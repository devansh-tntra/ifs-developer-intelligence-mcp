FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json tsconfig.json ./
RUN npm install

COPY src ./src

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

COPY package.json ./
RUN npm install --production

COPY --from=builder /app/dist ./dist

EXPOSE 3000

ENV PORT=3000
ENV MCP_TRANSPORT=sse

CMD ["node", "dist/index.js", "--transport", "sse"]
