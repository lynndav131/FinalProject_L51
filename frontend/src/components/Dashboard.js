import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import api from '../utils/api';

function Dashboard() {
  const [chart1, setChart1] = useState(null);
  const [chart2, setChart2] = useState(null);
  const lineRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    (async () => {
      const [c1, c2] = await Promise.all([
        api.get('/charts/chart1'),
        api.get('/charts/chart2')
      ]);
      setChart1(c1.data);
      setChart2(c2.data);
    })();
  }, []);

  useEffect(() => {
    if (!chart1 || !lineRef.current) return;

    const el = lineRef.current;
    el.innerHTML = '';
    const width = el.clientWidth || 600;
    const height = 300;
    const svg = d3.select(el).append('svg').attr('width', width).attr('height', height);

    const labels = chart1.labels;
    const values = chart1.values;

    const x = d3.scalePoint().domain(labels).range([40, width - 20]);
    const y = d3.scaleLinear().domain([0, d3.max(values) || 1]).nice().range([height - 40, 20]);

    const line = d3.line()
      .x((_, i) => x(labels[i]))
      .y((d) => y(d))
      .curve(d3.curveMonotoneX);

    svg.append('path')
      .datum(values)
      .attr('fill', 'none')
      .attr('stroke', '#60a5fa')
      .attr('stroke-width', 2.5)
      .attr('d', line);

    svg.selectAll('circle')
      .data(values)
      .enter()
      .append('circle')
      .attr('cx', (_, i) => x(labels[i]))
      .attr('cy', (d) => y(d))
      .attr('r', 4)
      .attr('fill', '#60a5fa');

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y).ticks(5);

    svg.append('g').attr('transform', `translate(0,${height - 40})`).call(xAxis);
    svg.append('g').attr('transform', `translate(40,0)`).call(yAxis);

    svg.append('text')
      .attr('x', 20)
      .attr('y', 18)
      .attr('fill', '#e2e8f0')
      .attr('font-size', 14)
      .text(chart1.title || 'Line Chart');
  }, [chart1]);

  useEffect(() => {
    if (!chart2 || !barRef.current) return;

    const el = barRef.current;
    el.innerHTML = '';
    const width = el.clientWidth || 600;
    const height = 300;
    const svg = d3.select(el).append('svg').attr('width', width).attr('height', height);

    const categories = chart2.categories;
    const counts = chart2.counts;

    const x = d3.scaleBand().domain(categories).range([40, width - 20]).padding(0.2);
    const y = d3.scaleLinear().domain([0, d3.max(counts) || 1]).nice().range([height - 40, 20]);

    svg.selectAll('rect')
      .data(counts)
      .enter()
      .append('rect')
      .attr('x', (_, i) => x(categories[i]))
      .attr('y', (d) => y(d))
      .attr('width', x.bandwidth())
      .attr('height', (d) => (height - 40) - y(d))
      .attr('fill', '#60a5fa');

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y).ticks(5);

    svg.append('g').attr('transform', `translate(0,${height - 40})`).call(xAxis)
      .selectAll('text').attr('fill', '#e2e8f0');
    svg.append('g').attr('transform', `translate(40,0)`).call(yAxis)
      .selectAll('text').attr('fill', '#e2e8f0');

    svg.append('text')
      .attr('x', 20)
      .attr('y', 18)
      .attr('fill', '#e2e8f0')
      .attr('font-size', 14)
      .text(chart2.title || 'Bar Chart');
  }, [chart2]);

  return (
    <div className="container">
      <div className="card">
        <h2>Generative AI Innovations</h2>
        <p>
          Generative AI has rapidly evolved into a transformative force across industries, reshaping workflows, creativity, and communication. 
          According to SystemSize, the next wave of innovation in 2025 will be defined by ten key trends, including hyper-personalization, multimodal creativity, 
          and ethical breakthroughs. Tools like ChatGPT, DALL·E, and MidJourney have already demonstrated how AI can generate realistic text, images, and multimedia content, 
          but the coming year will push boundaries further. Businesses are expected to leverage generative AI for tailored customer experiences, automated design, 
          and advanced data storytelling. At the same time, challenges around bias, transparency, and responsible deployment remain central to ensuring sustainable adoption. 
          The article emphasizes that generative AI is not just about efficiency—it is about enabling new forms of creativity and democratizing innovation. 
          By 2025, organizations that embrace these trends will gain a competitive edge, while society at large will grapple with balancing innovation and ethics. 
          This dashboard highlights the most impactful developments, supported by data visualizations that illustrate adoption rates and personalization growth.
          <br />
          <strong>Source:</strong> 
          <a href="https://systemsize.com/blog/the-next-wave-of-generative-ai-10-trends-that-will-define-2025/" target="_blank" rel="noopener noreferrer">
            The Next Wave of Generative AI: 10 Trends That Will Define 2025
          </a>
        </p>
      </div>

      <div className="card">
        <h2>Technical Aspects of the Project</h2>
        <p>
          This application is designed as a Single Page Application (SPA) with a fully decoupled frontend and backend. 
          The frontend is built in React, served through NGINX on port 80, and styled with accessibility principles to meet ADA/WCAG guidelines. 
          The backend runs on Express.js with JWT authentication, ensuring secure login and session management. Depending on student ID rules, 
          the database layer uses either MySQL or MongoDB, with queries exposed through RESTful endpoints. Backend processes are managed with PM2, 
          providing resilience and automatic restarts. Both frontend and backend are hosted on a Vultr cloud server, with firewall rules configured for secure external access. 
          Data visualizations are rendered dynamically using D3.js, with chart data retrieved asynchronously from backend endpoints via HTTP calls. 
          The project is version‑controlled in a single GitHub repository, with .gitignore used to exclude sensitive files and dependencies, 
          ensuring a clean and reproducible deployment workflow. Together, this stack demonstrates a professional‑grade deployment pipeline that integrates 
          modern web technologies, secure authentication, and interactive data storytelling.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
