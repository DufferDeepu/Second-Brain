import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "./config";

export function userMiddleware(req: Request, res: Response, next: NextFunction): void {
    try {
        // Get the token from the Authorization header
        const token = req.headers["authorization"];
  
        // Check if the token is missing or is not a string
        if (!token || typeof token !== "string") {
            res.status(401).json({
                message: "Token missing or invalid"
            });
            return;
        }
  
        // Remove the "Bearer " part of the token if present
        const tokenWithoutBearer = token.startsWith("Bearer ") ? token.slice(7) : token;

        // Verify the token using jwt.verify
        const decoded = jwt.verify(tokenWithoutBearer, JWT_SECRET) as JwtPayload;

        if (decoded) {
            req.userId = decoded.id; // Use 'id' instead of 'userId'
            next(); // Continue to the next middleware or route handler
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

