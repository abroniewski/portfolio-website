import * as d3 from 'd3';
import { useCallback } from 'react';

const useHighlightBehavior = (nodes, links, labels, zoomValues) => {
  // Helper function to find connected links for a node
  const findConnectedLinks = useCallback(
    nodeId => {
      if (!links) return d3.select();
      return d3.selectAll('.link').filter(function () {
        const linkData = d3.select(this).data()[0];
        return linkData.source.id === nodeId || linkData.target.id === nodeId;
      });
    },
    [links]
  );

  // Helper function to find connected nodes
  const findConnectedNodes = useCallback(
    nodeId => {
      if (!nodes || !links) return d3.select();
      return d3.selectAll('.node').filter(function () {
        const nodeData = d3.select(this).data()[0];
        const isConnected = d3
          .selectAll('.link')
          .data()
          .some(
            link =>
              (link.source.id === nodeId && link.target.id === nodeData.id) ||
              (link.target.id === nodeId && link.source.id === nodeData.id)
          );
        return isConnected || nodeData.id === nodeId;
      });
    },
    [nodes, links]
  );

  const handleNodeMouseOver = useCallback(
    function (event, d) {
      if (!nodes || !links || !labels) return;

      // Reset all nodes and links first
      d3.selectAll('.node').style('fill', '#2a4542').style('opacity', 0.4);
      d3.selectAll('.link').style('stroke', '#999').style('opacity', 0.2);

      // Find connected elements
      const connectedLinks = findConnectedLinks(d.id);
      const connectedNodes = findConnectedNodes(d.id);

      // Highlight connected nodes
      connectedNodes.style('fill', '#69b3a2').style('opacity', 1);

      // Highlight connected links
      connectedLinks.style('stroke', '#ff7f50').style('stroke-width', 2).style('opacity', 1);

      // Highlight hovered node
      d3.select(this)
        .style('fill', '#ff7f50')
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
    [nodes, links, labels, zoomValues, findConnectedLinks, findConnectedNodes]
  );

  const handleNodeMouseOut = useCallback(
    function () {
      // Reset all nodes
      d3.selectAll('.node')
        .style('fill', '#69b3a2')
        .style('opacity', 1)
        .attr('r', zoomValues.nodeRadius);

      // Reset all links
      d3.selectAll('.link').style('stroke', '#999').style('stroke-width', 1).style('opacity', 1);

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
