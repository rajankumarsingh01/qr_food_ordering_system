import "dotenv/config";  // ← PEHLI LINE
import http from "http";
import { Server } from "socket.io";

import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import connectRedis from "./src/config/redis.js";

import logger from "./src/utils/logger.js";
import env from "./src/config/env.js";



import registerOrderSocketEvents
from "./src/sockets/orderSocket.js";

import { setIO }
from "./src/sockets/socketManager.js";

logger.info(`🌍 Environment: ${env.NODE_ENV}`);

const PORT = env.PORT || 5000;

const startServer = async () => {
  try {
    // Database Connection
    logger.info(`🔗 Connecting to MongoDB: ${env.MONGO_URI}`);
    await connectDB();

    // Redis Connection
    await connectRedis();

    // Create HTTP Server
    const httpServer = http.createServer(app);

    // Socket.io Server
    const io = new Server(httpServer, {
      cors: {
        origin: env.CLIENT_URL || "http://localhost:3000",
        credentials: true,
      },
    });

    // Socket Instance Store
    app.set("io", io);
    setIO(io);

    io.on("connection", (socket) => {
      logger.info(`🔌 Socket Connected: ${socket.id}`);

      socket.on("disconnect", () => {
        logger.info(`❌ Socket Disconnected: ${socket.id}`);
      });
    });

      registerOrderSocketEvents(io);  // ← ye add karo — pehle missing tha


    httpServer.listen(PORT, () => {
      logger.info(`
================================================
🚀 QR FOOD ORDERING SERVER STARTED
================================================
🌍 Environment : ${env.NODE_ENV}
🚪 Port        : ${PORT}
================================================
      `);
    });

    // Graceful Shutdown
    const shutdown = async () => {
      logger.info("🛑 Server shutting down...");

      httpServer.close(() => {
        logger.info("✅ HTTP Server Closed");
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    logger.error("❌ Server Startup Failed");
    logger.error(error);
    process.exit(1);
  }
};

startServer();