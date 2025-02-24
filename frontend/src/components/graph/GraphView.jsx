import * as d3 from 'd3';
import { useEffect, useRef, useState, useCallback } from 'react';

import { DIMENSIONS, ZOOM_THRESHOLDS, COLORS } from '../../constants/graph';
import useDragBehavior from '../../hooks/useDragBehavior';
import useForceSimulation from '../../hooks/useForceSimulation';
import useGraphLayout from '../../hooks/useGraphLayout';
import useHighlightBehavior from '../../hooks/useHighlightBehavior';
import useZoomBehavior from '../../hooks/useZoomBehavior';
import useZoomDependentValues from '../../hooks/useZoomDependentValues';
import ContentPanel from '../content/ContentPanel';
import { useNodeContext } from '../../contexts/NodeContext';

const GraphView = ({ data = { nodes: [], links: [] } }) => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const selectionsRef = useRef({ nodes: null, links: null, labels: null });
  const [transform, setTransform] = useState({ k: 1, x: 0, y: 0 });
  const { handleNodeSelect, selectedNode } = useNodeContext();

  const zoomValues = useZoomDependentValues(transform.k);

  const simulationRef = useForceSimulation(data, DIMENSIONS.width, DIMENSIONS.height, zoomValues);
  const dragBehavior = useDragBehavior(simulationRef);
  const { createLinks, createNodes, createContainer, updatePositions } = useGraphLayout(
    DIMENSIONS.width,
    DIMENSIONS.height,
    transform,
    zoomValues
  );

  // Initialize D3 selections
  useEffect(() => {
    if (!svgRef.current) return;
    selectionsRef.current = {
      nodes: d3.selectAll('.node'),
      links: d3.selectAll('.link'),
      labels: d3.selectAll('.node-label'),
    };
  }, [simulationRef]);

  const { handleNodeMouseOver, handleNodeMouseOut } = useHighlightBehavior(
    selectionsRef.current?.nodes,
    selectionsRef.current?.links,
    selectionsRef.current?.labels,
    zoomValues
  );

  const handleZoomChange = useCallback(newTransform => {
    setTransform(newTransform);
  }, []);

  const initZoom = useZoomBehavior(ZOOM_THRESHOLDS, handleZoomChange);

  const handleNodeClick = useCallback(node => {
    handleNodeSelect(node);
  }, [handleNodeSelect]);

  // Main effect for creating and updating the graph
  useEffect(() => {
    if (!data || !svgRef.current || !simulationRef.current) return;

    const simulation = simulationRef.current;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll('*').remove();

    // Create SVG elements and initialize zoom
    const svg = d3.select(svgRef.current);
    initZoom(svgRef.current);

    // Create container structure
    const { linksGroup, nodesGroup } = createContainer(svg);

    // Create links and nodes
    const links = createLinks(linksGroup, data);
    const { nodeGroups, nodes, labels } = createNodes(
      nodesGroup,
      data,
      dragBehavior(),
      handleNodeClick
    );

    // Update selections ref
    selectionsRef.current = { nodes, links, labels };

    // Add mouse event handlers
    nodes.on('mouseover', handleNodeMouseOver).on('mouseout', handleNodeMouseOut);

    // Update positions on tick
    simulation.on('tick', () => {
      updatePositions(nodeGroups, links, data);
    });

    return () => {
      simulation.stop();
    };
  }, [
    data,
    dragBehavior,
    createContainer,
    createLinks,
    createNodes,
    updatePositions,
    handleNodeMouseOver,
    handleNodeMouseOut,
    initZoom,
    simulationRef,
    handleNodeClick,
  ]);

  return (
    <div 
      className="graph-container" 
      style={{ 
        width: selectedNode ? '90%' : '95%',
        maxWidth: selectedNode ? '1400px' : '100%',
        height: selectedNode ? '50vh' : '85vh',
        border: '2px solid #ff69b4',
        borderRadius: '8px',
        backgroundColor: COLORS.background,
        overflow: 'hidden',
        display: 'flex',
        transition: 'all 0.3s ease-out',
        margin: '0 auto',
      }}
    >
      <div
        ref={containerRef}
        style={{
          flex: 1,
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: selectedNode ? '0' : '0 2rem',
        }}
      >
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          data-testid="graph-container"
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
          }}
        />
      </div>
    </div>
  );
};

export default GraphView;
