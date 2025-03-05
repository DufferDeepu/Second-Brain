# 🧠 SecondBrain

SecondBrain is a personal knowledge management app that allows users to store and organize various types of content, including:  
✅ Tweets 🐦  
✅ YouTube Videos 📺  
✅ Documents & Notes 📄  
✅ Web Links & Other Resources 🔗  

🚀 Easily save, access, and manage your digital content in one place!

---

## ✨ Features
- 📌 Save & organize tweets – Store important Twitter/X posts.  
- 🎥 Embed YouTube videos – Keep track of educational/reference videos.  
- 📄 Store documents & text notes – Save articles, research papers, and notes.  
- 🔒 User authentication – Secure login with JWT authentication.  
- 🎨 Modern UI – Built with React + TailwindCSS.  
- ⚡ Fast backend – Powered by Express.js & MongoDB.  

---

## 🛠 Tech Stack
| Frontend      | Backend      | Database    |
|--------------|-------------|------------|
| React 18     | Node.js     | MongoDB    |
| Vite.js      | Express.js  | Mongoose   |
| TailwindCSS  | JWT         | bcrypt     |

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/DufferDeepu/Second-Brain.git
cd Second-Brain
```

### 2️⃣ Backend Setup (Node.js + Express + MongoDB)
```bash
cd brainly-be
npm install
```

Create a `.env` file inside the `brainly-be/` folder and add the following:
```
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
```

Start the backend:
```bash
npm run dev
```

### 3️⃣ Frontend Setup (React + Vite)
```bash
cd brainly-fe
npm install
npm run dev
```

## 🎯 Future Improvements
* 📝 **Markdown support** for text notes.
* 🔍 **Search functionality** for easy content discovery.
* 📌 **Tagging system** for better organization.
* 📤 **Social sharing features** to share content easily.

## 🤝 Contributing
We welcome contributions! To contribute:
1. **Fork** the repository.
2. **Create a new branch** (e.g., `feature-new-idea`).
3. **Commit your changes**.
4. **Open a pull request**.
