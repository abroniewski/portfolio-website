import { useMemo } from 'react';

import {
  calculateNodeRadius,
  calculateLinkDistance,
  calculateChargeStrength,
  calculateCollisionRadius,
} from '../utils';

const useZoomDependentValues = zoomLevel => {
  return useMemo(
    () => ({
      nodeRadius: calculateNodeRadius(zoomLevel),
      linkDistance: calculateLinkDistance(zoomLevel),
      chargeStrength: calculateChargeStrength(zoomLevel),
      collisionRadius: calculateCollisionRadius(zoomLevel),
    }),
    [zoomLevel]
  );
};

export default useZoomDependentValues;
