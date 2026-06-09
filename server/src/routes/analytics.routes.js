// import { Router } from "express";

// import {
//   getRevenueAnalytics,
//   getTopItems,
//   getPeakHours,
// } from "../controllers/analytics.controller.js";

// const router = Router();



// router.get(
//   "/revenue",
//   getRevenueAnalytics
// );

// router.get(
//   "/top-items",
//   getTopItems
// );

// router.get(
//   "/peak-hours",
//   getPeakHours
// );

// export default router;




import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
  getRevenueAnalytics,
  getTopItems,
  getPeakHours,
} from "../controllers/analytics.controller.js";

const router = Router();

router.use(verifyJWT);  // ← sabhi routes pe apply hoga

router.get("/revenue", getRevenueAnalytics);
router.get("/top-items", getTopItems);
router.get("/peak-hours", getPeakHours);

export default router;