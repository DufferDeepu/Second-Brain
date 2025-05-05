"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = userMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
// Middleware to check if user is authenticated
function userMiddleware(req, res, next) {
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
        const decoded = jsonwebtoken_1.default.verify(tokenValue, config_1.JWT_SECRET);
        if (decoded && decoded.id) {
            // Add userId to request object
            req.userId = decoded.id;
            next();
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
