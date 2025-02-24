import GraphView from './components/graph/GraphView';
import MainLayout from './components/layout/MainLayout';
import { mockGraphData } from './constants/mockData';

function App() {
  return (
    <MainLayout>
      <GraphView data={mockGraphData} width={800} height={600} />
    </MainLayout>
  );
}

export default App;
