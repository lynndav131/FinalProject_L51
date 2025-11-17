import React, { useState } from 'react';

function Summary() {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');

  const handleSave = () => {
    localStorage.setItem('genai_article_url', url);
    localStorage.setItem('genai_article_summary', summary);
    alert('Saved locally (demo). You can wire this to your DB later.');
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Summary — Recent Innovations in Generative AI</h2>
        <input
          aria-label="article-url"
          placeholder="Article URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <textarea
          aria-label="article-summary"
          placeholder="Write your 200-word summary..."
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={10}
          style={{ width: '100%', padding: 10, borderRadius: 8, background: '#0b1020', color: '#e2e8f0' }}
        />
        <button onClick={handleSave}>Save summary</button>
      </div>
      <div className="card">
        <p>
          Tip: Consider trends like agentic AI adoption, enterprise scaling, and domain-specific breakthroughs. Cite your selected article.
        </p>
      </div>
    </div>
  );
}

export default Summary;
