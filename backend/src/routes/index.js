import { Router } from "express";
import { verifyToken } from "../middlewares/jwt.js";

import auth from "./auth.js";
import labels from "./labels.js";

const router = Router();

router.use("/auth", auth);
router.use("/labels", verifyToken, labels);

export default router;
