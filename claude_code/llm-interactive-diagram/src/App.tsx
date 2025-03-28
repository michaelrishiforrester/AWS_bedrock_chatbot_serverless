import { useState } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap, 
  Node, 
  Edge,
  ConnectionLineType,
  useNodesState,
  useEdgesState,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';
import './App.css';

// Node types
import LLMNode from './components/nodes/LLMNode';
import RAGNode from './components/nodes/RAGNode';
import ApplicationNode from './components/nodes/ApplicationNode';

// Flow data
import { initialNodes, initialEdges } from './data/flowData';

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Custom node types
  const nodeTypes = {
    llmNode: LLMNode,
    ragNode: RAGNode,
    applicationNode: ApplicationNode,
  };

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    // Highlight connected edges and nodes on click
    const connectedEdges = edges.filter(
      (edge) => edge.source === node.id || edge.target === node.id
    );
    
    const connectedNodeIds = new Set<string>();
    connectedEdges.forEach((edge) => {
      connectedNodeIds.add(edge.source);
      connectedNodeIds.add(edge.target);
    });

    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        style: {
          ...n.style,
          opacity: connectedNodeIds.has(n.id) || n.id === node.id ? 1 : 0.4,
          zIndex: n.id === node.id ? 1000 : n.style?.zIndex || 0,
        },
      }))
    );

    setEdges((eds) =>
      eds.map((e) => ({
        ...e,
        style: {
          ...e.style,
          opacity: e.source === node.id || e.target === node.id ? 1 : 0.3,
          zIndex: e.source === node.id || e.target === node.id ? 1000 : e.style?.zIndex || 0,
        },
      }))
    );
  };

  const resetHighlight = () => {
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        style: {
          ...n.style,
          opacity: 1,
          zIndex: 0,
        },
      }))
    );

    setEdges((eds) =>
      eds.map((e) => ({
        ...e,
        style: {
          ...e.style,
          opacity: 1,
          zIndex: 0,
        },
      }))
    );
  };

  // Layout helper functions
  const resetLayout = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
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
          defaultZoom={0.8}
          minZoom={0.2}
          maxZoom={2}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onPaneClick={resetHighlight}
          fitView
          nodesDraggable={true}
          elementsSelectable={true}
          connectionLineType={ConnectionLineType.SmoothStep}
        >
          <Background 
            color="#aaaaaa" 
            gap={16} 
            size={1} 
            variant="dots" 
          />
          <Controls showInteractive={true} />
          <MiniMap 
            nodeStrokeColor={(n) => {
              if (n.type === 'llmNode') return '#4a90e2';
              if (n.type === 'ragNode') return '#5cb85c';
              return '#a94bd1';
            }}
            nodeColor={(n) => {
              if (n.type === 'llmNode') return '#d4e9fc';
              if (n.type === 'ragNode') return '#e3f4d7';
              return '#f4dff7';
            }}
          />
          <Panel position="top-right" className="controls-panel">
            <button onClick={resetLayout} className="control-button">
              Reset Layout
            </button>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
}

export default App;