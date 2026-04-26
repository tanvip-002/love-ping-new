import express from "express";
import {
  createPing,
  getAllPings,
  resetPing,
  updatePing,
} from "../controllers/pingController.js";

const router = express.Router();

router.get("/", getAllPings);
router.post("/", createPing);
router.put("/:id", updatePing);
router.delete("/:id", resetPing);

export default router;
