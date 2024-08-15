import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";

const router = express.Router();

router.get('/health', (req, res)=>{
  return res.status(200).send("Health ok");
});

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

export default router;