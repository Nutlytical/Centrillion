import express from "express";

import { isAdmin } from "../middleware/user";
import {
  products,
  product,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product";
import { haveProductNameQuery } from "../middleware/query";

const router = express.Router();

router.get("/", haveProductNameQuery, products);
router.get("/:productId", product);
router.post("/create", isAdmin, createProduct);
router.post("/update", isAdmin, updateProduct);
router.delete("/delete/:productId", isAdmin, deleteProduct);

export default router;
