import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

import { COLORS } from '../../constants/graph';

const MiniGraph = ({ nodes, links, currentNodeId, onNodeClick }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current || !nodes || !links) return;

    const width = 300;
    const height = 200;

    // Clear existing content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current).attr('width', width).attr('height', height);

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3.forceLink(links).id(d => d.id)
      )
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', COLORS.link.default)
      .attr('stroke-opacity', 0.6);

    const node = svg
      .append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 8)
      .attr('fill', d => (d.id === currentNodeId ? COLORS.node.highlight : COLORS.node.default))
      .attr('data-testid', d => `mini-graph-node-${d.id}`)
      .on('click', (event, d) => onNodeClick(d.id));

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node.attr('cx', d => d.x).attr('cy', d => d.y);
    });

    return () => simulation.stop();
  }, [nodes, links, currentNodeId, onNodeClick]);

  return <svg ref={svgRef} className="mini-graph" />;
};

export default MiniGraph;
