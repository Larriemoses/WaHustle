# apps/backend-node/Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml* package-lock.json* yarn.lock* ./
RUN if [ -f pnpm-lock.yaml ]; then corepack enable && pnpm i --frozen-lockfile; \
    elif [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    else npm ci; fi
COPY tsconfig.json ./tsconfig.json
COPY src ./src
RUN npx tsc -p tsconfig.json
EXPOSE 8000
CMD ["node","dist/server.js"]
