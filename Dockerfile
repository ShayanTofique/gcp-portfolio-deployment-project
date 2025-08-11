FROM node:18 AS frontend-build
WORKDIR /app
COPY frontend ./frontend

FROM node:18
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY backend ./backend

COPY --from=frontend-build /app/frontend ./backend/public

EXPOSE 3000
CMD ["node", "backend/app.js"]
