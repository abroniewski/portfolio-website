import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

import { mockContentData } from '../../constants/mockData';
import MiniGraph from '../graph/MiniGraph';

import styles from './ContentPage.module.css';

const ContentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const contentData = mockContentData.get(id);
    if (contentData) {
      setContent(contentData);
      setError(null);
    } else {
      setError('Content not found');
      setContent(null);
    }
  }, [id]);

  const handleBackClick = () => {
    navigate('/');
  };

  const handleRelatedNodeClick = nodeId => {
    navigate(`/content/${nodeId}`);
  };

  const parseContent = text => {
    if (!text) return '';

    const parts = text.split(/(\[\[.*?\]\])/g);
    return parts.map((part, index) => {
      const match = part.match(/\[\[(.*?)\]\]/);
      if (match) {
        const linkText = match[1];
        return (
          <Link key={index} to={`/content/${linkText}`} className={styles.internalLink}>
            {linkText}
          </Link>
        );
      }
      return part;
    });
  };

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>{error}</h2>
        <button onClick={handleBackClick} className={styles.backButton}>
          Back to Graph
        </button>
      </div>
    );
  }

  if (!content) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.contentPage}>
      <button onClick={handleBackClick} className={styles.backButton}>
        Back to Graph
      </button>

      <div className={styles.contentContainer}>
        <div className={styles.mainContent}>
          <h1>{content.title}</h1>
          <div className={styles.content}>{parseContent(content.content)}</div>
        </div>

        <div className={styles.sidebar}>
          <MiniGraph
            nodes={content.relatedNodes.map(id => mockContentData.get(id))}
            links={content.relatedNodes.map(target => ({ source: content.id, target }))}
            currentNodeId={content.id}
            onNodeClick={handleRelatedNodeClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ContentPage;
