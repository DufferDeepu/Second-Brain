import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import bcrypt from "bcrypt";
import { ContentModel, LinkModel, UserModel } from "./db";
import { JWT_SECRET } from "./config";
import { userMiddleware } from "./middleware";
import { random } from "./utils";

const app = express();
app.use(express.json());
app.use(cors());


app.post('/api/v1/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
   try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.create({
        username,
        password: hashedPassword
    })

    res.json({
        message: "user signed up"
    })
   } catch (error) {
    res.status(411).json({
        message : "User already signed up"
    })
   }

})

app.post('/api/v1/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await UserModel.findOne({
        username
    })

    if (existingUser && existingUser.password) {
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        
        if (isPasswordValid) {
            const token = jwt.sign({
                id: existingUser._id
            }, JWT_SECRET);

            res.json({
                token
            })
        } else {
            res.status(403).json({
                message: "Incorrect Credentials"
            })
        }
    } else {
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }
});

app.post('/api/v1/content', userMiddleware, async (req, res) => {

    console.log("Received request body:", req.body);
    console.log("User ID from token:", req.userId);
    const { link, type, title } = req.body;

    try {
        await ContentModel.create({
            link,
            type,
            title,
            userId: req.userId,
            tags: []
        });

        res.json({
            message: "Content added"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error adding content",
        });
    }
});


app.get('/api/v1/content', userMiddleware, async (req, res) => {
    const userId = req.userId;
    const content = await ContentModel.find({
        userId
    }).populate("userId", "username")
    res.json({
        content
    })
})

app.post('/delete', async (req, res) => {
    const contentId = req.body.contentId;

    await ContentModel.deleteMany({
        contentId,
        userId: req.userId
    })
    res.json({
        message: "Content deleted"
    })
})

app.post('api/v1/brain/share', userMiddleware, async (req, res) => {
    const share = req.body.share;
    if (share) {
        const existingLink = await LinkModel.findOne({
            userId: req.userId
        });

        if (existingLink) {
            res.json({
                hash: existingLink.hash
            })
            return;
        }
        const hash = random(10);
        await LinkModel.create({
            userId: req.userId,
            hash: hash
        })

        res.json({
            hash
        })
} else {
    await LinkModel.deleteOne({
        userId: req.userId
    });

    res.json({
        message: "Removed link"
    })
}
})


app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash
    });

    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        })
        return;
    }
    // userId
    const content = await ContentModel.find({
        userId: link.userId
    })

    console.log(link);
    const user = await UserModel.findOne({
        _id: link.userId
    })

    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        })
        return;
    }

    res.json({
        username: user.username,
        content: content
    })

})

app.listen(3000);


// {
//     "link": "http://example.com",
//     "type": "video",
//     "title": "Example Content"
// }
