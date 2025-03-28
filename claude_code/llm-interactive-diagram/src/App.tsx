import { useState } from 'react';
import ReactFlow, { Background, Controls, MiniMap, Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';
import './App.css';

// Node types
import LLMNode from './components/nodes/LLMNode';
import RAGNode from './components/nodes/RAGNode';
import ApplicationNode from './components/nodes/ApplicationNode';

// Flow data
import { initialNodes, initialEdges } from './data/flowData';

function App() {
  const [nodes] = useState<Node[]>(initialNodes);
  const [edges] = useState<Edge[]>(initialEdges);

  // Custom node types
  const nodeTypes = {
    llmNode: LLMNode,
    ragNode: RAGNode,
    applicationNode: ApplicationNode,
  };

  return (
    <div className="app-container">
      <header>
        <h1>Interactive LLM Architecture Diagram</h1>
        <p>Explore how LLMs work internally, how RAG enhances LLMs, and how applications connect to them</p>
      </header>
      
      <div className="flow-container">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
}

export default App;