# Multi-stage build for optimized image
FROM node:18-alpine AS frontend-build
WORKDIR /app
COPY frontend ./frontend

FROM node:18-alpine AS deps
WORKDIR /usr/src/app
# Copy package files
COPY package*.json ./
# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

FROM node:18-alpine AS runtime
# Create app user for security
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

WORKDIR /usr/src/app

# Copy production dependencies
COPY --from=deps /usr/src/app/node_modules ./node_modules

# Copy application code
COPY backend ./backend

# Copy frontend static files
COPY --from=frontend-build /app/frontend ./backend/public

# Change ownership to non-root user
RUN chown -R appuser:appgroup /usr/src/app

# Switch to non-root user
USER appuser

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

EXPOSE 3000

CMD ["node", "backend/app.js"]