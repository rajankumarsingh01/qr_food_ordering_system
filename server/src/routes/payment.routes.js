import { Router } from "express";

import {
  createRazorpayOrder,
  verifyPayment,
  markPaymentFailed
} from "../controllers/payment.controller.js";

const router = Router();

router.post(
  "/create-order",
  createRazorpayOrder
);

router.post(
  "/verify",
  verifyPayment
);
router.post(
  "/failure",
  markPaymentFailed
);

export default router;