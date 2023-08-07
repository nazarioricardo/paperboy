import { Router } from "express";
import { register } from "../controllers/user";

const router = Router();

router.post("/api/users", register);

export default router;
