import { render } from '@testing-library/react';

import GraphView from './GraphView';

// Tests are temporarily skipped until we set up proper D3 mocking
// TODO: Implement proper D3 mocking strategy and re-enable tests
describe.skip('GraphView', () => {
  it('renders without crashing', () => {
    const { container } = render(<GraphView />);
    expect(container).toBeInTheDocument();
  });

  // Add more specific tests here
  it('renders with correct dimensions', () => {
    const { getByTestId } = render(<GraphView />);
    const svg = getByTestId('graph-container');
    expect(svg).toHaveAttribute('width', '700');
    expect(svg).toHaveAttribute('height', '500');
  });
});
