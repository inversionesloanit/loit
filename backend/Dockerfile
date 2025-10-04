FROM node:18.8-alpine as base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /home/node/app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* ./
RUN ls -la
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /home/node/app
COPY --from=deps /home/node/app/node_modules ./node_modules
COPY . .

# Build without relying on executable bit of node_modules/.bin
RUN node node_modules/copyfiles/copyfiles -u 1 "src/**/*.{html,css,scss,ttf,woff,woff2,eot,svg,jpg,png}" dist/ \
 && yarn build:payload \
 && yarn build:server

# Production image, copy all the files and run server
FROM base AS runner
WORKDIR /home/node/app

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 payload

# Copy built application
COPY --from=builder --chown=payload:nodejs /home/node/app/dist ./dist
COPY --from=builder --chown=payload:nodejs /home/node/app/build ./build

# Copy package files for production dependencies
COPY package.json yarn.lock* ./
RUN yarn install --production && yarn cache clean

USER payload

EXPOSE 3000

CMD ["node", "dist/server.js"]
