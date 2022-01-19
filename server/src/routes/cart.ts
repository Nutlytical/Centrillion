import express from "express";

import { userCart, addToCart, deleteCartItem } from "../controllers/cart";
import { isUserLogin } from "../middleware/user";

const router = express.Router();

router.get("/", isUserLogin, userCart);
router.post("/add-to-cart", isUserLogin, addToCart);
router.delete("/delete/:productId", isUserLogin, deleteCartItem);

export default router;
