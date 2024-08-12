import express from "express";
import { login } from "../controllers/auth.controller.js";


const router = express.Router();

router.get('/health', (req, res)=>{
  return res.send("Health ok");
});

router.post('/login', login);

export default router;