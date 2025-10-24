"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cors_1 = __importDefault(require("cors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("./db");
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
// Create Express app
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const PORT = process.env.PORT || 3000;
// Sign up endpoint
app.post('/api/v1/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        // Hash password for security
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // Create new user
        await db_1.UserModel.create({
            username,
            password: hashedPassword
        });
        res.json({
            message: "user signed up"
        });
    }
    catch (error) {
        res.status(411).json({
            message: "User already signed up"
        });
    }
});
// Sign in endpoint
app.post('/api/v1/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Find user by username
    const existingUser = await db_1.UserModel.findOne({
        username
    });
    if (existingUser && existingUser.password) {
        // Check if password is correct
        const isPasswordValid = await bcrypt_1.default.compare(password, existingUser.password);
        if (isPasswordValid) {
            // Create JWT token
            const token = jsonwebtoken_1.default.sign({
                id: existingUser._id
            }, config_1.JWT_SECRET);
            res.json({
                token
            });
        }
        else {
            res.status(403).json({
                message: "Incorrect Credentials"
            });
        }
    }
    else {
        res.status(403).json({
            message: "Incorrect Credentials"
        });
    }
});
// Add content endpoint
app.post('/api/v1/content', middleware_1.userMiddleware, async (req, res) => {
    console.log("Received request body:", req.body);
    console.log("User ID from token:", req.userId);
    const { link, type, title } = req.body;
    try {
        // Create new content
        await db_1.ContentModel.create({
            link,
            type,
            title,
            userId: req.userId,
            tags: []
        });
        res.json({
            message: "Content added"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error adding content"
        });
    }
});
// Get user content endpoint
app.get('/api/v1/content', middleware_1.userMiddleware, async (req, res) => {
    const userId = req.userId;
    // Get all content for this user
    const content = await db_1.ContentModel.find({
        userId
    }).populate("userId", "username");
    res.json({
        content
    });
});
// Delete content endpoint
app.post('/api/v1/delete', middleware_1.userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;
    // Delete content for this user
    await db_1.ContentModel.deleteMany({
        _id: contentId,
        userId: req.userId
    });
    res.json({
        message: "Content deleted"
    });
});
// Share brain endpoint
app.post('/api/v1/brain/share', middleware_1.userMiddleware, async (req, res) => {
    const share = req.body.share;
    if (share) {
        // Check if user already has a share link
        const existingLink = await db_1.LinkModel.findOne({
            userId: req.userId
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        // Generate new hash
        const hash = (0, utils_1.random)(10);
        // Create new link
        await db_1.LinkModel.create({
            userId: req.userId,
            hash: hash
        });
        res.json({
            hash
        });
    }
    else {
        // Remove share link
        await db_1.LinkModel.deleteOne({
            userId: req.userId
        });
        res.json({
            message: "Removed link"
        });
    }
});
// Get shared brain endpoint
app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;
    // Find link by hash
    const link = await db_1.LinkModel.findOne({
        hash
    });
    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        });
        return;
    }
    // Get all content for shared user
    const content = await db_1.ContentModel.find({
        userId: link.userId
    });
    console.log(link);
    // Get user info
    const user = await db_1.UserModel.findOne({
        _id: link.userId
    });
    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        });
        return;
    }
    res.json({
        username: user.username,
        content: content
    });
});
// Start server
app.listen(PORT, () => {
    console.log("Server running on port 3000");
});
