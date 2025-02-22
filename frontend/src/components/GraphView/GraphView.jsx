import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const GraphView = ({ data = { nodes: [], links: [] }, width = 800, height = 600 }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data || !svgRef.current) return;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll('*').remove();

    // Create drag behavior
    const drag = d3.drag()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d) => {
        // Immediately release the fixed position and heat up the simulation
        if (!event.active) simulation.alphaTarget(0.3);
        d.fx = null;
        d.fy = null;
        // Cool down the simulation after a short burst of activity
        setTimeout(() => simulation.alphaTarget(0), 300);
      });

    // Create force simulation
    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links)
        .id(d => d.id)
        .distance(50)
        .strength(0.7)
      )
      .force('charge', d3.forceManyBody()
        .strength(d => -100)
        .distanceMin(10)
        .distanceMax(200)
      )
      .force('center', d3.forceCenter(width / 2, height / 2)
        .strength(0.05)
      )
      // Prevent node overlaps with larger radius to account for labels
      .force('collision', d3.forceCollide()
        .radius(d => {
          // Get the length of the title to calculate text width
          const textLength = d.title.length;
          // Approximate width of text (assuming 6px per character)
          const textWidth = textLength * 6;
          // Use the larger of either text width or node diameter
          return Math.max(textWidth / 2, 40);
        })
        .strength(1) // Maximum strength to ensure separation
        .iterations(2) // Multiple iterations for better accuracy
      )
      // Add vertical separation force to prevent label overlap
      .force('y', d3.forceY()
        .strength(0.1) // Weak force to allow some vertical movement
        .y(d => {
          // Try to maintain vertical spacing between nodes
          return height / 2 + (Math.random() - 0.5) * 100;
        })
      )
      .velocityDecay(0.6);

    // Create SVG elements
    const svg = d3.select(svgRef.current);

    // Create separate groups for links and nodes to control rendering order
    const linksGroup = svg.append('g').attr('class', 'links-group');
    const nodesGroup = svg.append('g').attr('class', 'nodes-group');

    // Create a group for each node that will contain both circle and text
    const nodeGroups = nodesGroup
      .selectAll('.node-group')
      .data(data.nodes)
      .enter()
      .append('g')
      .attr('class', 'node-group')
      .call(process.env.NODE_ENV === 'test' ? 
        d3.drag() : 
        drag);

    // Add links
    const links = linksGroup
      .selectAll('.link')
      .data(data.links)
      .enter()
      .append('line')
      .attr('class', 'link')
      .attr('data-testid', 'graph-link')
      .style('stroke', '#999')
      .style('stroke-width', 1);

    // Helper function to find connected links for a node
    const findConnectedLinks = (nodeId) => {
      return d3.selectAll('.link').filter(function(d) {
        return d.source.id === nodeId || d.target.id === nodeId;
      });
    };

    // Helper function to find connected nodes
    const findConnectedNodes = (nodeId) => {
      return d3.selectAll('.node').filter(function(d) {
        // Find all nodes that are connected via links
        const isConnected = data.links.some(link => 
          (link.source.id === nodeId && link.target.id === d.id) ||
          (link.target.id === nodeId && link.source.id === d.id)
        );
        // Include the hovered node itself
        return isConnected || d.id === nodeId;
      });
    };

    // Add circles to node groups
    const nodes = nodeGroups
      .append('circle')
      .attr('class', 'node')
      .attr('data-testid', 'graph-node')
      .attr('r', 10)
      .style('fill', '#69b3a2')
      .on('mouseover', function(event, d) {
        // Skip transitions in test environment
        const element = d3.select(this);
        const connectedLinks = findConnectedLinks(d.id);
        const connectedNodes = findConnectedNodes(d.id);
        
        // Darken non-connected nodes
        nodes.transition()
          .duration(400)
          .style('fill', '#2a4542'); // Darker version of the original color
        links.transition()
          .duration(400)
          .style('opacity', 0.2);
        
        // Keep connected nodes in original color
        connectedNodes.transition()
          .duration(400)
          .style('fill', '#69b3a2');
        connectedLinks.transition()
          .duration(400)
          .style('opacity', 1);
        
        if (process.env.NODE_ENV === 'test') {
          element
            .style('fill', '#ff7f50')
            .attr('r', 15);
          connectedLinks.style('stroke', '#ff7f50')
            .style('stroke-width', 2);
        } else {
          element
            .transition()
            .duration(200)
            .style('fill', '#ff7f50')
            .attr('r', 15);
          connectedLinks
            .transition()
            .duration(200)
            .style('stroke', '#ff7f50')
            .style('stroke-width', 2);
        }
      })
      .on('mouseout', function(event, d) {
        // Skip transitions in test environment
        const element = d3.select(this);
        const connectedLinks = findConnectedLinks(d.id);
        
        // Restore original color for all nodes
        nodes.transition()
          .duration(400)
          .style('fill', '#69b3a2');
        links.transition()
          .duration(400)
          .style('opacity', 1);
        
        if (process.env.NODE_ENV === 'test') {
          element
            .style('fill', '#69b3a2')
            .attr('r', 10);
          connectedLinks.style('stroke', '#999')
            .style('stroke-width', 1);
        } else {
          element
            .transition()
            .duration(200)
            .style('fill', '#69b3a2')
            .attr('r', 10);
          connectedLinks
            .transition()
            .duration(200)
            .style('stroke', '#999')
            .style('stroke-width', 1);
        }
      });

    // Add labels to node groups
    const labels = nodeGroups
      .append('text')
      .attr('class', 'node-label')
      .attr('data-testid', 'node-label')
      .attr('dy', 25)
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('font-family', 'Arial')
      .style('fill', '#f5f5f5')
      .text(d => d.title)
      .style('pointer-events', 'none');

    // Update positions on simulation tick
    simulation.on('tick', () => {
      links
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      nodeGroups
        .attr('transform', d => `translate(${d.x},${d.y})`);
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
