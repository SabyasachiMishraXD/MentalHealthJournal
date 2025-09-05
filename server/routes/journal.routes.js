import express from "express";
import { createJournal, getAllJournals } from "../controllers/journal.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { getDefaultPrompt } from "../controllers/journal.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createJournal);
router.get("/all", verifyToken, getAllJournals);
router.get("/default-prompt", getDefaultPrompt);

export default router;