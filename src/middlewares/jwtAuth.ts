import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const jwtAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "UnjwtAuthd" });
  }

  try {
    const decoded = await jwt.verify(token, "Glorfindel");
    req.body.user = decoded;
    next();
  } catch (error) {
    console.log("error");
    return res.status(401).json({ message: "UnjwtAuthd" });
  }
};

export const adminjwtAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body.user;
    if (user.role === "admin") {
      next();
    } else {
      return res.status(401).json({ message: "UnjwtAuthd" });
    }
  } catch (error) {
    return res.status(401).json({ message: "UnjwtAuthd" });
  }
};
