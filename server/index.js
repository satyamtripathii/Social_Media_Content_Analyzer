
require('dotenv/config');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const sharp = require('sharp');
const Tesseract = require('tesseract.js');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: true }));
app.use(express.json({ limit: '25mb' }));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, status: 'healthy' });
});

function analyzeText(text) {
  const wc = (text.match(/\b[\p{L}\p{N}_'-]+\b/gu) || []).length;
  const hasQuestion = /\?/u.test(text);
  const hashtags = text.match(/#\w+/g) || [];
  const mentions = text.match(/@\w+/g) || [];
  const urls = text.match(/\bhttps?:\/\/\S+/gi) || [];
  const ctas = /(like|share|follow|check|click|subscribe|comment|save)\b/i.test(text);
  const emoji = /[\p{Emoji}]/u.test(text);

  const suggestions = [];
  if (wc < 40) suggestions.push('Post is quite short—consider adding context or details.');
  if (wc > 220) suggestions.push('Post is long—trim or add line breaks for readability.');
  if (!hasQuestion) suggestions.push('Ask a question to spark replies.');
  if (hashtags.length < 2) suggestions.push('Add 2–5 relevant hashtags for discovery.');
  if (urls.length === 0 && !ctas) suggestions.push('Add a clear call-to-action or helpful link.');
  if (!emoji) suggestions.push('A tasteful emoji can increase scannability.');
  if (mentions.length === 0) suggestions.push('Consider tagging relevant accounts to expand reach.');

  return {
    wordCount: wc,
    hashtags: hashtags.length,
    mentions: mentions.length,
    urls: urls.length,
    suggestions
  };
}

// Small helper: count letters+digits to compare OCR passes
const alphaNumScore = (s) => ((s || '').match(/[A-Za-z0-9]/g) || []).length;

app.post('/api/extract', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ ok: false, error: 'No file uploaded' });
    const { originalname, mimetype, buffer } = req.file;

    let text = '';

    if (mimetype === 'application/pdf') {
      const result = await pdfParse(buffer);
      text = (result.text || '').trim();
    } else if (mimetype.startsWith('image/')) {
      const base = sharp(buffer).rotate();
      const meta = await base.metadata();

      let working = base;
      if (meta.height && meta.width && meta.height > 600) {
        const topCut = Math.round(meta.height * 0.12);
        const bottomCut = Math.round(meta.height * 0.18);
        const height = Math.max(50, meta.height - topCut - bottomCut);
        working = base.extract({ left: 0, top: topCut, width: meta.width, height });
      }

      const originalPng = await working.toFormat('png').toBuffer();

      const preppedPng = await sharp(originalPng)
        .grayscale()
        .normalize()
        .threshold(170)
        .toBuffer();

      const ocrOpts = {
        tessedit_pageseg_mode: 6,
        preserve_interword_spaces: '1'
      };

      const [p1, p2] = await Promise.all([
        Tesseract.recognize(preppedPng, 'eng', ocrOpts),
        Tesseract.recognize(originalPng, 'eng', ocrOpts),
      ]);

      const t1 = (p1.data && p1.data.text || '').trim();
      const t2 = (p2.data && p2.data.text || '').trim();

      text = alphaNumScore(t1) >= alphaNumScore(t2) ? t1 : t2;

      text = text
        .replace(/\b(Like|Comment|Share|News Feed|Yesterday at .*|(?<=\b)\d+\s*comments?\b|\d+\s*likes?)\b/gi, '')
        .replace(/[ \t]+\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
    } else {
      return res.status(415).json({ ok: false, error: `Unsupported type: ${mimetype}` });
    }

    const analysis = analyzeText(text);
    res.json({ ok: true, file: { name: originalname, type: mimetype }, text, analysis });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Extraction failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
