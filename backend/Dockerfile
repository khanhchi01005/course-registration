# Backend Dockerfile
FROM python:3.11-slim

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy file dependency trước (để cache hiệu quả)
COPY backend/requirements.txt .

# Cài đặt các thư viện Python
RUN pip install --no-cache-dir -r requirements.txt

# Copy toàn bộ mã nguồn backend
COPY backend/ .

# Mở cổng Flask
EXPOSE 5000

# Chạy server Flask
CMD ["python", "app.py"]
