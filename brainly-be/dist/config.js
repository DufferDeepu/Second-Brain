"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_URI = exports.JWT_SECRET = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
// Get environment variables and export them
exports.JWT_SECRET = process.env.JWT_SECRET || "";
exports.MONGO_URI = process.env.MONGO_URI || "";
// Check if required environment variables are available
if (!exports.JWT_SECRET || !exports.MONGO_URI) {
    throw new Error("Missing required environment variables!");
}
