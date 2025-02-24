import PropTypes from 'prop-types';

import { NodeProvider } from '../../contexts/NodeContext';
import GraphView from '../graph/GraphView';
import ContentPanel from '../content/ContentPanel';
import { mockGraphData } from '../../constants/mockData';
import styles from './MainLayout.module.css';

const MainLayout = () => {
  return (
    <NodeProvider>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Interactive Portfolio</h1>
          <div className={styles.content}>
            <GraphView data={mockGraphData} />
            <ContentPanel />
          </div>
        </div>
      </main>
    </NodeProvider>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
