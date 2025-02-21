import React from 'react'
import GraphView from './components/GraphView/GraphView'

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

function App() {
  return (
    <main>
      <h1>Interactive Portfolio</h1>
      <GraphView data={mockData} width={800} height={600} />
    </main>
  )
}

export default App
