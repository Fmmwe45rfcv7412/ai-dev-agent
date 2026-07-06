FROM node:22-bookworm-slim

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV AGY_BIN=/data/.local/bin/agy

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    git \
    bash \
    python3 \
    python3-pip \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install --omit=dev

COPY . .
RUN mkdir -p /workspace /app/workspace

EXPOSE 3000
CMD ["npm", "start"]
