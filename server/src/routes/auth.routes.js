import { Router } from "express";

import verifyJWT from "../middlewares/auth.middleware.js";

import {
  loginAdmin,
  logoutAdmin,
  refreshAccessToken,
  getCurrentAdmin,
    seedAdmin,
} from "../controllers/auth.controller.js";

const router = Router();



router.post(
  "/seed-admin",
  seedAdmin
);

router.post(
  "/login",
  loginAdmin
);

router.post(
  "/refresh-token",
  refreshAccessToken
);

router.post(
  "/logout",
  verifyJWT,
  logoutAdmin
);

router.get(
  "/me",
  verifyJWT,
  getCurrentAdmin
);

export default router;