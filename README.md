# Social Media Content Analyzer (React + Node)

Analyze PDFs/images, extract text (PDF parsing + OCR), and get quick engagement tips.

## Stack
- Client: React + Vite
- Server: Node.js (Express), pdf-parse, tesseract.js, sharp, multer

## Features
- Drag & drop or browse to upload
- PDF text extraction
- OCR for images (Tesseract.js)
- Loading states & error handling
- Copy/download extracted text
- Simple analyzer: word count, hashtags, links, and suggestions

## Local Dev
- `cd server && npm i && npm run dev`
- `cd client && npm i && npm run dev`
- Open `http://localhost:5173`

## Deploy
- Server: Render/Railway (`npm start`)
- Client: Vercel/Netlify (`vite build` → `dist/`)
- Add rewrites so `/api/*` points to the server.

## Notes
- Tesseract will download `eng` traineddata on first run.
- For scanned PDFs, current flow uses PDF parsing; OCR-on-PDF pages can be added later if needed.
