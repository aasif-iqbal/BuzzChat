import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {

  try {
      const JWT_SECRET_KEY  ='BuzzChat';
  
      const token = req.cookies.token;

      if(!token){
        return res.status(401).json({'error':'Unauthorized - token not found'});
      }
      
      const verifyToken = jwt.verify(token, JWT_SECRET_KEY);            
      
      if(!verifyToken){
        return res.status(401).json({error:'Unauthorized - Invalid Token'});
      }

      const user = await User.findById(verifyToken.userId).select('-password');
      
      if(!user){
        return res.status(404).json({error:'User not found'});
      }
            
      // Attach user data to req object
      req.user = user;      
      next();
  } catch (error) {
      console.log("Error in protectRoute middleware: ", error.message);
      res.status(500).json({'error':error});
  }
}

export default authMiddleware;