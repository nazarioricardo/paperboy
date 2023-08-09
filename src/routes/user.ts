import { Router } from "express";
import { login, profile, register } from "../controllers/user";
import { requireJwtAuth } from "../middlewares/requireJwtAuth";
const router = Router();

router.get("/api/users", requireJwtAuth, profile);
router.post("/api/users/register", register);
router.post("/api/users/login", login);

export { router as userRouter };
