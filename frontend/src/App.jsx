import React from 'react'
import GraphView from './components/GraphView/GraphView'

const mockData = {
  nodes: [
    // First group (3 nodes)
    { id: '1', name: 'Group 1 - Node 1' },
    { id: '2', name: 'Group 1 - Node 2' },
    { id: '3', name: 'Group 1 - Node 3' },
    // Second group (5 nodes)
    { id: '4', name: 'Group 2 - Node 1' },
    { id: '5', name: 'Group 2 - Node 2' },
    { id: '6', name: 'Group 2 - Node 3' },
    { id: '7', name: 'Group 2 - Node 4' },
    { id: '8', name: 'Group 2 - Node 5' },
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
  )
}

export default App
