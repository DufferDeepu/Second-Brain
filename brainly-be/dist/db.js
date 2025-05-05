"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = exports.ContentModel = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
// Connect to MongoDB
mongoose_1.default
    .connect(config_1.MONGO_URI)
    .then(() => console.log("Connected to MongoDB!"))
    .catch((err) => console.error("MongoDB connection error:", err));
// Create schemas
const Schema = mongoose_1.default.Schema;
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Tag"
        }],
    type: String,
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});
// Link schema
const LinkSchema = new Schema({
    hash: String,
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    }
});
// Create and export models
exports.UserModel = mongoose_1.default.model("User", UserSchema);
exports.ContentModel = mongoose_1.default.model("content", ContentSchema);
exports.LinkModel = mongoose_1.default.model("Links", LinkSchema);
