import { renderHook } from '@testing-library/react';
import * as d3 from 'd3';

import { COLORS } from '../constants/graph';

import useHighlightBehavior from './useHighlightBehavior';

// Create mock style function that tracks calls
const mockStyleFn = jest.fn().mockReturnThis();
const mockAttrFn = jest.fn().mockReturnThis();

// Mock d3 selections and methods
jest.mock('d3', () => ({
  select: jest.fn(() => ({
    style: mockStyleFn,
    attr: mockAttrFn,
    select: jest.fn().mockReturnThis(),
    data: jest.fn().mockReturnThis(),
    parentNode: { id: 'mock-parent' },
  })),
  selectAll: jest.fn(() => ({
    style: mockStyleFn,
    attr: mockAttrFn,
    filter: jest.fn().mockReturnThis(),
    data: jest.fn(() => [{ id: '1' }]),
    nodes: jest.fn(() => []),
    raise: jest.fn(),
  })),
}));

describe('useHighlightBehavior', () => {
  const mockNodes = d3.selectAll('.node');
  const mockLinks = d3.selectAll('.link');
  const mockLabels = d3.selectAll('.node-label');
  const mockZoomValues = { nodeRadius: 10 };

  beforeEach(() => {
    jest.clearAllMocks();
    mockStyleFn.mockClear();
    mockAttrFn.mockClear();
  });

  it('returns highlight handlers', () => {
    const { result } = renderHook(() =>
      useHighlightBehavior(mockNodes, mockLinks, mockLabels, mockZoomValues)
    );

    expect(result.current.handleNodeMouseOver).toBeDefined();
    expect(result.current.handleNodeMouseOut).toBeDefined();
  });

  it('handles mouse over correctly', () => {
    const { result } = renderHook(() =>
      useHighlightBehavior(mockNodes, mockLinks, mockLabels, mockZoomValues)
    );

    // Mock event and data
    const mockEvent = { target: document.createElement('div') };
    const mockData = { id: '1' };

    result.current.handleNodeMouseOver.call(mockEvent.target, mockEvent, mockData);

    // Verify styles were updated
    expect(d3.selectAll).toHaveBeenCalledWith('.node');
    expect(d3.selectAll).toHaveBeenCalledWith('.link');
    expect(mockStyleFn).toHaveBeenCalledWith('fill', COLORS.node.dimmed);
    expect(mockStyleFn).toHaveBeenCalledWith('opacity', 0.2);
  });

  it('handles mouse out correctly', () => {
    const { result } = renderHook(() =>
      useHighlightBehavior(mockNodes, mockLinks, mockLabels, mockZoomValues)
    );

    // Mock event
    const mockEvent = { target: document.createElement('div') };

    result.current.handleNodeMouseOut.call(mockEvent.target);

    // Verify reset styles
    expect(d3.selectAll).toHaveBeenCalledWith('.node');
    expect(d3.selectAll).toHaveBeenCalledWith('.link');
    expect(mockStyleFn).toHaveBeenCalledWith('fill', COLORS.node.default);
    expect(mockStyleFn).toHaveBeenCalledWith('opacity', 1);
  });
});
