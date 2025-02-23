import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { select } from 'd3';

const ZOOM_THRESHOLDS = {
  FAR: 0.5,    // Below this: minimal view
  MID: 1.5,    // Above this: detailed view
  MAX: 4       // Maximum zoom level
};

// Add helper function to calculate zoom-dependent values
const getZoomDependentValues = (zoomLevel) => {
  return {
    nodeRadius: Math.max(5, 10 * zoomLevel),
    linkDistance: Math.max(50, 80 * zoomLevel), // Increased base distance
    chargeStrength: -30 * zoomLevel,
    collisionRadius: Math.max(40, 60 * zoomLevel), // Increased collision radius to account for labels
  };
};

const GraphView = ({ data = { nodes: [], links: [] }, width = 800, height = 600 }) => {
  const svgRef = useRef(null);
  const [transform, setTransform] = useState({ k: 1, x: 0, y: 0 });
  const simulationRef = useRef(null); // Store simulation reference

  useEffect(() => {
    if (!data || !svgRef.current) return;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll('*').remove();

    // Get initial values based on starting zoom level
    const zoomValues = getZoomDependentValues(transform.k);

    // Create drag behavior
    const drag = d3.drag()
      .on('start', (event, d) => {
        if (!event.active) simulationRef.current.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d) => {
        if (!event.active) simulationRef.current.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    // Create force simulation with modified forces
    simulationRef.current = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links)
        .id(d => d.id)
        .distance(zoomValues.linkDistance)
        .strength(1) // Stronger link force to keep connected nodes together
      )
      .force('charge', d3.forceManyBody()
        .strength(zoomValues.chargeStrength)
        .distanceMin(5) // Reduced minimum distance
        .distanceMax(100) // Reduced maximum distance
        .theta(0.5) // Lower theta for more accurate force calculations
      )
      .force('center', d3.forceCenter(width / 2, height / 2)
        .strength(0.1) // Increased centering force
      )
      .force('x', d3.forceX(width / 2).strength(0.05)) // Additional x-positioning force
      .force('y', d3.forceY(height / 2).strength(0.05)) // Additional y-positioning force
      .force('collision', d3.forceCollide()
        .radius(d => {
          const labelWidth = d.title ? d.title.length * 5 : 0; // Approximate text width
          return Math.max(labelWidth, zoomValues.collisionRadius);
        })
        .strength(1) // Maximum strength
        .iterations(4) // More iterations for better accuracy
      )
      .velocityDecay(0.6); // Increased decay to reduce excessive movement

    // Create SVG elements
    const svg = d3.select(svgRef.current);
    const g = svg.append('g')
      .attr('class', 'zoom-group');

    // Create separate groups for links and nodes
    const linksGroup = g.append('g').attr('class', 'links-group');
    const nodesGroup = g.append('g').attr('class', 'nodes-group');

    // Add links
    const links = linksGroup
      .selectAll('.link')
      .data(data.links)
      .enter()
      .append('line')
      .attr('class', 'link')
      .attr('data-testid', 'graph-link')
      .style('stroke', '#999')
      .style('stroke-width', transform.k * 0.5); // Scale stroke width with zoom

    // Add nodes with zoom-dependent sizing
    const nodeGroups = nodesGroup
      .selectAll('.node-group')
      .data(data.nodes)
      .enter()
      .append('g')
      .attr('class', 'node-group')
      .call(drag);

    const nodes = nodeGroups
      .append('circle')
      .attr('class', 'node')
      .attr('data-testid', 'graph-node')
      .attr('r', zoomValues.nodeRadius)
      .style('fill', '#69b3a2')
      .on('mouseover', function(event, d) {
        // Darken non-connected nodes
        nodes.transition()
          .duration(300)
          .style('fill', '#2a4542')
          .style('opacity', 0.4);
        
        links.transition()
          .duration(300)
          .style('stroke', '#999')
          .style('opacity', 0.2);

        // Highlight connected nodes and links
        const connectedLinks = findConnectedLinks(d.id);
        const connectedNodes = findConnectedNodes(d.id);
        
        connectedNodes.transition()
          .duration(300)
          .style('fill', '#69b3a2')
          .style('opacity', 1);

        connectedLinks.transition()
          .duration(300)
          .style('stroke', '#ff7f50')
          .style('stroke-width', 2)
          .style('opacity', 1);

        // Highlight the hovered node
        d3.select(this)
          .transition()
          .duration(300)
          .style('fill', '#ff7f50')
          .attr('r', zoomValues.nodeRadius * 1.5)
          .style('opacity', 1);

        // Move the label down for the hovered node
        d3.select(this.parentNode)
          .select('text')
          .transition()
          .duration(500)
          .attr('dy', zoomValues.nodeRadius * 3 + 1);

        // Bring connected nodes' labels to front
        labels.filter(label => 
          connectedNodes.includes(label) || label.id === d.id
        ).raise();
      })
      .on('mouseout', function(event, d) {
        // Reset all nodes and links
        nodes.transition()
          .duration(300)
          .style('fill', '#69b3a2')
          .style('opacity', 1)
          .attr('r', zoomValues.nodeRadius);
        
        links.transition()
          .duration(300)
          .style('stroke', '#999')
          .style('stroke-width', transform.k * 0.5)
          .style('opacity', 1);

        // Reset the label position
        d3.select(this.parentNode)
          .select('text')
          .transition()
          .duration(300)
          .attr('dy', zoomValues.nodeRadius + 10);
      });

    // Add labels with improved positioning
    const labels = nodeGroups
      .append('text')
      .attr('class', 'node-label')
      .attr('data-testid', 'node-label')
      .attr('dy', d => zoomValues.nodeRadius + 10)
      .style('text-anchor', 'middle')
      .style('font-size', `${Math.max(8, 12 * transform.k)}px`)
      .style('fill', '#f5f5f5')
      .style('pointer-events', 'none') // Prevent labels from intercepting mouse events
      .text(d => d.title);

    // Add zoom behavior
    const handleZoom = (event) => {
      const newTransform = event.transform;
      setTransform(newTransform);

      // Update the transform of the main group
      g.attr('transform', newTransform);

      // Get new values based on zoom level
      const newValues = getZoomDependentValues(newTransform.k);

      // Update visual elements based on zoom
      nodes.attr('r', newValues.nodeRadius);
      links.style('stroke-width', newTransform.k * 0.5);
      labels
        .style('font-size', `${Math.max(8, 12 * newTransform.k)}px`)
        .attr('dy', d => newValues.nodeRadius + 10)
        .style('opacity', () => {
          if (newTransform.k < ZOOM_THRESHOLDS.FAR) return 0;
          if (newTransform.k >= ZOOM_THRESHOLDS.MID) return 1;
          return (newTransform.k - ZOOM_THRESHOLDS.FAR) / 
                 (ZOOM_THRESHOLDS.MID - ZOOM_THRESHOLDS.FAR);
        });

      // Update simulation forces with bounded positions
      simulationRef.current
        .force('link')
        .distance(newValues.linkDistance);

      simulationRef.current
        .force('charge')
        .strength(newValues.chargeStrength)
        .distanceMin(5 * newTransform.k)
        .distanceMax(100 * newTransform.k);

      simulationRef.current
        .force('x')
        .strength(0.05 * newTransform.k); // Scale x-force with zoom

      simulationRef.current
        .force('y')
        .strength(0.05 * newTransform.k); // Scale y-force with zoom

      simulationRef.current
        .force('collision')
        .radius(newValues.collisionRadius);

      // Restart simulation with new forces
      simulationRef.current.alpha(0.3).restart();
    };

    const zoom = d3.zoom()
      .scaleExtent([ZOOM_THRESHOLDS.FAR, ZOOM_THRESHOLDS.MAX])
      .on('zoom', handleZoom);

    svg.call(zoom);

    // Helper function to find connected links for a node
    const findConnectedLinks = (nodeId) => {
      return links.filter(d => 
        d.source.id === nodeId || d.target.id === nodeId
      );
    };

    // Helper function to find connected nodes
    const findConnectedNodes = (nodeId) => {
      return nodes.filter(d => {
        const isConnected = data.links.some(link => 
          (link.source.id === nodeId && link.target.id === d.id) ||
          (link.target.id === nodeId && link.source.id === d.id)
        );
        return isConnected || d.id === nodeId;
      });
    };

    // Update the tick function to prevent label overlap
    simulationRef.current.on('tick', () => {
      const padding = 50;
      data.nodes.forEach(node => {
        node.x = Math.max(padding, Math.min(width - padding, node.x));
        node.y = Math.max(padding, Math.min(height - padding, node.y));
      });

      links
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      nodeGroups
        .attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // Cleanup
    return () => {
      if (simulationRef.current) simulationRef.current.stop();
    };
  }, [data, width, height]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      data-testid="graph-container"
      style={{
        background: '#1a1a1a', // Dark background
        border: '2px solid white', // White border
        borderRadius: '8px', // Rounded corners
        boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)' // Subtle glow
      }}
    />
  );
};

export default GraphView; 
