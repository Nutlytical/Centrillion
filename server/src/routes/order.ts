import express from "express";

import {
  createOrder,
  userOrders,
  updateOrder,
  orders,
} from "../controllers/order";
import { isUserLogin, isAdmin } from "../middleware/user";

const router = express.Router();

router.get("/", isUserLogin, userOrders);
router.get("/admin", isAdmin, orders);
router.get("/create", isUserLogin, createOrder);
router.post("/update", isUserLogin, updateOrder);

export default router;
