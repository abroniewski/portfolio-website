import { useCallback } from 'react';

const useGraphLayout = (width, height, transform, zoomValues) => {
  const createLinks = useCallback(
    (container, data) => {
      return container
        .selectAll('.link')
        .data(data.links)
        .enter()
        .append('line')
        .attr('class', 'link')
        .attr('data-testid', 'graph-link')
        .style('stroke', '#999')
        .style('stroke-width', transform.k * 0.5);
    },
    [transform.k]
  );

  const createNodes = useCallback(
    (container, data, initDrag) => {
      const nodeGroups = container
        .selectAll('.node-group')
        .data(data.nodes)
        .enter()
        .append('g')
        .attr('class', 'node-group')
        .call(initDrag());

      const nodes = nodeGroups
        .append('circle')
        .attr('class', 'node')
        .attr('data-testid', 'graph-node')
        .attr('r', zoomValues.nodeRadius)
        .style('fill', '#69b3a2');

      const labels = nodeGroups
        .append('text')
        .attr('class', 'node-label')
        .attr('data-testid', 'node-label')
        .attr('dy', zoomValues.nodeRadius + 10)
        .style('text-anchor', 'middle')
        .style('font-size', `${Math.max(8, 12 * transform.k)}px`)
        .style('fill', '#f5f5f5')
        .style('pointer-events', 'none')
        .text(d => d.title);

      return { nodeGroups, nodes, labels };
    },
    [transform.k, zoomValues.nodeRadius]
  );

  const createContainer = useCallback(svg => {
    const g = svg.append('g').attr('class', 'zoom-group');

    return {
      root: g,
      linksGroup: g.append('g').attr('class', 'links-group'),
      nodesGroup: g.append('g').attr('class', 'nodes-group'),
    };
  }, []);

  const updatePositions = useCallback(
    (nodeGroups, links, data) => {
      const padding = 50;

      // Update node positions with bounds
      data.nodes.forEach(node => {
        node.x = Math.max(padding, Math.min(width - padding, node.x));
        node.y = Math.max(padding, Math.min(height - padding, node.y));
      });

      // Update link positions
      links
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      // Update node positions
      nodeGroups.attr('transform', d => `translate(${d.x},${d.y})`);
    },
    [width, height]
  );

  return {
    createLinks,
    createNodes,
    createContainer,
    updatePositions,
  };
};

export default useGraphLayout;
