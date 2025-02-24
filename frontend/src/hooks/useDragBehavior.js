import * as d3 from 'd3';
import { useCallback } from 'react';

const useDragBehavior = simulationRef => {
  return useCallback(
    (handleClick = null) => {
      const dragstarted = (event, d) => {
        if (!event.active) simulationRef.current.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      };

      const dragged = (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      };

      const dragended = (event, d) => {
        if (!event.active) simulationRef.current.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      };

      const drag = d3
        .drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);

      // Add the click handler to the returned drag behavior
      drag.handleClick = handleClick;

      return drag;
    },
    [simulationRef]
  );
};

export default useDragBehavior;
