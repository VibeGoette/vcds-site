FROM node:20-alpine AS base

# --- Dependencies ---
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* .npmrc ./
RUN npm ci --legacy-peer-deps

# --- Builder ---
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time env
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
# Dummy values for build (Payload needs these at build time)
ENV PAYLOAD_SECRET=build-time-dummy-secret-will-be-replaced
ENV DATABASE_URI=file:./build-database.db

RUN npm run build
# Remove build-time DB
RUN rm -f build-database.db build-database.db-journal

# --- Runner ---
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Data + media directories with correct permissions
RUN mkdir -p /app/data /app/media && chown -R nextjs:nodejs /app/data /app/media

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
