import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

const customRender = (ui, options = {}) => {
  return {
    user: userEvent.setup(),
    ...render(ui, {
      wrapper: options.wrapper,
      ...options,
    }),
  };
};

// Mock D3 selections and behaviors
const mockD3 = {
  select: jest.fn(() => ({
    selectAll: jest.fn(() => ({
      data: jest.fn(() => ({ enter: jest.fn(() => ({ append: jest.fn() })) })),
      attr: jest.fn().mockReturnThis(),
      style: jest.fn().mockReturnThis(),
      call: jest.fn().mockReturnThis(),
    })),
    append: jest.fn(() => mockD3.select()),
    attr: jest.fn().mockReturnThis(),
    style: jest.fn().mockReturnThis(),
    call: jest.fn().mockReturnThis(),
  })),
};

// Custom render for components that use D3
const renderWithD3 = (ui, options = {}) => {
  // Mock D3 methods before render
  jest.mock('d3', () => mockD3);

  return {
    ...render(ui, options),
    // Add helper methods if needed
    mockD3,
  };
};

// Sample test data
const sampleGraphData = {
  nodes: [
    { id: '1', title: 'Node 1' },
    { id: '2', title: 'Node 2' },
  ],
  links: [{ source: '1', target: '2' }],
};

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };

export { renderWithD3, sampleGraphData };
