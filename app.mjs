import express from "express";
import productsRouter from "./routers/products.mjs"

const app = express();
app.use("/api/products", productsRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App running on port ${port}..`);
});
