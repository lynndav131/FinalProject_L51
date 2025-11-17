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
        <h2>L51 Dashboard — Generative AI Innovations</h2>
        <p>
          Choose a recent Generative AI innovation article from the list and add your summary on the Summary page. Then use the Reports page to discuss implications supported by charts.
        </p>
      </div>

      <div className="card">
        <h3>Monthly trend (Line chart)</h3>
        <div ref={lineRef} style={{ width: '100%' }} aria-label="Line chart"></div>
      </div>

      <div className="card">
        <h3>Impacted domains (Bar chart)</h3>
        <div ref={barRef} style={{ width: '100%' }} aria-label="Bar chart"></div>
      </div>
    </div>
  );
}

export default Dashboard;
