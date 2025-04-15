const jwt = require("jsonwebtoken");
import { Request, Response ,NextFunction} from "express";
const jwtAuthMiddleware = (req:Request, res:Response, next:NextFunction) => {
  // if (!req.cookies || req.cookies.token) {
  //   return res.status(401).json({
  //     error: "Unauthorized: Token not found",
  //   });
  // }
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({
      error: "Unauthorized: token not found",
    });
  }
  try {
    // verify jwt token
    const decodedValue = jwt.verify(token, process.env.JWT_SECRET);
    (req as any).userPayload = decodedValue;
    next();
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "Invalid token",
      details: error.message,
    });
  }
};

// function to generate jwt token
const generateToken = (userData:any) => {
  return jwt.sign(userData, process.env.JWT_SECRET,{expiresIn: "2d"});
};

export { jwtAuthMiddleware, generateToken };
