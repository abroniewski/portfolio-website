import { renderHook } from '@testing-library/react';
import * as d3 from 'd3';

import useZoomBehavior from './useZoomBehavior';

// Mock d3 zoom behavior
jest.mock('d3', () => ({
  select: jest.fn(() => ({
    call: jest.fn(),
  })),
  zoom: jest.fn(() => ({
    scaleExtent: jest.fn().mockReturnThis(),
    on: jest.fn().mockReturnThis(),
  })),
}));

describe('useZoomBehavior', () => {
  const mockZoomThresholds = {
    FAR: 0.5,
    MID: 1.5,
    MAX: 4,
  };

  const mockOnZoom = jest.fn();

  beforeEach(() => {
    mockOnZoom.mockClear();
    jest.clearAllMocks();
  });

  it('returns a function', () => {
    const { result } = renderHook(() => useZoomBehavior(mockZoomThresholds, mockOnZoom));
    expect(typeof result.current).toBe('function');
  });

  it('initializes zoom behavior correctly', () => {
    const { result } = renderHook(() => useZoomBehavior(mockZoomThresholds, mockOnZoom));
    const initZoom = result.current;

    const mockElement = document.createElement('div');
    initZoom(mockElement);

    // Verify d3 zoom was initialized
    expect(d3.zoom).toHaveBeenCalled();
    expect(d3.select).toHaveBeenCalledWith(mockElement);
  });
});
