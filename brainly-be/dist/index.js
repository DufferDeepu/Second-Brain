"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post('/api/v1/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        yield db_1.UserModel.create({
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
}));
app.post('/api/v1/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = yield db_1.UserModel.findOne({
        username
    });
    if (existingUser && existingUser.password) {
        const isPasswordValid = yield bcrypt_1.default.compare(password, existingUser.password);
        if (isPasswordValid) {
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
}));
app.post('/api/v1/content', middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Received request body:", req.body);
    console.log("User ID from token:", req.userId);
    const { link, type, title } = req.body;
    try {
        yield db_1.ContentModel.create({
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
            message: "Error adding content",
        });
    }
}));
app.get('/api/v1/content', middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const content = yield db_1.ContentModel.find({
        userId
    }).populate("userId", "username");
    res.json({
        content
    });
}));
app.post('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    yield db_1.ContentModel.deleteMany({
        contentId,
        userId: req.userId
    });
    res.json({
        message: "Content deleted"
    });
}));
app.post('/brain/share', (req, res) => {
    res.json({
        message: ""
    });
});
app.get('/brain/:shareLink', (req, res) => {
    res.json({
        message: ""
    });
});
app.listen(3000);
// {
//     "link": "http://example.com",
//     "type": "video",
//     "title": "Example Content"
// }
