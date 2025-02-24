import { renderHook } from '@testing-library/react';
import * as d3 from 'd3';

import useDragBehavior from './useDragBehavior';

// Mock d3 drag behavior
jest.mock('d3', () => ({
  drag: jest.fn(() => ({
    filter: jest.fn().mockReturnThis(),
    on: jest.fn().mockReturnThis(),
  })),
}));

describe('useDragBehavior', () => {
  const mockSimulation = {
    current: {
      alphaTarget: jest.fn().mockReturnThis(),
      restart: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns a function', () => {
    const { result } = renderHook(() => useDragBehavior(mockSimulation));
    expect(typeof result.current).toBe('function');
  });

  it('initializes drag behavior correctly', () => {
    const { result } = renderHook(() => useDragBehavior(mockSimulation));
    const initDrag = result.current;

    // Call the returned function
    initDrag();

    // Verify d3.drag was called
    expect(d3.drag).toHaveBeenCalled();

    // Verify event handlers were set up
    const dragInstance = d3.drag.mock.results[0].value;
    expect(dragInstance.on).toHaveBeenCalledWith('start', expect.any(Function));
    expect(dragInstance.on).toHaveBeenCalledWith('drag', expect.any(Function));
    expect(dragInstance.on).toHaveBeenCalledWith('end', expect.any(Function));
  });

  it('filters drag events correctly', () => {
    const { result } = renderHook(() => useDragBehavior(mockSimulation));
    const initDrag = result.current;
    initDrag();

    // Get the filter function
    const filterFn = d3.drag.mock.results[0].value.filter.mock.calls[0][0];

    // Test filter conditions
    expect(filterFn({ button: 0, ctrlKey: false })).toBe(true); // Should allow
    expect(filterFn({ button: 1, ctrlKey: false })).toBe(false); // Wrong button
    expect(filterFn({ button: 0, ctrlKey: true })).toBe(false); // Ctrl pressed
    expect(filterFn({ button: 0, ctrlKey: false, defaultPrevented: true })).toBe(false); // Prevented
  });
});
