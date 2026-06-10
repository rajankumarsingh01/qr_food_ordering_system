import express from "express";
import cors from "cors";
import helmet from "helmet";

import logger from "./middlewares/logger.middleware.js";
import rateLimiter from "./middlewares/ratelimiter.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notfound.middleware.js";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";

import paymentRoutes from "./routes/payment.routes.js";



import tableRoutes
from "./routes/table.routes.js";

import menuRoutes from "./routes/menu.routes.js";

import orderRoutes
from "./routes/order.routes.js";
import reviewRoutes
from "./routes/review.routes.js";
import analyticsRoutes
from "./routes/analytics.routes.js";

import chatRoutes from "./routes/chat.routes.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://qr-food-ordering-system-nine.vercel.app",
      process.env.CLIENT_URL,
    ].filter(Boolean),
    credentials: true,
  })
);

app.use(rateLimiter);

app.use(express.json({ limit: "10kb" }));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

app.use(logger);

app.use(
  "/api/auth",
  authRoutes
);


app.use(
  "/api/tables",
  tableRoutes
);

app.use(
  "/api/menu",
  menuRoutes
);

app.use(
  "/api/orders",
  orderRoutes
);

app.use(
  "/api/payment",
  paymentRoutes
);

app.use(
  "/api/reviews",
  reviewRoutes
);

app.use(
  "/api/analytics",
  analyticsRoutes
);

app.use(
  "/api/chat",
  chatRoutes
);

app.get("/api/v1/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "API is healthy 🚀",
  });
});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Future Routes:
| authRoutes
| menuRoutes
| orderRoutes
| tableRoutes
|
*/

app.use(notFound);

app.use(errorHandler);

export default app;