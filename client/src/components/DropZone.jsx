import React, { useRef, useState } from 'react';

export default function DropZone({ onFile, loading }) {
  const inputRef = useRef(null);
  const [hover, setHover] = useState(false);

  const handleFiles = (files) => {
    const f = files?.[0];
    if (!f) return;
    const ok = f.type === 'application/pdf' || f.type.startsWith('image/');
    if (!ok) {
      alert('Please upload a PDF or image file.');
      return;
    }
    onFile(f);
  };

  return (
    <div
      className={`dropzone ${hover ? 'hover' : ''} ${loading ? 'disabled' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setHover(true); }}
      onDragLeave={() => setHover(false)}
      onDrop={(e) => { e.preventDefault(); setHover(false); handleFiles(e.dataTransfer.files); }}
      onClick={() => !loading && inputRef.current?.click()}
      role="button"
      tabIndex={0}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,image/*"
        style={{ display: 'none' }}
        onChange={(e) => handleFiles(e.target.files)}
      />
      <div>
        <strong>Drag & drop</strong> a PDF or image here, or <span className="link">browse</span>.
      </div>
      <small>Max 20MB • PDF / PNG / JPG</small>
    </div>
  );
}
