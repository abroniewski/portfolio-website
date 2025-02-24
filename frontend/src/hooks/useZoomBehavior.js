import * as d3 from 'd3';
import { useCallback } from 'react';

const useZoomBehavior = (ZOOM_THRESHOLDS, onZoom) => {
  const handleZoom = useCallback(
    event => {
      const zoomGroup = d3.select(event.sourceEvent.target.closest('svg')).select('.zoom-group');

      if (!zoomGroup.empty()) {
        const transform = event.transform;
        zoomGroup.attr(
          'transform',
          `translate(${transform.x}, ${transform.y}) scale(${transform.k})`
        );
        onZoom(transform);
      }
    },
    [onZoom]
  );

  const initZoom = useCallback(
    element => {
      if (!element) return;

      const zoom = d3
        .zoom()
        .scaleExtent([ZOOM_THRESHOLDS.FAR, ZOOM_THRESHOLDS.MAX])
        .on('zoom', handleZoom);

      d3.select(element).call(zoom);
    },
    [handleZoom, ZOOM_THRESHOLDS]
  );

  return initZoom;
};

export default useZoomBehavior;
