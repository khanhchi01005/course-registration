# Frontend Dockerfile
FROM node:20-alpine AS build

WORKDIR /app

# Copy file cấu hình package.json trước để cache install
COPY frontend/package*.json ./
RUN npm install

# Copy toàn bộ code
COPY frontend/ .

# Build project
RUN npm run build

# --- Stage 2: Serve static bằng nginx ---
FROM nginx:alpine

# Copy build output sang nginx public dir
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Khởi động nginx
CMD ["nginx", "-g", "daemon off;"]
