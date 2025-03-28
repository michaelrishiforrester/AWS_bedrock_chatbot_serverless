# LLM Interactive Diagram

This interactive visualization demonstrates the internal functioning of Large Language Models (LLMs), how Retrieval-Augmented Generation (RAG) works with LLMs, and how applications can connect to LLM services.

<!-- Add a screenshot of the diagram here -->
<!-- ![LLM Interactive Diagram](docs/images/diagram-preview.png) -->

## Features

- **Interactive Diagram**: Visualizes the components and connections in LLM architecture with color-coded nodes and animated connections
- **Dynamic Highlighting**: Click on nodes to highlight related connections and components
- **Expandable Nodes**: Click on nodes to reveal detailed explanations
- **Draggable Interface**: Rearrange components to explore different aspects of the system
- **Intuitive Controls**: Zoom controls, reset layout button, and minimap for easy navigation
- **Responsive Design**: Adaptable layout for different screen sizes

## Topics Covered

1. **LLM Internal Architecture** (Blue Nodes)
   - Input Embedding (🧠)
   - Attention Mechanisms (🔍)
   - Feed-Forward Networks (⚙️)
   - Output Generation (📤)

2. **Retrieval-Augmented Generation (RAG)** (Green Nodes)
   - Document Storage (📚)
   - Embedding Indexing (🔢)
   - Retrieval Systems (🔎)
   - Integration with LLMs

3. **Application Integration** (Purple Nodes)
   - API Gateways (🔌)
   - Prompt Engineering (✏️)
   - Response Processing (🔄)

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd llm-interactive-diagram

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## Technologies Used

- **React**: UI component library
- **TypeScript**: Type-safe JavaScript
- **React Flow**: Interactive node-based visualization
- **Vite**: Fast build tool and development server

## Usage

1. Open the application in your browser
2. Explore the diagram by dragging nodes and panning the canvas
3. Click on any node to highlight its connections
4. Click the "Show Details" button to see detailed explanations
5. Use the controls in the bottom right to zoom in/out
6. Use the "Reset Layout" button in the top right to restore the original arrangement

## Documentation

Complete documentation is available in the `docs` directory:

- [User Guide](docs/user/user-guide.md) - For end users of the application
- [System Guide](docs/system/system-guide.md) - For system administrators
- [Developer Guide](docs/developer/developer-guide.md) - For developers extending the application

## Recent Improvements

- Enhanced node styling with distinct colors and custom icons
- Added animated edge connections with labels describing data flow
- Implemented node highlighting to show relationships between components
- Added node hover effects and interactive features
- Improved layout organization for better visualization
- Added minimap with color-coding for easier navigation
- Implemented "Reset Layout" functionality

## Contributing

Contributions are welcome! Please see the [Developer Guide](docs/developer/developer-guide.md) for information on how to contribute to this project.

## License

MIT

---

Built with ❤️ for the LLM and AI education community