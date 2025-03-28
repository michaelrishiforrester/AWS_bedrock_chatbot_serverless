import { Node, Edge } from 'reactflow';

// Define the node data
export const initialNodes: Node[] = [
  // LLM Architecture Nodes
  {
    id: 'llm-1',
    type: 'llmNode',
    position: { x: 100, y: 50 },
    data: {
      title: 'Input Embedding',
      description: 'Converts tokens to vector representations',
      details: 'Transforms input tokens into fixed-dimensional vectors (embeddings) using learned token embeddings. These embeddings capture semantic meaning and context of each token.'
    }
  },
  {
    id: 'llm-2',
    type: 'llmNode',
    position: { x: 100, y: 200 },
    data: {
      title: 'Attention Layers',
      description: 'Core mechanism for contextual understanding',
      details: 'Self-attention mechanisms allow the model to weigh the importance of different tokens when processing a specific token. Multi-head attention computes attention across different representation subspaces, enabling the model to capture various types of relationships between tokens simultaneously.'
    }
  },
  {
    id: 'llm-3',
    type: 'llmNode',
    position: { x: 100, y: 350 },
    data: {
      title: 'Feed-Forward Networks',
      description: 'Processes token representations',
      details: 'Each transformer block contains a feed-forward neural network that processes each token\'s representation independently, enhancing the model\'s ability to learn complex patterns and transformations.'
    }
  },
  {
    id: 'llm-4',
    type: 'llmNode',
    position: { x: 100, y: 500 },
    data: {
      title: 'Output Layer',
      description: 'Generates token probabilities',
      details: 'The final layer that converts hidden representations back to logits (unnormalized probabilities) for each token in the vocabulary. During generation, these probabilities guide the selection of the next token.'
    }
  },

  // RAG Nodes
  {
    id: 'rag-1',
    type: 'ragNode',
    position: { x: 400, y: 100 },
    data: {
      title: 'Document Storage',
      description: 'Repository of knowledge documents',
      details: 'Contains the corpus of documents, articles, or knowledge base entries. These documents are processed, chunked, and stored for efficient retrieval.'
    }
  },
  {
    id: 'rag-2',
    type: 'ragNode',
    position: { x: 400, y: 250 },
    data: {
      title: 'Embedding Index',
      description: 'Vector database for semantic search',
      details: 'Document chunks are transformed into embeddings using the same embedding model as the LLM uses. These embeddings are indexed in a vector database optimized for similarity searches.'
    }
  },
  {
    id: 'rag-3',
    type: 'ragNode',
    position: { x: 400, y: 400 },
    data: {
      title: 'Retrieval System',
      description: 'Finds relevant context for queries',
      details: "When a query is received, it's embedded and used to search the vector database. The most semantically similar document chunks are retrieved and provided as context for the LLM."
    }
  },

  // Application Integration Nodes
  {
    id: 'app-1',
    type: 'applicationNode',
    position: { x: 700, y: 100 },
    data: {
      title: 'API Gateway',
      description: 'Provides access to LLM services',
      details: 'Serves as the entry point for applications to interact with LLMs. Handles authentication, rate limiting, and routing requests to the appropriate LLM service.'
    }
  },
  {
    id: 'app-2',
    type: 'applicationNode',
    position: { x: 700, y: 250 },
    data: {
      title: 'Prompt Engineering',
      description: 'Crafts effective instructions for LLMs',
      details: 'Designs structured prompts that guide the LLM to produce the desired outputs. Includes techniques like few-shot learning, chain-of-thought prompting, and system messages.'
    }
  },
  {
    id: 'app-3',
    type: 'applicationNode',
    position: { x: 700, y: 400 },
    data: {
      title: 'Response Processing',
      description: 'Processes and validates LLM outputs',
      details: 'Handles the raw outputs from LLMs, including parsing structured data, validating against schemas, filtering unsafe content, and formatting for presentation.'
    }
  }
];

// Define the edge connections
export const initialEdges: Edge[] = [
  // LLM internal connections
  { id: 'e-llm-1-2', source: 'llm-1', target: 'llm-2' },
  { id: 'e-llm-2-3', source: 'llm-2', target: 'llm-3' },
  { id: 'e-llm-3-4', source: 'llm-3', target: 'llm-4' },
  
  // RAG internal connections
  { id: 'e-rag-1-2', source: 'rag-1', target: 'rag-2' },
  { id: 'e-rag-2-3', source: 'rag-2', target: 'rag-3' },
  
  // RAG to LLM connections
  { id: 'e-rag-3-llm-1', source: 'rag-3', target: 'llm-1', type: 'step' },
  
  // Application to LLM/RAG connections
  { id: 'e-app-1-app-2', source: 'app-1', target: 'app-2' },
  { id: 'e-app-2-app-3', source: 'app-2', target: 'app-3' },
  { id: 'e-app-2-llm-1', source: 'app-2', target: 'llm-1', type: 'step' },
  { id: 'e-app-2-rag-1', source: 'app-2', target: 'rag-1', type: 'step' }
];