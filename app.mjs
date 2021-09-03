import express from "express";
import productsRouter from "./routers/products.mjs"
import usersRouter from "./routers/users.mjs"

const app = express();
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App running on port ${port}..`);
});
