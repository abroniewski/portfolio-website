import { useMemo } from 'react';
import { calculateNodeRadius, calculateLinkDistance, calculateFontSize } from '../utils';

const useZoomDependentValues = zoomLevel => {
  return useMemo(
    () => ({
      nodeRadius: calculateNodeRadius(zoomLevel),
      linkDistance: calculateLinkDistance(zoomLevel),
      chargeStrength: -30 * zoomLevel,
      collisionRadius: Math.max(40, 60 * zoomLevel),
    }),
    [zoomLevel]
  );
};

export default useZoomDependentValues;
