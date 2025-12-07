import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import api from '../utils/api';

function Reports() {
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);

  // Fetch chart data from backend
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/charts/reports-data');
        setChartData(res.data.data);
      } catch (err) {
        console.error('Error fetching reports chart data', err);
      }
    })();
  }, []);

  // Render chart with D3
  useEffect(() => {
    if (!chartData || !chartRef.current) return;

    const el = chartRef.current;
    el.innerHTML = '';
    const width = el.clientWidth || 600;
    const height = 300;
    const svg = d3.select(el).append('svg').attr('width', width).attr('height', height);

    const labels = chartData.map(d => d.label);
    const values = chartData.map(d => d.value);

    const x = d3.scaleBand().domain(labels).range([40, width - 20]).padding(0.2);
    const y = d3.scaleLinear().domain([0, d3.max(values) || 1]).nice().range([height - 40, 20]);

    svg.selectAll('rect')
      .data(chartData)
      .enter()
      .append('rect')
      .attr('x', d => x(d.label))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => (height - 40) - y(d.value))
      .attr('fill', '#60a5fa');

    svg.append('g')
      .attr('transform', `translate(0,${height - 40})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('fill', '#e2e8f0');

    svg.append('g')
      .attr('transform', `translate(40,0)`)
      .call(d3.axisLeft(y).ticks(5))
      .selectAll('text')
      .attr('fill', '#e2e8f0');

    svg.append('text')
      .attr('x', 20)
      .attr('y', 18)
      .attr('fill', '#e2e8f0')
      .attr('font-size', 14)
      .text('Generative AI Leaders');
  }, [chartData]);

  return (
    <div className="container">
      <div className="card">
        <h2>Reports — Generative AI Landscape</h2>
        <p>
          This chart highlights leading organizations in the generative AI space, based on innovation and adoption.
        </p>
      </div>

      <div className="card">
        <h3>Leading Organizations (Bar Chart)</h3>
        <div ref={chartRef} style={{ width: '100%' }} aria-label="Reports chart"></div>
      </div>
    </div>
  );
}

export default Reports;
