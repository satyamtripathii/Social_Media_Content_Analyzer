import React from 'react';

export default function Result({ response }) {
  const { file, text, analysis } = response;

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(text || '');
      alert('Copied!');
    } catch {
      alert('Copy failed.');
    }
  };

  const downloadTxt = () => {
    const blob = new Blob([text || ''], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement('a'), { href: url, download: `${file?.name || 'extracted'}.txt` });
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="result">
      <div className="card meta">
        <h3>File</h3>
        <div><b>Name:</b> {file?.name}</div>
        <div><b>Type:</b> {file?.type}</div>
        <div><b>Words:</b> {analysis?.wordCount ?? 0}</div>
        <div><b>Hashtags:</b> {analysis?.hashtags ?? 0}</div>
        <div><b>Mentions:</b> {analysis?.mentions ?? 0}</div>
        <div><b>Links:</b> {analysis?.urls ?? 0}</div>
      </div>

      <div className="card text">
        <div className="toolbar">
          <h3>Extracted Text</h3>
          <div className="actions">
            <button onClick={copyText}>Copy</button>
            <button onClick={downloadTxt}>Download .txt</button>
          </div>
        </div>
        <textarea value={text} readOnly spellCheck={false} />
      </div>

      <div className="card tips">
        <h3>Engagement Suggestions</h3>
        {(analysis?.suggestions?.length ?? 0) === 0 ? (
          <div>Looks good! 🎉</div>
        ) : (
          <ul>
            {analysis.suggestions.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        )}
      </div>
    </section>
  );
}
