# QR Food Ordering System

A production-grade QR-based restaurant ordering platform built using:

- React
- Node.js
- Express
- MongoDB
- Socket.io
- Redis
- Razorpay
- Cloudinary
- Docker

## Features

- QR Based Ordering
- Live Order Tracking
- Kitchen Display System
- Admin Dashboard
- Analytics
- Real-Time Updates
- Online Payments

## Tech Stack

Frontend:
- React
- Vite
- Tailwind CSS
- Redux Toolkit
- RTK Query

Backend:
- Node.js
- Express
- MongoDB
- Redis
- Socket.io

Deployment:
- Docker
- Nginx
- GitHub Actions
- Vercel
- Render




## 🐳 Docker Setup

### Development
```bash
docker-compose up --build
```

### Production
```bash
docker-compose -f docker-compose.prod.yml up --build -d
```

### Individual services
```bash
# Backend only
docker-compose up backend

# Stop all
docker-compose down

# Stop + volumes delete
docker-compose down -v
```