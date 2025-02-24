import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

// TODO: Consider refactoring force configuration to be more testable
// Current implementation is difficult to test due to D3's chaining API
// Related: force link mock issues in useForceSimulation.test.js

const useForceSimulation = (data, width, height, zoomValues) => {
  const simulationRef = useRef(null);

  useEffect(() => {
    if (!data) return;

    // Initialize simulation if it doesn't exist
    if (!simulationRef.current) {
      simulationRef.current = d3
        .forceSimulation(data.nodes)
        .force(
          'link',
          d3
            .forceLink(data.links)
            .id(d => d.id)
            .distance(zoomValues.linkDistance)
            .strength(0.5)
        )
        .force(
          'charge',
          d3
            .forceManyBody()
            .strength(zoomValues.chargeStrength)
            .distanceMin(10)
            .distanceMax(200)
            .theta(0.9)
        )
        .force('center', d3.forceCenter(width / 2, height / 2).strength(0.1))
        .force('x', d3.forceX(width / 2).strength(0.05))
        .force('y', d3.forceY(height / 2).strength(0.05))
        .force(
          'collision',
          d3.forceCollide().radius(d => {
            const labelWidth = d.title ? d.title.length * 5 : 0;
            return Math.max(labelWidth, zoomValues.collisionRadius);
          })
        )
        .velocityDecay(0.4)
        .alphaMin(0.001)
        .alphaDecay(0.02)
        .alpha(1);
    } else {
      // Update existing simulation forces
      simulationRef.current.force('link').links(data.links).distance(zoomValues.linkDistance);

      simulationRef.current.force('charge').strength(zoomValues.chargeStrength);

      simulationRef.current
        .force('center')
        .x(width / 2)
        .y(height / 2);

      simulationRef.current.force('x').x(width / 2);

      simulationRef.current.force('y').y(height / 2);

      simulationRef.current.force('collision').radius(d => {
        const labelWidth = d.title ? d.title.length * 5 : 0;
        return Math.max(labelWidth, zoomValues.collisionRadius);
      });

      // Gently reheat the simulation
      simulationRef.current.alpha(0.3).restart();
    }

    return () => {
      if (simulationRef.current) simulationRef.current.stop();
    };
  }, [data, width, height, zoomValues]);

  return simulationRef;
};

export default useForceSimulation;
