import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function Reports() {
  const [dbRows, setDbRows] = useState([]);
const url = localStorage.getItem('genAI_article_url') || '';
const summary = localStorage.getItem('genAI_article_summary') || '';

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
        <p><strong>Article URL:</strong> {url || 'No URL saved yet.'}</p>
        <p><strong>Summary:</strong> {summary || 'No summary saved yet.'}</p>
      </div>
      <div className="card">
        <h3>Generative AI Landscape</h3>
        {dbRows.length === 0 ? (
          <p>No data yet. Wire /charts/reports-data to your backend.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dbRows}>
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )}
        <p>
          This chart shows the distribution of major players in Generative AI based on recent innovations.
          Source: Your selected article.
        </p>
      </div>
    </div>
  );
}

export default Reports;
