FROM node:22-bookworm-slim

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOME=/data
ENV AGY_BIN=/data/.local/bin/agy
ENV AGY_CWD=/workspace
ENV PATH="/data/.local/bin:${PATH}"

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    git \
    bash \
    python3 \
    python3-pip \
  && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /data/.local/bin /workspace /app/workspace \
  && curl -fsSL https://antigravity.google/cli/install.sh | bash \
  && /data/.local/bin/agy --version

COPY package*.json ./
RUN npm install --omit=dev

COPY . .
RUN mkdir -p /workspace /app/workspace

EXPOSE 3000
CMD ["npm", "start"]
