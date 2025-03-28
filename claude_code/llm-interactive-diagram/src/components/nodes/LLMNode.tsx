import { useState } from 'react';
import { Handle, Position } from 'reactflow';

type LLMNodeProps = {
  data: {
    title: string;
    description: string;
    details: string;
  };
};

const LLMNode = ({ data }: LLMNodeProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="node llm-node">
      <Handle type="target" position={Position.Top} className="handle" />
      <div className="node-icon">🧠</div>
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
    </div>
  );
};

export default LLMNode;