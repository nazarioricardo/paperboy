import { Router } from "express";
import { login, profile, register } from "../controllers/user";
import { authorize } from "../middlewares/auth";
const router = Router();

router.get("/api/users", authorize, profile);
router.post("/api/users/register", register);
router.post("/api/users/login", login);

export default router;
