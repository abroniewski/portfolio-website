import { useNodeContext } from '../../contexts/NodeContext';
import { mockContentData } from '../../constants/mockData';
import styles from './ContentTiles.module.css';

const ContentTiles = () => {
  const { selectedNode, handleNodeSelect } = useNodeContext();

  return (
    <div className={styles.tilesContainer}>
      {Object.entries(mockContentData).map(([id, content]) => (
        <div 
          key={id}
          className={`${styles.tile} ${selectedNode?.id === id ? styles.selected : ''}`}
          onClick={() => handleNodeSelect({ id })}
        >
          <h3 className={styles.tileTitle}>{content.title}</h3>
          <div className={styles.tileType}>{content.type}</div>
        </div>
      ))}
    </div>
  );
};

export default ContentTiles; 