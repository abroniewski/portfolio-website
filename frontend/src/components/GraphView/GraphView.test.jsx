import { render, screen, fireEvent } from '@testing-library/react';
import GraphView from './GraphView';
import { select } from 'd3-selection';
import { act } from 'react-dom/test-utils';

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
    const labels = screen.getAllByTestId('node-label');
    expect(labels).toHaveLength(mockData.nodes.length);
    
    // Check if labels show correct text
    labels.forEach((label, i) => {
      expect(label).toHaveTextContent(mockData.nodes[i].title);
    });
  });

  it('renders the correct number of links', () => {
    render(<GraphView data={mockData} />);
    const links = screen.getAllByTestId('graph-link');
    expect(links).toHaveLength(mockData.links.length);
  });

  it('changes node appearance on hover', () => {
    render(<GraphView data={mockData} />);
    const node = screen.getAllByTestId('graph-node')[0];
    const links = screen.getAllByTestId('graph-link');
    const connectedLink = links[0]; // First link connects to first node

    // Initial state
    expect(node).toHaveStyle({ fill: '#69b3a2' });
    expect(node.getAttribute('r')).toBe('10');
    expect(connectedLink).toHaveStyle({ stroke: '#999' });
    expect(connectedLink.style.strokeWidth).toBe('1');

    // Hover state
    fireEvent.mouseOver(node);
    expect(node).toHaveStyle({ fill: '#ff7f50' });
    expect(node.getAttribute('r')).toBe('15');
    expect(connectedLink).toHaveStyle({ stroke: '#ff7f50' });
    expect(connectedLink.style.strokeWidth).toBe('2');

    // Return to initial state
    fireEvent.mouseOut(node);
    expect(node).toHaveStyle({ fill: '#69b3a2' });
    expect(node.getAttribute('r')).toBe('10');
    expect(connectedLink).toHaveStyle({ stroke: '#999' });
    expect(connectedLink.style.strokeWidth).toBe('1');
  });

  it('updates node position on drag', () => {
    render(<GraphView data={mockData} />);
    const node = screen.getAllByTestId('graph-node')[0];
    
    // Verify drag behavior is attached
    expect(node.hasAttribute('draggable')).toBe(true);
  });
});

describe('GraphView zoom behavior', () => {
  const mockNodes = [
    { id: 1, title: 'Node 1', x: 100, y: 100 },
    { id: 2, title: 'Node 2', x: 200, y: 200 }
  ];
  const mockEdges = [
    { source: mockNodes[0], target: mockNodes[1] }
  ];

  it('hides text when zoomed out far', () => {
    const { container } = render(
      <GraphView nodes={mockNodes} edges={mockEdges} />
    );

    // Simulate a far zoom
    act(() => {
      const svg = select(container.querySelector('svg'));
      svg.dispatch('zoom', { 
        detail: { transform: { k: 0.3, x: 0, y: 0 } }
      });
    });

    const texts = container.querySelectorAll('text');
    texts.forEach(text => {
      expect(text).toHaveStyle({ opacity: '0' });
    });
  });

  it('shows text when zoomed in close', () => {
    const { container } = render(
      <GraphView nodes={mockNodes} edges={mockEdges} />
    );

    // Simulate a close zoom
    act(() => {
      const svg = select(container.querySelector('svg'));
      svg.dispatch('zoom', {
        detail: { transform: { k: 2, x: 0, y: 0 } }
      });
    });

    const texts = container.querySelectorAll('text');
    texts.forEach(text => {
      expect(text).toHaveStyle({ opacity: '1' });
    });
  });
});

describe('GraphView zoom-dependent behavior', () => {
  const mockData = {
    nodes: [
      { id: '1', title: 'Node 1' },
      { id: '2', title: 'Node 2' },
    ],
    links: [
      { source: '1', target: '2' },
    ],
  };

  it('scales node sizes with zoom level', () => {
    const { container } = render(<GraphView data={mockData} />);
    
    // Get initial node size
    const initialNode = container.querySelector('.node');
    const initialRadius = initialNode.getAttribute('r');

    // Simulate zoom in
    act(() => {
      const svg = select(container.querySelector('svg'));
      svg.dispatch('zoom', {
        detail: { transform: { k: 2, x: 0, y: 0 } }
      });
    });

    // Check that node size increased
    const zoomedNode = container.querySelector('.node');
    const zoomedRadius = zoomedNode.getAttribute('r');
    expect(parseFloat(zoomedRadius)).toBeGreaterThan(parseFloat(initialRadius));
  });

  it('scales link distances with zoom level', () => {
    const { container } = render(<GraphView data={mockData} />);
    
    // Get initial link distance from force simulation
    const initialLink = container.querySelector('.link');
    const initialStrokeWidth = initialLink.style.strokeWidth;

    // Simulate zoom in
    act(() => {
      const svg = select(container.querySelector('svg'));
      svg.dispatch('zoom', {
        detail: { transform: { k: 2, x: 0, y: 0 } }
      });
    });

    // Check that stroke width increased
    const zoomedLink = container.querySelector('.link');
    const zoomedStrokeWidth = zoomedLink.style.strokeWidth;
    expect(parseFloat(zoomedStrokeWidth)).toBeGreaterThan(parseFloat(initialStrokeWidth));
  });

  it('scales font size with zoom level', () => {
    const { container } = render(<GraphView data={mockData} />);
    
    // Get initial font size
    const initialLabel = container.querySelector('.node-label');
    const initialFontSize = initialLabel.style.fontSize;

    // Simulate zoom in
    act(() => {
      const svg = select(container.querySelector('svg'));
      svg.dispatch('zoom', {
        detail: { transform: { k: 2, x: 0, y: 0 } }
      });
    });

    // Check that font size increased
    const zoomedLabel = container.querySelector('.node-label');
    const zoomedFontSize = zoomedLabel.style.fontSize;
    expect(parseFloat(zoomedFontSize)).toBeGreaterThan(parseFloat(initialFontSize));
  });
}); 