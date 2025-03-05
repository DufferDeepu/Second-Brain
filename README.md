🧠 SecondBrain
SecondBrain is a personal knowledge management app that allows users to store and organize various types of content, including:
✅ Tweets 🐦
✅ YouTube Videos 📺
✅ Documents & Text Notes 📄
✅ Links & Other Resources 🔗
<br>
With SecondBrain, you can easily save, access, and manage your digital content in one place!
<br>
🚀 Features
Save & organize tweets – Store important Twitter/X posts.
Embed YouTube videos – Keep track of educational or reference videos.
Store documents & text notes – Save text-based content like articles or notes.
User authentication – Secure access with JWT-based authentication.
Clean & modern UI – Built with React + TailwindCSS.
Fast backend – Powered by Express.js & MongoDB.
<br>
🛠️ Tech Stack
Frontend (React + Vite)
React 18 for UI
TailwindCSS 4 for styling
React Router for navigation
Lucide Icons for a modern look
Backend (Node.js + Express)
Express.js – Fast and lightweight API
MongoDB + Mongoose – Data storage
JWT (jsonwebtoken) – Authentication
bcrypt – Password hashing
dotenv – Secure environment variables
<br>
📦 Installation & Setup
1️⃣ Clone the Repository
bash
Copy code
git clone https://github.com/DufferDeepu/Second-Brain.git
cd secondbrain
2️⃣ Backend Setup (Node.js + Express + MongoDB)
bash
Copy code
cd brainly-be
npm install
Create a .env file in brainly-be/ and add:
<br>
env
Copy code
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
Start the backend:
<br>
bash
Copy code
npm run dev
3️⃣ Frontend Setup (React + Vite)
Open a new terminal and run:
<br>
bash
Copy code
cd brainly-fe
npm install
npm run dev
<br>
💡 Usage
1️⃣ Login/Register to your account
2️⃣ Save tweets, videos, notes, and links
3️⃣ Access and organize your content easily
<br>
🎯 Future Improvements
📝 Markdown support for notes
🔍 Search functionality
📌 Tagging system for better organization
📤 Social sharing features
<br>
🤝 Contributing
Want to improve SecondBrain? Feel free to fork the repo, create a new branch, and submit a pull request!
