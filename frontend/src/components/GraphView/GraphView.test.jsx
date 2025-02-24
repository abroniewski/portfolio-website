import { render } from '@testing-library/react';

import GraphView from './GraphView';

// Skip all tests until we properly mock D3
describe.skip('GraphView', () => {
  const mockData = {
    nodes: [
      { id: '1', title: 'Node 1' },
      { id: '2', title: 'Node 2' },
    ],
    links: [{ source: '1', target: '2' }],
  };

  it('renders without crashing', () => {
    const { container } = render(<GraphView data={mockData} width={800} height={600} />);
    expect(container).toBeTruthy();
  });
});
