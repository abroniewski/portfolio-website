import * as d3 from 'd3';
import { useCallback } from 'react';

const useDragBehavior = simulation => {
  return useCallback(
    () =>
      d3
        .drag()
        .filter(event => {
          // Allow drag only on nodes, not during zoom/pan
          return !event.button && !event.ctrlKey && !event.defaultPrevented;
        })
        .on('start', (event, d) => {
          // Stop any ongoing zoom behavior
          event.sourceEvent.stopPropagation();

          if (!event.active) simulation.current.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          event.sourceEvent.stopPropagation();
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          event.sourceEvent.stopPropagation();
          if (!event.active) simulation.current.alphaTarget(0);
          // Release the node after dragging
          d.fx = null;
          d.fy = null;
        }),
    [simulation]
  );
};

export default useDragBehavior;
