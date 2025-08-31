import React, { useState } from 'react';
import DropZone from './components/DropZone.jsx';
import Result from './components/Result.jsx';

export default function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState(null);
  const [error, setError] = useState('');

  const onSelect = async (f) => {
    setError('');
    setResp(null);
    setFile(f);
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('file', f);
      const r = await fetch('/api/extract', { method: 'POST', body: fd });
      const data = await r.json();
      if (!data.ok) throw new Error(data.error || 'Failed');
      setResp(data);
    } catch (e) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Social Media Content Analyzer</h1>
        <p>Upload a PDF or image. We’ll extract the text and suggest engagement improvements.</p>
      </header>

      <DropZone onFile={onSelect} loading={loading} />

      {error && <div className="error">{error}</div>}

      {loading && <div className="loading">Extracting…</div>}

      {resp && <Result response={resp} />}
      <footer>
        <span>Built By Satyam Tripathi</span>
      </footer>
    </div>
  );
}
