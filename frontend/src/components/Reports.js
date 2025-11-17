import React, { useEffect, useState } from 'react';
import api from '../utils/api';

function Reports() {
  const [dbRows, setDbRows] = useState([]);
  const url = localStorage.getItem('genai_article_url') || '';
  const summary = localStorage.getItem('genai_article_summary') || '';

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/charts/db-example');
        setDbRows(res.data.rows || []);
      } catch {
        setDbRows([]);
      }
    })();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h2>Reports — Insights & Impact</h2>
        <p><strong>Article URL:</strong> {url || 'No URL saved yet'}</p>
        <p><strong>Summary:</strong> {summary || 'No summary saved yet'}</p>
      </div>
      <div className="card">
        <h3>DB-backed data (placeholder)</h3>
        {dbRows.length === 0 ? (
          <p>No DB rows. Wire /charts/db-example to your schema.</p>
        ) : (
          <ul>
            {dbRows.map((r, i) => (
              <li key={i}>{JSON.stringify(r)}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Reports;
