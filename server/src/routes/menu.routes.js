import { Router } from "express";

import verifyJWT from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

import {
  createCategory,
  getCategories,
  createMenuItem,
  getMenuItems,
  toggleAvailability,
  deleteMenuItem,
} from "../controllers/menu.controller.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Categories
|--------------------------------------------------------------------------
*/

router.post(
  "/categories",
  verifyJWT,
  createCategory
);

router.get(
  "/categories",
  getCategories
);

/*
|--------------------------------------------------------------------------
| Menu Items
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  verifyJWT,
  upload.single("image"),
  createMenuItem
);

router.get(
  "/",
  getMenuItems
);

router.patch(
  "/:id/availability",
  verifyJWT,
  toggleAvailability
);

router.delete(
  "/:id",
  verifyJWT,
  deleteMenuItem
);

export default router;