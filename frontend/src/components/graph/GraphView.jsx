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

const GraphView = ({ data = { nodes: [], links: [] } }) => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const selectionsRef = useRef({ nodes: null, links: null, labels: null });
  const [transform, setTransform] = useState({ k: 1, x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState(null);

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
    setSelectedNode(node);
  }, []);

  const handleClosePanel = useCallback(() => {
    setSelectedNode(null);
  }, []);

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
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <svg
        ref={svgRef}
        width={DIMENSIONS.width}
        height={DIMENSIONS.height}
        data-testid="graph-container"
        style={{
          background: COLORS.background,
          border: '2px solid white',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)',
        }}
      />
      <ContentPanel nodeId={selectedNode?.id} onClose={handleClosePanel} />
    </div>
  );
};

export default GraphView;
