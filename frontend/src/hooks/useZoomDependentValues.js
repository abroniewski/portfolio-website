import { useMemo } from 'react';

const useZoomDependentValues = zoomLevel => {
  return useMemo(
    () => ({
      nodeRadius: Math.max(5, 10 * zoomLevel),
      linkDistance: Math.max(50, 80 * zoomLevel),
      chargeStrength: -30 * zoomLevel,
      collisionRadius: Math.max(40, 60 * zoomLevel),
    }),
    [zoomLevel]
  );
};

export default useZoomDependentValues;
