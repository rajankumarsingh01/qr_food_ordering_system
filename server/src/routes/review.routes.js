import { Router } from "express";

import {
  createReview,
  getReviews,
  getReviewByOrder,
} from "../controllers/review.controller.js";

const router = Router();

router.post(
  "/",
  createReview
);

router.get(
  "/",
  getReviews
);

router.get(
  "/:orderId",
  getReviewByOrder
);

export default router;