import GraphView from './components/GraphView/GraphView';

const mockData = {
  nodes: [
    // First group (3 nodes)
    { id: '1', title: 'Introduction to AI', type: 'article' },
    { id: '2', title: 'Machine Learning Basics', type: 'video' },
    { id: '3', title: 'Neural Networks', type: 'presentation' },
    // Second group (5 nodes)
    { id: '4', title: 'Data Visualization', type: 'github' },
    { id: '5', title: 'React Components', type: 'github' },
    { id: '6', title: 'Portfolio Design', type: 'article' },
    { id: '7', title: 'D3.js Tutorial', type: 'video' },
    { id: '8', title: 'Graph Theory', type: 'presentation' },
  ],
  links: [
    // First group connections
    { source: '1', target: '2' },
    { source: '2', target: '3' },
    // Second group connections (forming a connected structure)
    { source: '4', target: '5' },
    { source: '4', target: '6' },
    { source: '4', target: '7' },
    { source: '7', target: '8' },
  ],
};

function App() {
  return (
    <main>
      <h1>Interactive Portfolio</h1>
      <GraphView data={mockData} width={800} height={600} />
    </main>
  );
}

export default App;
