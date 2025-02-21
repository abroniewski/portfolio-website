import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const GraphView = ({ data = { nodes: [], links: [] }, width = 800, height = 600 }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data || !svgRef.current) return;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll('*').remove();

    // Create force simulation
    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links).id(d => d.id))
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Create SVG elements
    const svg = d3.select(svgRef.current);

    // Add links
    const links = svg
      .selectAll('.link')
      .data(data.links)
      .join('line')
      .attr('class', 'link')
      .attr('data-testid', 'graph-link')
      .style('stroke', '#999')
      .style('stroke-width', 1);

    // Add nodes
    const nodes = svg
      .selectAll('.node')
      .data(data.nodes)
      .join('circle')
      .attr('class', 'node')
      .attr('data-testid', 'graph-node')
      .attr('r', 10)
      .style('fill', '#69b3a2');

    // Update positions on simulation tick
    simulation.on('tick', () => {
      links
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      nodes
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    });

    // Cleanup
    return () => simulation.stop();
  }, [data]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      data-testid="graph-container"
    />
  );
};

export default GraphView; 