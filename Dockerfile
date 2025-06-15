# Base build image
FROM node:20-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# Runtime image
FROM node:20-slim

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 5001

CMD ["node", "dist/main"]
