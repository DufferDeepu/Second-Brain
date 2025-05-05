import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

// Middleware to check if user is authenticated
export function userMiddleware(req: Request, res: Response, next: NextFunction): void {
  try {
    // Get token from header
    const token = req.headers["authorization"];
  
    // Check if token exists
    if (!token) {
      res.status(401).json({
        message: "Token missing"
      });
      return;
    }
  
    // Remove "Bearer " prefix if present
    let tokenValue = token;
    if (typeof token === "string" && token.startsWith("Bearer ")) {
      tokenValue = token.slice(7);
    }
  
    // Verify token
    const decoded = jwt.verify(tokenValue as string, JWT_SECRET) as any;
  
    if (decoded && decoded.id) {
      // Add userId to request object
      req.userId = decoded.id;
      next();
    } else {
      res.status(403).json({
        message: "Unauthorized"
      });
      return;
    }
  } catch (error) {
    res.status(403).json({
      message: "Unauthorized"
    });
    return;
  }
}