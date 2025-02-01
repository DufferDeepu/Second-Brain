"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = userMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
function userMiddleware(req, res, next) {
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
        const decoded = jsonwebtoken_1.default.verify(tokenWithoutBearer, config_1.JWT_SECRET);
        if (decoded) {
            req.userId = decoded.id; // Use 'id' instead of 'userId'
            next(); // Continue to the next middleware or route handler
        }
        else {
            res.status(403).json({
                message: "Unauthorized"
            });
            return;
        }
    }
    catch (error) {
        res.status(403).json({
            message: "Unauthorized"
        });
        return;
    }
}
