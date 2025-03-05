import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

export const JWT_SECRET = process.env.JWT_SECRET as string;
export const MONGO_URI = process.env.MONGO_URI as string;

if (!JWT_SECRET || !MONGO_URI) {
  throw new Error("Missing required environment variables!");
}
