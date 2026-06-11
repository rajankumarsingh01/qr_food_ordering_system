# 🍽️ QR Food Ordering System

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.2.7-black?style=for-the-badge&logo=next.js)
![Node.js](https://img.shields.io/badge/Node.js-20-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green?style=for-the-badge&logo=mongodb)
![Redis](https://img.shields.io/badge/Redis-7.0-red?style=for-the-badge&logo=redis)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4.8-black?style=for-the-badge&logo=socket.io)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=for-the-badge&logo=docker)
![License](https://img.shields.io/badge/License-ISC-yellow?style=for-the-badge)

**A production-grade, full-stack QR-based restaurant ordering platform.**  
Customers scan a QR code → browse menu → place order → pay → track in real-time.

[Live Demo](https://qr-food-ordering-system-nine.vercel.app) · [Backend API](https://qr-food-ordering-system-backend.onrender.com) · [Report Bug](https://github.com/rajankumarsingh01/qr_food_ordering_system/issues)

</div>

---

## 📸 Screenshots

| Customer Menu | Cart & Checkout | Order Tracking |
|---|---|---|
| Scan QR → Browse | Add items → Pay | Real-time status |

| Admin Dashboard | Live Orders | Kitchen Display |
|---|---|---|
| Analytics & Revenue | Socket.IO feed | Order queue |

---

## ✨ Features

### 👤 Customer Flow
- **QR Scan** → Table number auto-detected from URL
- **Menu** — Category filter, Veg/Non-Veg filter, Search
- **Cart** — Quantity control, Special instructions, localStorage persist
- **Checkout** — Razorpay payment integration
- **Order Tracking** — Real-time status updates via Socket.IO
- **Review** — Star rating + comment after order served
- **AI Chatbot** — Gemini-powered restaurant assistant

### 🔧 Admin Panel
- **Dashboard** — Revenue, orders, peak hours analytics (Recharts)
- **Menu Manager** — Create, update, delete, availability toggle, Cloudinary image upload
- **Live Orders** — Real-time order feed, status management (received → preparing → ready → served)
- **QR Generator** — Generate & download QR codes per table
- **Reviews** — Customer feedback management
- **Analytics** — Revenue trends, top-selling items, peak hours

### 👨‍🍳 Kitchen Display
- Real-time order queue
- Audio alerts for new orders
- One-click status updates

### 🔐 Auth & Security
- JWT Access + Refresh Token rotation
- HttpOnly cookie storage
- Bcrypt password hashing
- Rate limiting (express-rate-limit)
- Helmet security headers
- Forgot Password via Resend email

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js + Express | v20 / v5 | REST API server |
| MongoDB + Mongoose | v7 / v9 | Primary database |
| Redis (ioredis) | v7 / v5 | Caching & sessions |
| Socket.IO | v4.8 | Real-time communication |
| Razorpay | v2.9 | Payment gateway |
| Cloudinary | v1.41 | Image storage |
| Gemini AI | v0.24 | AI chatbot |
| Resend | v6.12 | Transactional emails |
| Winston | v3.19 | Structured logging |
| Zod | v4 | Schema validation |

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.2.7 | React framework (App Router) |
| TypeScript | v5 | Type safety |
| Redux Toolkit + RTK Query | v2.12 | State management + API |
| Tailwind CSS | v4 | Styling |
| shadcn/ui + Radix | latest | UI components |
| Framer Motion | v12 | Animations |
| React Hook Form + Zod | v7 / v4 | Form validation |
| Recharts | v3.8 | Analytics charts |
| Socket.IO Client | v4.8 | Real-time updates |
| Three.js | v0.184 | 3D homepage |

### DevOps
| Technology | Purpose |
|---|---|
| Docker + Docker Compose | Containerization |
| Vercel | Frontend deployment |
| Render | Backend deployment |
| MongoDB Atlas | Cloud database |
| Upstash Redis | Cloud Redis |

---

## 🚀 Getting Started

### Prerequisites

```bash
node >= 20.0.0
npm >= 10.0.0
docker >= 24.0.0 (optional)
```

### 1. Clone the repository

```bash
git clone https://github.com/rajankumarsingh01/qr_food_ordering_system.git
cd qr_food_ordering_system
```

### 2. Environment Variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

Required variables:

```env
# Database
MONGODB_URI=mongodb+srv://...
REDIS_URL=rediss://...

# Auth
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Payment
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# Storage
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# AI
GEMINI_API_KEY=

# Email
RESEND_API_KEY=
FROM_EMAIL=onboarding@resend.dev

# URLs
CLIENT_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
NEXT_PUBLIC_RAZORPAY_KEY_ID=
```

### 3. Run with Docker (Recommended)

```bash
# Development
docker-compose up --build

# Production
docker-compose -f docker-compose.prod.yml up --build -d
```

App will be available at:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

### 4. Run without Docker

**Backend:**
```bash
cd server
npm install
npm run dev
```

**Frontend:**
```bash
cd client
npm install
npm run dev
```




## 📁 Project Structure

```
qr_food_ordering_system/
│
├── client/                          # Next.js Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── (customer)/          # Customer pages
│   │   │   │   ├── menu/
│   │   │   │   ├── cart/
│   │   │   │   ├── order/[orderId]/
│   │   │   │   ├── review/
│   │   │   │   └── payment-success/
│   │   │   ├── admin/               # Admin pages
│   │   │   │   ├── login/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── menu/
│   │   │   │   ├── orders/
│   │   │   │   ├── analytics/
│   │   │   │   ├── qr/
│   │   │   │   └── reviews/
│   │   │   └── kitchen/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   ├── customer/
│   │   │   └── shared/
│   │   ├── redux/
│   │   │   ├── store.ts
│   │   │   ├── api/                 # RTK Query APIs
│   │   │   ├── slices/              # Redux slices
│   │   │   └── features/
│   │   ├── hooks/
│   │   ├── types/
│   │   ├── schemas/
│   │   └── services/
│   └── Dockerfile
│
├── server/                          # Node.js Backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── services/
│   │   ├── sockets/
│   │   ├── config/
│   │   └── utils/
│   ├── server.js
│   └── Dockerfile
│
├── docker-compose.yml
├── docker-compose.prod.yml
├── .env.example
└── README.md
```

---

## 🔌 API Endpoints

### Auth
```
POST   /api/auth/login              Admin login
POST   /api/auth/logout             Admin logout
POST   /api/auth/refresh-token      Refresh access token
GET    /api/auth/me                 Get current admin
POST   /api/auth/forgot-password    Send reset email
POST   /api/auth/reset-password     Reset password
POST   /api/auth/seed-admin         Create default admin
```

### Menu
```
GET    /api/menu                    Get all menu items
POST   /api/menu                    Create menu item (admin)
PATCH  /api/menu/:id/availability   Toggle availability (admin)
DELETE /api/menu/:id                Delete menu item (admin)
GET    /api/menu/categories         Get categories
POST   /api/menu/categories         Create category (admin)
```

### Orders
```
POST   /api/orders                  Place new order
GET    /api/orders                  Get all orders (admin)
GET    /api/orders/:id              Get order by ID
PATCH  /api/orders/:id/status       Update order status (admin)
```

### Payment
```
POST   /api/payment/create-order    Create Razorpay order
POST   /api/payment/verify          Verify payment signature
POST   /api/payment/failure         Mark payment failed
```

### Reviews
```
POST   /api/reviews                 Submit review
GET    /api/reviews                 Get all reviews (admin)
GET    /api/reviews/:orderId        Get review by order
```

### Analytics
```
GET    /api/analytics/revenue       Revenue trend data
GET    /api/analytics/top-items     Top selling items
GET    /api/analytics/peak-hours    Peak hours data
```

### AI Chat
```
POST   /api/chat                    Send message to AI assistant
```

---

## 🔴 Socket.IO Events

### Customer listens
```
order_status_update   → { orderId, status }
payment_confirmed     → { orderId }
```

### Admin listens
```
new_order             → Order object
```

### Kitchen listens
```
new_order             → Order object
kitchen_alert         → Order object
```

---

## 🌐 Deployment

### Frontend — Vercel

```bash
# Environment variables required:
NEXT_PUBLIC_API_URL
NEXT_PUBLIC_SOCKET_URL
NEXT_PUBLIC_RAZORPAY_KEY_ID
```

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rajankumarsingh01/qr_food_ordering_system)

### Backend — Render

```
Build Command:  npm install
Start Command:  npm start
Root Directory: server
```

---

## 🔑 Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `MONGODB_URI` | ✅ | MongoDB Atlas connection string |
| `REDIS_URL` | ✅ | Upstash Redis URL |
| `JWT_ACCESS_SECRET` | ✅ | Min 32 chars |
| `JWT_REFRESH_SECRET` | ✅ | Min 32 chars |
| `RAZORPAY_KEY_ID` | ✅ | Razorpay API key |
| `RAZORPAY_KEY_SECRET` | ✅ | Razorpay secret |
| `CLOUDINARY_CLOUD_NAME` | ✅ | Cloudinary config |
| `CLOUDINARY_API_KEY` | ✅ | Cloudinary config |
| `CLOUDINARY_API_SECRET` | ✅ | Cloudinary config |
| `GEMINI_API_KEY` | ✅ | Google AI Studio key |
| `RESEND_API_KEY` | ✅ | Resend email service |
| `CLIENT_URL` | ✅ | Frontend URL for CORS |

---

## 🤝 Contributing

Contributions are welcome!

```bash
# Fork the repo
# Create your feature branch
git checkout -b feature/AmazingFeature

# Commit your changes
git commit -m 'feat: add AmazingFeature'

# Push to the branch
git push origin feature/AmazingFeature

# Open a Pull Request
```

---

## 📄 License

Distributed under the ISC License. See `LICENSE` for more information.

---

## 👨‍💻 Author

**Rajan Kumar Singh**

[![GitHub](https://img.shields.io/badge/GitHub-rajankumarsingh01-black?style=flat&logo=github)](https://github.com/rajankumarsingh01)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin)](https://linkedin.com/in/rajankumarsingh01)



---

<div align="center">

Made with ❤️ by **Rajan Kumar Singh**

⭐ Star this repo if you found it helpful!

</div>