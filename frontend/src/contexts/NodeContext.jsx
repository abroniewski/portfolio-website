import { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const NodeContext = createContext(null);

export const NodeProvider = ({ children }) => {
  const [selectedNode, setSelectedNode] = useState(null);

  const handleNodeSelect = useCallback((node) => {
    setSelectedNode(node);
  }, []);

  const handleNodeDeselect = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return (
    <NodeContext.Provider 
      value={{ 
        selectedNode, 
        handleNodeSelect, 
        handleNodeDeselect 
      }}
    >
      {children}
    </NodeContext.Provider>
  );
};

NodeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useNodeContext = () => {
  const context = useContext(NodeContext);
  if (!context) {
    throw new Error('useNodeContext must be used within a NodeProvider');
  }
  return context;
}; 