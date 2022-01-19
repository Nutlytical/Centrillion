import express from "express";

import { signIn, signUp, signOut } from "../controllers/user";
import { isUserLogin } from "../middleware/user";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/signout", isUserLogin, signOut);

export default router;
