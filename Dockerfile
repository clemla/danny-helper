FROM oven/bun:latest

WORKDIR /app

RUN apt-get update \
    && apt-get install -y git \
    && rm -rf /var/lib/apt/lists/*

COPY package.json bun.lock ./
RUN bun install

COPY . .

CMD ["bun", "run", "main.js"]