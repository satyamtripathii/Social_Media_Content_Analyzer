# 📊 Social Media Content Analyzer  

> 🚀 A full-stack web application to **analyze, extract and process text content from social media posts, images, and documents** using **OCR (Tesseract.js)** and **Sharp image processing**.

---

## ✨ Features

- 📂 Upload **images/PDFs** and extract text using OCR  
- 🔍 Search & analyze extracted content  
- 🖼️ Image preprocessing with **Sharp** for higher OCR accuracy  
- ⚡ Full-stack single deployment on **Render** (React + Express together)  
- 🎨 Clean UI with **React + Vite**  

---

## 🛠️ Tech Stack

**Frontend**  
- ⚛️ React 18  
- ⚡ Vite  

**Backend**  
- 🟢 Node.js 20  
- 🌐 Express.js  
- 📤 Multer (file uploads)  
- 🖼️ Sharp (image conversion)  
- 🔠 Tesseract.js (OCR engine)  

**Deployment**  
- ☁️ Render (single Web Service deployment)  

---

## 📂 Project Structure

```
Social_Media_Content_Analyzer/
├── client/           # React + Vite frontend
│   ├── src/          # React components
│   └── package.json
├── server/           # Express backend
│   ├── index.js
│   └── package.json
├── package.json      # Root-level scripts for Render deploy
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. 📥 Clone the repo
```bash
git clone https://github.com/satyamtripathii/Social_Media_Content_Analyzer.git
cd Social_Media_Content_Analyzer
```

### 2. 🛠️ Build Client
```bash
cd client
npm install
npm run build
```

### 3. ▶️ Start Server (development)
```bash
cd ../server
npm install
PORT=8080 node index.js
```

Now visit 👉 http://localhost:8080

---

## 🚀 Deployment (Render)

This project is configured to deploy:  
🌐 **[Social Media Content Analyzer Live](https://social-media-content-analyzer-2-m31i.onrender.com/)**  

- **Build Command**:  
  ```bash
  npm run build
  ```
- **Start Command**:  
  ```bash
  npm run start
  ```
- **Environment Variable**:  
  ```bash
  NODE_VERSION=20.x
  ```

Render will:  
1. 📦 Build the React app (`client/dist`)  
2. 🖥️ Serve it with Express backend (`server/index.js`)  

---

## 🤝 Contributing

1. 🍴 Fork the repo  
2. 🌱 Create your feature branch (`git checkout -b feature/awesome-feature`)  
3. 💾 Commit your changes (`git commit -m 'Add awesome feature'`)  
4. 🚀 Push to the branch (`git push origin feature/awesome-feature`)  
5. 🔄 Create a new Pull Request  

---

## 📜 License

📝 Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 🙌 Acknowledgements

- 🔠 Tesseract.js  
- 🖼️ Sharp  
- ☁️ Render  
- ⚡ Vite  
- ⚛️ React  
