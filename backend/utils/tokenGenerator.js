import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  
  const JWT_SECRET_KEY  ='BuzzChat';
  console.log('generate token', userId); // objectId
  const token = jwt.sign(
    { userId }
  , JWT_SECRET_KEY, { expiresIn:'3d' })

  // set cookies 
  res.cookie('token', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // MS
		httpOnly: true, // prevent XSS attacks cross-site scripting attacks
		sameSite: "strict", // CSRF attacks cross-site request forgery attacks
		secure: process.env.NODE_ENV !== "development",
  });
}

export default generateTokenAndSetCookie;