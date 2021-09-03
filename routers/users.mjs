import express from "express";
import { getUserByUserId } from "../db/queries.mjs";
import { log } from "../utils.mjs";

const router = express.Router();

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await getUserByUserId(+userId);
    res.send(user);
  } catch (err) {
    log(err);
    res.sendStatus(500);
  }
});

export default router;
