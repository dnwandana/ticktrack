import { Router } from "express";
import { verifyToken } from "../middlewares/jwt.js";

import auth from "./auth.js";
import labels from "./labels.js";
import statuses from "./statuses.js";

const router = Router();

router.use("/auth", auth);
router.use("/labels", verifyToken, labels);
router.use("/statuses", verifyToken, statuses);

export default router;
