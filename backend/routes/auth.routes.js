import express from "express";
import { signup, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.get('/health', (req, res)=>{
  return res.send("Health ok");
});

router.post('/signup', signup);
router.post('/login', login);


export default router;