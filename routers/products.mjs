import express from "express";
import { getProductByProductId, getAllProducts } from "../db/queries.mjs";
import { log } from "../utils.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (err) {
    log(err);
    res.sendStatus(500);
  }
});

router.get("/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await getProductByProductId(+productId);
    if (product) res.send(product);
    else res.sendStatus(404);
  } catch (err) {
    log(err);
    res.sendStatus(500);
  }
});

export default router;
