import { Router }
from "express";

import verifyJWT
from "../middlewares/auth.middleware.js";

import {
  createTable,
  getTables,
  deleteTable,
}
from "../controllers/table.controller.js";

const router = Router();

router.get(
  "/",
  verifyJWT,
  getTables
);

router.post(
  "/",
  verifyJWT,
  createTable
);

router.delete(
  "/:id",
  verifyJWT,
  deleteTable
);

export default router;