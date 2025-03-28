# LLM Interactive Diagram: Developer Guide

This guide provides technical documentation for developers who want to understand, modify, or extend the LLM Interactive Diagram application.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Code Architecture](#code-architecture)
3. [Key Components](#key-components)
4. [Styling System](#styling-system)
5. [Adding New Features](#adding-new-features)
6. [Testing](#testing)
7. [Performance Optimization](#performance-optimization)
8. [Contributing Guidelines](#contributing-guidelines)
9. [Known Issues](#known-issues)
10. [Future Enhancements](#future-enhancements)

## Project Structure

```
llm-interactive-diagram/
├── dist/                 # Build output directory
├── docs/                 # Documentation
│   ├── user/             # User documentation
│   ├── system/           # System documentation
│   └── developer/        # Developer documentation
├── public/               # Static files
├── src/                  # Source code
│   ├── assets/           # Images and other assets
│   ├── components/       # React components
│   │   └── nodes/        # Node type components
│   ├── data/             # Data configuration
│   ├── App.css           # Main application styles
│   ├── App.tsx           # Main application component
│   ├── index.css         # Global styles
│   └── main.tsx          # Application entry point
├── .gitignore            # Git ignore file
├── index.html            # HTML entry point
├── package.json          # Project dependencies
├── README.md             # Project overview
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## Code Architecture

The application follows a component-based architecture using React and TypeScript. Key architectural patterns include:

- **Component-Based Structure**: UI elements are divided into reusable components
- **Type Safety**: TypeScript is used throughout the application for type safety
- **Data Flow**: Top-down state management using React's built-in state hooks
- **Styling**: CSS with BEM methodology for maintainable styles

## Key Components

### Main Application (App.tsx)

The main App component sets up the ReactFlow canvas and manages the application state. It handles:

- Initialization of nodes and edges
- Setup of interaction handlers (click, drag, etc.)
- Registration of custom node types
- Control panel rendering

```typescript
// Excerpt from App.tsx
function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Node types registration
  const nodeTypes = {
    llmNode: LLMNode,
    ragNode: RAGNode,
    applicationNode: ApplicationNode,
  };

  // Node click handler for highlighting
  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    // Highlight logic...
  };

  return (
    <div className="app-container">
      {/* ReactFlow setup... */}
    </div>
  );
}
```

### Node Components

The application has three custom node types, each defined in its own component:

1. **LLMNode**: Represents LLM architecture components (src/components/nodes/LLMNode.tsx)
2. **RAGNode**: Represents RAG system components (src/components/nodes/RAGNode.tsx)
3. **ApplicationNode**: Represents application integration components (src/components/nodes/ApplicationNode.tsx)

Each node component follows the same pattern:

```typescript
// Sample structure of a node component
const LLMNode = ({ data }: LLMNodeProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="node llm-node">
      <Handle type="target" position={Position.Top} className="handle" />
      <div className="node-icon">{data.icon || '🧠'}</div>
      <div className="node-title">{data.title}</div>
      <div className="node-content">{data.description}</div>
      
      <button 
        className="expand-button" 
        onClick={(e) => {
          e.stopPropagation();
          setExpanded(!expanded);
        }}
      >
        {expanded ? 'Hide Details' : 'Show Details'}
      </button>
      
      {expanded && (
        <div className="expanded-content">{data.details}</div>
      )}
      
      <Handle type="source" position={Position.Bottom} className="handle" />
    </div>
  );
};
```

### Data Configuration (flowData.ts)

The `flowData.ts` file defines the initial state of the diagram, including all nodes and their connections. This is where you'll define:

- Node positions, types, and content
- Edge connections between nodes
- Visual styling for nodes and edges

```typescript
// Excerpt from flowData.ts
export const initialNodes: Node[] = [
  {
    id: 'llm-1',
    type: 'llmNode',
    position: { x: 100, y: 50 },
    data: {
      title: 'Input Embedding',
      description: 'Converts tokens to vector representations',
      details: '...',
      icon: '🧠'
    },
    style: {
      width: 250,
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)'
    }
  },
  // Additional nodes...
];

export const initialEdges: Edge[] = [
  { 
    id: 'e-llm-1-2', 
    source: 'llm-1', 
    target: 'llm-2',
    animated: true, 
    style: { stroke: '#4a90e2', strokeWidth: 2 },
    label: 'Token Embeddings'
  },
  // Additional edges...
];
```

## Styling System

The application uses CSS for styling with a structure influenced by BEM (Block, Element, Modifier) methodology:

- **App.css**: Contains the main application styles
- **index.css**: Contains global reset and base styles

Key style considerations:

### Node Styling

Node styles are defined in App.css with different classes for each node type:

```css
/* Base node styling */
.node {
  border-radius: 12px;
  padding: 1.2rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  /* Other common properties... */
}

/* Node type variations */
.llm-node {
  background-color: #d4e9fc;
  border: 2px solid #4a90e2;
}

.rag-node {
  background-color: #e3f4d7;
  border: 2px solid #5cb85c;
}

.application-node {
  background-color: #f4dff7;
  border: 2px solid #a94bd1;
}
```

### Edge Styling

Edge styles are primarily defined in the `flowData.ts` file using inline styles:

```typescript
{
  id: 'e-llm-1-2',
  source: 'llm-1',
  target: 'llm-2',
  animated: true,
  style: { stroke: '#4a90e2', strokeWidth: 2 },
  label: 'Token Embeddings'
}
```

## Adding New Features

### Adding a New Node Type

1. Create a new component in the `src/components/nodes` directory
2. Register the component in `App.tsx` under `nodeTypes`
3. Add the new node to `flowData.ts` with the corresponding type

```typescript
// 1. Create component (e.g., CustomNode.tsx)
const CustomNode = ({ data }: CustomNodeProps) => {
  // Implementation...
};

// 2. Register in App.tsx
const nodeTypes = {
  llmNode: LLMNode,
  ragNode: RAGNode,
  applicationNode: ApplicationNode,
  customNode: CustomNode,  // Add the new node type
};

// 3. Add to flowData.ts
export const initialNodes: Node[] = [
  // Existing nodes...
  {
    id: 'custom-1',
    type: 'customNode',
    position: { x: 100, y: 800 },
    data: {
      title: 'Custom Node',
      description: 'Description of custom node',
      details: 'Detailed explanation...',
      icon: '🔮'
    },
    style: {
      width: 250,
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)'
    }
  },
];
```

### Adding New Interactions

To add new interactions, modify the event handlers in `App.tsx`:

```typescript
// Example: Add double-click handler to expand all connected nodes
const onNodeDoubleClick = (_: React.MouseEvent, node: Node) => {
  const connectedNodeIds = edges
    .filter(e => e.source === node.id || e.target === node.id)
    .flatMap(e => [e.source, e.target]);
  
  const uniqueIds = [...new Set(connectedNodeIds)];
  
  // Implementation to expand all connected nodes...
};

// Add to ReactFlow component
<ReactFlow
  // Other props...
  onNodeDoubleClick={onNodeDoubleClick}
>
```

## Testing

The application is set up for testing using the following tools:

- **Unit Testing**: Jest for component and utility testing
- **Component Testing**: React Testing Library for component interaction testing
- **E2E Testing**: Cypress for end-to-end testing (if implemented)

To run tests:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch
```

### Writing Tests

When adding new features, include appropriate tests:

```typescript
// Example test for a node component
import { render, screen, fireEvent } from '@testing-library/react';
import LLMNode from './LLMNode';

describe('LLMNode', () => {
  const mockData = {
    title: 'Test Node',
    description: 'Test Description',
    details: 'Test Details',
    icon: '🧪'
  };

  it('renders correctly with provided data', () => {
    render(<LLMNode data={mockData} />);
    expect(screen.getByText('Test Node')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('expands to show details when button is clicked', () => {
    render(<LLMNode data={mockData} />);
    const button = screen.getByText('Show Details');
    fireEvent.click(button);
    expect(screen.getByText('Test Details')).toBeInTheDocument();
    expect(screen.getByText('Hide Details')).toBeInTheDocument();
  });
});
```

## Performance Optimization

The application uses several techniques for optimal performance:

### React Flow Optimization

- Using `useNodesState` and `useEdgesState` hooks for efficient updates
- Limiting the number of nodes and edges for better performance
- Using memoization for expensive calculations

### State Management

- Local component state for UI toggles (like expanding node details)
- Application-level state for shared concerns (node highlighting)

### Rendering Optimization

For large diagrams, consider these optimization techniques:

```typescript
// Use React.memo for node components to prevent unnecessary re-renders
const LLMNode = React.memo(({ data }: LLMNodeProps) => {
  // Component implementation...
});

// Use virtualization if dealing with many nodes
<ReactFlow
  // Other props...
  nodesDraggable={true}
  elementsSelectable={true}
  elevateNodesOnSelect={true}
  minZoom={0.2}
  maxZoom={2}
  defaultZoom={0.8}
  nodeExtent={[
    [0, 0],
    [1000, 1000]
  ]}
>
```

## Contributing Guidelines

To contribute to this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Run tests and ensure they pass
5. Commit your changes (`git commit -m 'Add some feature'`)
6. Push to the branch (`git push origin feature/your-feature-name`)
7. Create a new Pull Request

### Code Style

- Follow the existing code style
- Use TypeScript for all components and utilities
- Use functional components with hooks instead of class components
- Include appropriate comments and documentation

### Pull Request Process

1. Update the README.md with details of changes if necessary
2. Update the documentation in the docs directory
3. Increase the version numbers in package.json
4. The PR will be merged once it has been reviewed and approved

## Known Issues

Currently, the application has the following known issues:

1. **Edge Labels**: Edge labels may overlap when nodes are positioned too close
2. **Text Overflow**: Long node titles or descriptions may cause layout issues
3. **Mobile Support**: The application is optimized for desktop and may have usability issues on mobile devices

## Future Enhancements

Planned enhancements for future versions:

1. **Dark Mode**: Add support for dark mode theme
2. **Save Layout**: Allow users to save custom node layouts
3. **Zoom to Node**: Add ability to zoom directly to a specific node
4. **Search Functionality**: Add search to find nodes by name or description
5. **Export Options**: Add ability to export the diagram as an image or PDF
6. **Interactive Tutorials**: Add guided tours of the diagram

---

For additional questions or support, please reach out to the development team or create an issue in the repository.