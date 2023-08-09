import { Router } from "express";
import { login, profile, register } from "../controllers/user";
import { jwtAuth } from "../middlewares/jwtAuth";
const router = Router();

router.get("/api/users", jwtAuth, profile);
router.post("/api/users/register", register);
router.post("/api/users/login", login);

export { router as userRouter };
