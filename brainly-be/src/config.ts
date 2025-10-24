import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get environment variables and export them
export const JWT_SECRET = process.env.JWT_SECRET || "";
export const MONGO_URI = process.env.MONGO_URI || "";

// Check if required environment variables are available
if (!JWT_SECRET || !MONGO_URI) {
  throw new Error("Missing required environment variables!");
}