import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  deleteOrder,
} from "../controllers/order.controller.js";

const router = Router();

// ✅ Public — Customer
router.post("/", createOrder);
router.patch("/:id/cancel", cancelOrder);
router.get("/:id", getOrderById);

// ✅ Admin — specific pehle, phir dynamic
router.get("/", verifyJWT, getOrders);
router.patch("/:id/status", verifyJWT, updateOrderStatus);
router.delete("/:id", verifyJWT, deleteOrder);

export default router;