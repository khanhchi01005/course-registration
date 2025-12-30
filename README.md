# Hướng dẫn cài đặt

## Clone dự án:

```bash
git clone https://github.com/<your-repo>/course-registration.git
```

## Deploy hệ thống lên kubernetes

Cài đặt cụm k8s, cài đặt Rancher (giao diện quản lý), rồi apply file `all-in-one.yaml`.

## Chạy docker:

```bash
docker compose build --no-cache
docker compose up -d
```

## Nếu lỗi thì build lại:

```bash
docker compose down -v --rmi all
docker compose build --no-cache
docker compose up -d
```

## Dữ liệu môn học

Apply file `Dump20251213.sql` vào MySQL