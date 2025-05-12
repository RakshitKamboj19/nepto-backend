import express from "express";
import { subscribeNewsletter } from "../controllers/newsletterController.js";

const router = express.Router();

// Newsletter subscription route
router.post("/subscribe", subscribeNewsletter);

export default router;
