import mongoose from 'mongoose';
import { MONGO_URI } from "./config";

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Create schemas
const Schema = mongoose.Schema;

// User schema
const UserSchema = new Schema({
  username: { 
    type: String,
    unique: true
  },
  password: {
    type: String
  }
});

// Content schema
const ContentSchema = new Schema({
  title: String,
  link: String,
  tags: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Tag"
  }],
  type: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true
  }
});

// Link schema
const LinkSchema = new Schema({
  hash: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  }
});

// Create and export models
export const UserModel = mongoose.model("User", UserSchema);
export const ContentModel = mongoose.model("content", ContentSchema);
export const LinkModel = mongoose.model("Links", LinkSchema);