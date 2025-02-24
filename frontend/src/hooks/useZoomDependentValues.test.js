import { renderHook } from '@testing-library/react';

import useZoomDependentValues from './useZoomDependentValues';

describe('useZoomDependentValues', () => {
  it('returns correct values for default zoom level', () => {
    const { result } = renderHook(() => useZoomDependentValues(1));

    expect(result.current).toEqual({
      nodeRadius: 10,
      linkDistance: 80,
      chargeStrength: -30,
      collisionRadius: 60,
    });
  });

  it('returns correct values for zoomed in state', () => {
    const { result } = renderHook(() => useZoomDependentValues(2));

    expect(result.current).toEqual({
      nodeRadius: 20,
      linkDistance: 160,
      chargeStrength: -60,
      collisionRadius: 120,
    });
  });

  it('returns correct values for zoomed out state', () => {
    const { result } = renderHook(() => useZoomDependentValues(0.5));

    expect(result.current).toEqual({
      nodeRadius: 5,
      linkDistance: 50,
      chargeStrength: -15,
      collisionRadius: 40,
    });
  });
});
