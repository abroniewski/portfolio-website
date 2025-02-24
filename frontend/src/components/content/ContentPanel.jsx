import { useEffect, useState } from 'react';

import { useNodeContext } from '../../contexts/NodeContext';
import { mockContentData } from '../../constants/mockData';
import styles from './ContentPanel.module.css';

const ContentPanel = () => {
  const { selectedNode, handleNodeDeselect } = useNodeContext();
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (selectedNode) {
      const nodeContent = mockContentData[selectedNode.id];
      if (nodeContent) {
        setContent(nodeContent);
      }
    } else {
      setContent(null);
    }
  }, [selectedNode]);

  if (!selectedNode || !content) return null;

  return (
    <div className={styles.panel}>
      <button 
        className={styles.closeButton} 
        onClick={handleNodeDeselect}
        aria-label="Close content panel"
      >
        ×
      </button>
      <div className={styles.content}>
        <h2>{content.title}</h2>
        <div className={styles.type}>{content.type}</div>
        <p className={styles.description}>{content.description}</p>
        <div className={styles.mainContent}>{content.content}</div>
      </div>
    </div>
  );
};

export default ContentPanel;
