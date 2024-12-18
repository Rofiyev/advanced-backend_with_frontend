import { Router } from "express";
import authController from "../controllers/auth.controller";

const router: Router = Router();

router.post("/register", authController.register);
router.get("/activation/:id", authController.activation);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/refresh", authController.refresh);

export default router;
