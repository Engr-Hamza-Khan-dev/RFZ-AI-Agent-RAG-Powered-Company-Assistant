# Company AI Agent

A Next.js-based AI chatbot that answers questions about company information using Qdrant vector database for semantic search and Groq LLM for fast, intelligent responses.

## Features

- 🤖 **AI-Powered Chat** - Ask questions about company information and get intelligent answers
- 🔍 **Semantic Search** - Uses Qdrant vector database for accurate document retrieval
- ⚡ **Fast Responses** - Powered by Groq's fast inference API
- 🎨 **Modern UI** - Built with React, Tailwind CSS, and Shadcn components
- 📚 **Knowledge Base** - Automatically embeds and indexes company documents

## Tech Stack

- **Frontend**: React 19, Next.js 16, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Vector Database**: Qdrant
- **LLM**: Groq (llama-3.3-70b-versatile)
- **Embeddings**: Cohere (embed-english-v3.0)
- **UI Components**: Shadcn/ui, Radix UI, Lucide Icons

## Prerequisites

- Node.js 18+
- npm or yarn
- Qdrant Cloud account or local Qdrant instance
- API Keys:
  - Groq API key
  - Cohere API key
  - Qdrant API key (if using Qdrant Cloud)

## Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd company-ai-agent
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables in `.env`:
```env
# Groq API Configuration
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.3-70b-versatile

# Cohere API Configuration (for embeddings)
COHERE_API_KEY=your_cohere_api_key

# Qdrant Vector Database Configuration
QDRANT_URL=https://your-qdrant-host
QDRANT_API_KEY=your_qdrant_api_key
```

## Setup

### 1. Create Qdrant Collection

Run the collection creation script:

```bash
node src/scripts/createCollection.js
```

Or use the CLI version with inline arguments:

```bash
node src/scripts/createCollectionCli.js --url https://your-qdrant-host --apiKey your_api_key
```

### 2. Index Documents

Start the dev server, which will automatically embed and index company documents on first use:

```bash
npm run dev
```

Make a test request to trigger indexing:

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"hello"}'
```

## Running the Project

### Development Mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # Chat API endpoint
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page
│   └── globals.css               # Global styles
├── components/
│   ├── atoms/                     # Basic UI components (Avatar, Icon, etc.)
│   ├── molecules/                 # Composite components (ChatMessage, etc.)
│   ├── organisms/                 # Complex sections (ChatWindow, Sidebar, etc.)
│   ├── templates/                 # Page templates
│   └── ui/                        # Shadcn/ui components
├── data/
│   └── company.ts                 # Company knowledge base documents
├── hooks/
│   └── useChat.ts                 # Chat functionality hook
├── lib/
│   ├── qdrant.ts                  # Qdrant client initialization
│   ├── vector.ts                  # Vector store wrapper (dynamic routing)
│   ├── vector_qdrant.ts           # Qdrant-backed vector store implementation
│   ├── vector_cohere.ts           # Cohere in-memory vector store (fallback)
│   └── utils.ts                   # Utility functions
├── types/
│   └── index.ts                   # TypeScript type definitions
└── scripts/
    └── createCollection.js        # Qdrant collection setup script
```

## API Endpoints

### POST `/api/chat`

Sends a message and receives an AI response with context from the knowledge base.

**Request:**
```json
{
  "message": "What services does the company offer?"
}
```

**Response:**
```json
{
  "reply": "The company offers..."
}
```

## RAG (Retrieval-Augmented Generation) Architecture

This system implements a production-ready RAG pipeline that combines document retrieval with generative AI:

### How It Works

1. **Retrieval Phase** - User's question is converted to embeddings and semantically searched in Qdrant
2. **Augmentation Phase** - Top 3 matching documents are retrieved and added to the system prompt
3. **Generation Phase** - Groq LLM generates a response using the original question + retrieved context

### RAG Pipeline Flow

```
User Question
    ↓
Cohere Embeddings
    ↓
Qdrant Similarity Search (top 3)
    ↓
Build Augmented Prompt
    ↓
Groq LLM Generation
    ↓
AI Response (grounded in company docs)
```

### Code Implementation

```typescript
// Retrieve similar documents
const results = await vectorStore.similaritySearch(question, 3);

// Build context from retrieved docs
const context = results
  .map((item, i) => `Source ${i + 1}: ${item.content}`)
  .join("\n\n");

// Create augmented system prompt
const systemPrompt = `${COMPANY_KNOWLEDGE_PROMPT}\n\nContext:\n${context}`;

// Generate response grounded in retrieved context
const response = await groq.chat.completions.create({
  messages: [
    { role: "system", content: systemPrompt },
    { role: "user", content: question }
  ]
});
```

### Advantages

✅ **Accurate** - Answers grounded in actual company documents  
✅ **Up-to-date** - Update documents in Qdrant without retraining  
✅ **Verifiable** - Retrieved sources show where answers come from  
✅ **Cost-Effective** - Uses Groq's fast inference (no fine-tuning)  
✅ **Scalable** - Qdrant efficiently handles unlimited documents

## Vector Store Architecture

The project uses a dynamic vector store that automatically selects the implementation based on environment configuration:

- **With Qdrant** (`QDRANT_URL` set): Uses `vector_qdrant.ts` - embeds documents with Cohere and stores in Qdrant
- **Without Qdrant**: Falls back to `vector_cohere.ts` - in-memory embeddings with cosine similarity search

This allows flexible deployment scenarios without code changes.

## Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GROQ_API_KEY` | Yes | Groq API key for LLM inference |
| `GROQ_MODEL` | No | Groq model to use (default: llama-3.3-70b-versatile) |
| `COHERE_API_KEY` | Yes | Cohere API key for embeddings |
| `QDRANT_URL` | No | Qdrant instance URL (enables Qdrant backend) |
| `QDRANT_API_KEY` | No | Qdrant API key |
| `QDRANT_COLLECTION` | No | Qdrant collection name (default: rfz-knowledge) |

## Development

### Running Tests

```bash
npm test
```

### Linting

```bash
npm run lint
```

### Building

```bash
npm run build
```

## Troubleshooting

### "Missing QDRANT_URL" Error
Ensure `QDRANT_URL` is set in `.env` and the dev server is restarted after changes.

### Collection Creation Fails
- Verify Qdrant service is running and accessible
- Check `QDRANT_URL` format (should be `https://...`)
- Ensure `QDRANT_API_KEY` is valid (if required)

### No Search Results
- Verify documents were indexed: check Qdrant Cloud UI
- Ensure `COHERE_API_KEY` is valid
- Try restarting the dev server to trigger re-indexing

## License

MIT
