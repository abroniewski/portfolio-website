import { render } from '@testing-library/react';

import App from './App';

// Mock the GraphView component to avoid D3 initialization
jest.mock('./components/GraphView/GraphView', () => {
  return function MockGraphView() {
    return <div data-testid="mock-graph">Graph View</div>;
  };
});

describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });
});
