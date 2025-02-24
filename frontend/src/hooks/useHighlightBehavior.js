import * as d3 from 'd3';
import { useCallback } from 'react';

import { COLORS } from '../constants/graph';
import { findConnectedLinks, findConnectedNodes } from '../utils';

const useHighlightBehavior = (nodes, links, labels, zoomValues) => {
  const handleNodeMouseOver = useCallback(
    function (event, d) {
      if (!nodes || !links || !labels) return;

      // Reset all nodes and links first
      d3.selectAll('.node').style('fill', COLORS.node.dimmed).style('opacity', 0.4);
      d3.selectAll('.link').style('stroke', COLORS.link.default).style('opacity', 0.2);

      // Find connected elements
      const connectedLinks = findConnectedLinks(d.id);
      const connectedNodes = findConnectedNodes(d.id);

      // Highlight connected nodes
      connectedNodes.style('fill', COLORS.node.default).style('opacity', 1);

      // Highlight connected links
      connectedLinks
        .style('stroke', COLORS.link.highlight)
        .style('stroke-width', 2)
        .style('opacity', 1);

      // Highlight hovered node
      d3.select(this)
        .style('fill', COLORS.node.highlight)
        .attr('r', zoomValues.nodeRadius * 1.5)
        .style('opacity', 1);

      // Move label
      d3.select(this.parentNode)
        .select('text')
        .attr('dy', zoomValues.nodeRadius * 3 + 1);

      // Bring connected labels to front
      d3.selectAll('.node-label')
        .filter(function () {
          const nodeData = d3.select(this.parentNode).select('.node').data()[0];
          return connectedNodes.nodes().includes(nodeData.parentNode) || nodeData.id === d.id;
        })
        .raise();
    },
    [nodes, links, labels, zoomValues]
  );

  const handleNodeMouseOut = useCallback(
    function () {
      // Reset all nodes
      d3.selectAll('.node')
        .style('fill', COLORS.node.default)
        .style('opacity', 1)
        .attr('r', zoomValues.nodeRadius);

      // Reset all links
      d3.selectAll('.link')
        .style('stroke', COLORS.link.default)
        .style('stroke-width', 1)
        .style('opacity', 1);

      // Reset label position
      d3.select(this.parentNode)
        .select('text')
        .attr('dy', zoomValues.nodeRadius + 10);
    },
    [zoomValues]
  );

  return { handleNodeMouseOver, handleNodeMouseOut };
};

export default useHighlightBehavior;
