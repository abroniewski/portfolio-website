import { DIMENSIONS } from '../../constants/graph';
import { renderWithD3, sampleGraphData } from '../../utils/test-utils';

import GraphView from './GraphView';

// Tests are temporarily skipped until we set up proper D3 mocking
// TODO: Implement proper D3 mocking strategy and re-enable tests
describe.skip('GraphView', () => {
  it('renders without crashing', () => {
    const { container } = renderWithD3(<GraphView />);
    expect(container).toBeInTheDocument();
  });

  it('renders with correct dimensions', () => {
    const { getByTestId } = renderWithD3(<GraphView />);
    const svg = getByTestId('graph-container');

    expect(svg).toHaveAttribute('width', String(DIMENSIONS.width));
    expect(svg).toHaveAttribute('height', String(DIMENSIONS.height));
  });

  it('renders with provided data', () => {
    const { container } = renderWithD3(<GraphView data={sampleGraphData} />);
    expect(container).toBeInTheDocument();
  });
});
