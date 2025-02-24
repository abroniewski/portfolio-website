import { useEffect, useState } from 'react';

import { mockContentData } from '../../constants/mockData';

import styles from './ContentPanel.module.css';

const ContentPanel = ({ nodeId, onClose }) => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (nodeId) {
      const nodeContent = mockContentData[nodeId];
      if (nodeContent) {
        setContent(nodeContent);
      }
    }
  }, [nodeId]);

  if (!nodeId || !content) return null;

  return (
    <div className={styles.panel}>
      <button className={styles.closeButton} onClick={onClose}>
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
