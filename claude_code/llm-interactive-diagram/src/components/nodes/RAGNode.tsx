import { useState } from 'react';
import { Handle, Position } from 'reactflow';

type RAGNodeProps = {
  data: {
    title: string;
    description: string;
    details: string;
  };
};

const RAGNode = ({ data }: RAGNodeProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="node rag-node">
      <Handle type="target" position={Position.Top} className="handle" />
      <div className="node-icon">📚</div>
      <div className="node-title">{data.title}</div>
      <div className="node-content">{data.description}</div>
      
      <button 
        className="expand-button" 
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Hide Details' : 'Show Details'}
      </button>
      
      {expanded && (
        <div className="expanded-content">
          {data.details}
        </div>
      )}
      
      <Handle type="source" position={Position.Bottom} className="handle" />
      <Handle type="source" position={Position.Right} className="handle" />
    </div>
  );
};

export default RAGNode;