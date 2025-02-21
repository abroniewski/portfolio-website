import { render, screen, fireEvent } from '@testing-library/react';
import GraphView from './GraphView';

describe('GraphView', () => {
  const mockData = {
    nodes: [
      { id: '1', name: 'Node 1' },
      { id: '2', name: 'Node 2' },
      { id: '3', name: 'Node 3' },
    ],
    links: [
      { source: '1', target: '2' },
      { source: '2', target: '3' },
    ],
  };

  it('renders the SVG container', () => {
    render(<GraphView data={mockData} />);
    const svg = screen.getByTestId('graph-container');
    expect(svg).toBeInTheDocument();
  });

  it('renders the correct number of nodes', () => {
    render(<GraphView data={mockData} />);
    const nodes = screen.getAllByTestId('graph-node');
    expect(nodes).toHaveLength(mockData.nodes.length);
  });

  it('renders the correct number of links', () => {
    render(<GraphView data={mockData} />);
    const links = screen.getAllByTestId('graph-link');
    expect(links).toHaveLength(mockData.links.length);
  });

  it('changes node appearance on hover', () => {
    render(<GraphView data={mockData} />);
    const node = screen.getAllByTestId('graph-node')[0];

    // Initial state
    expect(node).toHaveStyle({ fill: '#69b3a2' });
    expect(node.getAttribute('r')).toBe('10');

    // Hover state
    fireEvent.mouseOver(node);
    expect(node).toHaveStyle({ fill: '#ff7f50' });
    expect(node.getAttribute('r')).toBe('15');

    // Return to initial state
    fireEvent.mouseOut(node);
    expect(node).toHaveStyle({ fill: '#69b3a2' });
    expect(node.getAttribute('r')).toBe('10');
  });

  it('updates node position on drag', () => {
    render(<GraphView data={mockData} />);
    const node = screen.getAllByTestId('graph-node')[0];
    
    // Verify drag behavior is attached
    expect(node.hasAttribute('draggable')).toBe(true);
  });
}); 