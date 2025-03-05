import mongoose, { model } from 'mongoose';

import { MONGO_URI } from "./config";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { 
    type: String,
    unique: true
    },
  password: {
    type: String
  }
});

export const UserModel = model("User", UserSchema);

const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{
        type: mongoose.Types.ObjectId, ref: "Tag"
    }],
    type: String,
    userId: {
        type: mongoose.Types.ObjectId, ref: "User", 
        required: true
    }
});

export const ContentModel = model("content", ContentSchema);

const LinkSchema = new Schema({
    hash: String,
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    }
});

export const LinkModel = model("Links", LinkSchema);