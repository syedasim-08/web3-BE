import { Router } from 'express';

import {
  createProduct,
  getAllProducts,
  getProduct,
  replaceProduct,
  updateProduct,
  // deleteProduct,
} from "../controller/products.js";

const router =Router();

router
  .post("/", createProduct)
  .get("/", getAllProducts)
  .get("/:id", getProduct)
  .put("/:id", replaceProduct)
  .patch("/:id", updateProduct)
  // .delete("/:id", deleteProduct);

export default router
