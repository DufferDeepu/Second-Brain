import express, {Request, Response} from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import bcrypt from "bcrypt";
import { ContentModel, LinkModel, UserModel } from "./db";
import { JWT_SECRET } from "./config";
import { userMiddleware } from "./middleware";
import { random } from "./utils";

// Create Express app
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;


// Sign up endpoint
app.post('/api/v1/signup', async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
    
  try {
    // Hash password for security
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    await UserModel.create({
      username,
      password: hashedPassword
    });

    res.json({
      message: "user signed up"
    });
  } catch (error) {
    res.status(411).json({
      message: "User already signed up"
    });
  }
});

// Sign in endpoint
app.post('/api/v1/signin', async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;

  // Find user by username
  const existingUser = await UserModel.findOne({
    username
  });

  if (existingUser && existingUser.password) {
    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        
    if (isPasswordValid) {
      // Create JWT token
      const token = jwt.sign({
        id: existingUser._id
      }, JWT_SECRET);

      res.json({
        token
      });
    } else {
      res.status(403).json({
        message: "Incorrect Credentials"
      });
    }
  } else {
    res.status(403).json({
      message: "Incorrect Credentials"
    });
  }
});

// Add content endpoint
app.post('/api/v1/content', userMiddleware, async (req: Request, res: Response) => {
  console.log("Received request body:", req.body);
  console.log("User ID from token:", req.userId);
  
  const { link, type, title } = req.body;

  try {
    // Create new content
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
      message: "Error adding content"
    });
  }
});

// Get user content endpoint
app.get('/api/v1/content', userMiddleware, async (req: Request, res: Response) => {
  const userId = req.userId;
  
  // Get all content for this user
  const content = await ContentModel.find({
    userId
  }).populate("userId", "username");
  
  res.json({
    content
  });
});

// Delete content endpoint
app.post('/api/v1/delete', userMiddleware, async (req: Request, res: Response) => {
  const contentId = req.body.contentId;

  // Delete content for this user
  await ContentModel.deleteMany({
    _id: contentId,
    userId: req.userId
  });
  
  res.json({
    message: "Content deleted"
  });
});

// Share brain endpoint
app.post('/api/v1/brain/share', userMiddleware, async (req: Request, res: Response) => {
  const share = req.body.share;
  
  if (share) {
    // Check if user already has a share link
    const existingLink = await LinkModel.findOne({
      userId: req.userId
    });

    if (existingLink) {
      res.json({
        hash: existingLink.hash
      });
      return;
    }

    // Generate new hash
    const hash = random(10);
    
    // Create new link
    await LinkModel.create({
      userId: req.userId,
      hash: hash
    });

    res.json({
      hash
    });
  } else {
    // Remove share link
    await LinkModel.deleteOne({
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
  const link = await LinkModel.findOne({
    hash
  });

  if (!link) {
    res.status(411).json({
      message: "Sorry incorrect input"
    });
    return;
  }
  
  // Get all content for shared user
  const content = await ContentModel.find({
    userId: link.userId
  });

  console.log(link);
  
  // Get user info
  const user = await UserModel.findOne({
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