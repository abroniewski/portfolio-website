import { render, fireEvent } from '@testing-library/react';

import MiniGraph from './MiniGraph';

describe('MiniGraph', () => {
  const mockNodes = [
    { id: 'node-1', title: 'Node 1', type: 'article' },
    { id: 'node-2', title: 'Node 2', type: 'video' },
  ];

  const mockLinks = [{ source: 'node-1', target: 'node-2' }];

  it('renders mini graph container', () => {
    const { container } = render(
      <MiniGraph
        nodes={mockNodes}
        links={mockLinks}
        currentNodeId="node-1"
        onNodeClick={() => {}}
      />
    );

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('calls onNodeClick when node is clicked', () => {
    const handleNodeClick = jest.fn();
    const { getByTestId } = render(
      <MiniGraph
        nodes={mockNodes}
        links={mockLinks}
        currentNodeId="node-1"
        onNodeClick={handleNodeClick}
      />
    );

    // Find and click a node
    const node = getByTestId('mini-graph-node-node-2');
    fireEvent.click(node);

    expect(handleNodeClick).toHaveBeenCalledWith('node-2');
  });

  it('highlights current node', () => {
    const { getByTestId } = render(
      <MiniGraph
        nodes={mockNodes}
        links={mockLinks}
        currentNodeId="node-1"
        onNodeClick={() => {}}
      />
    );

    const currentNode = getByTestId('mini-graph-node-node-1');
    expect(currentNode).toHaveAttribute('fill', expect.stringMatching(/#ff7f50/i));
  });
});
