<div align="center">

# usecerebr v2

### Second Brain for AI Learning

<p align="center">
A personal knowledge graph/second brain that connects ideas across sources like youtube videos, research papers, blogs and articles, X posts/arcticles. 
</p>

<br/>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.14.3-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/FastAPI-Backend-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Next.js-Frontend-black?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Qdrant-VectorDB-red?style=for-the-badge" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/SentenceTransformers-Embeddings-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/RAG-Retrieval%20Augmented%20Generation-yellow?style=for-the-badge" />
  <img src="https://img.shields.io/badge/AI-Knowledge%20Graph-8A2BE2?style=for-the-badge" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/ReactFlow-Graph%20Visualization-149eca?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Storage-JSON%20Local--First-informational?style=for-the-badge" />
  <img src="https://img.shields.io/badge/License-MIT-lightgrey?style=for-the-badge" />
</p>

</div>

---

# 1. Multi-Source Ingestion Pipeline

| Source Type | Ingestion Method |
|---|---|
| YouTube (existing) | URL paste → transcript fetch |
| Research Papers | arXiv API search + manual PDF upload |
| Web Articles | URL paste → scrape via BeautifulSoup/Playwright |
| X Posts | Manual URL paste → fetch via Twitter API |

## Metadata Schema (Unified)

```json
{
    "source_type": "youtube|paper|article|xpost",
    "source_id": "video_id|arxiv_id|url|tweet_id",
    "title": "...",
    "authors": [...],        # for papers
    "url": "...",
    "topics": [...],         # AI-generated tags
    "ingested_at": "timestamp",
    # Source-specific fields:
    "youtube": { "channel": "...", "duration": ... },
    "paper": { "arxiv_id": "...", "categories": [...] },
    "article": { "domain": "...", "author": "..." },
    "xpost": { "username": "...", "likes": ..., "retweets": ... }
}
````

## Qdrant Collection Changes

* Rename yt-transcripts → cerebr-knowledge
* Add topics: ["LLM", "RAG", "Transformers"] field for filtering
* Add multi-tenant support (user_id) for future sharing

---

# 2. Topic Extraction Service

New backend service that runs after ingestion:

1. Extract 3-5 topics per chunk using LLM or keywords
2. Store topics in payload for filtering/graph
3. Re-index existing YouTube chunks with topics (batch job)

---

# 3. Knowledge Graph Visualization

Frontend: React Flow or similar graph library

## Graph Structure

* Nodes: Topics (e.g., "Retrieval-Augmented Generation", "Attention Mechanism")
* Edges: Connection strength based on co-occurrence in same chunks
* Node expansion: Click a topic → shows connected sources (video, paper, article, tweet)

## Interactions

* Drag/zoom pan
* Click node → open chat with that topic as context
* Click source → preview in sidebar
* Filter by source type (toggle visibility)

---

# 4. Chat with Sessions

## Backend

* Session table: id, user_id, title, created_at, updated_at
* Messages table: id, session_id, role, content, tokens_used, sources_retrieved
* API usage per message: { prompt_tokens, completion_tokens, cost }

## Frontend UI

* Sidebar: List of sessions (sorted by recent)
* Create new session / rename / delete
* Session-aware chat (switches context)

---

# 5. Export & Share Chat

## Export formats

* Markdown (with citations)
* JSON (full metadata)
* HTML (rendered)

## Share system

* Generate unique shareable link: cerebr.app/s/{share_id}
* Access levels: view (read-only) | edit (can continue chat)
* Simple token-based auth (no login for MVP)

---

# 6. Detailed Citations

Each source type shows rich metadata in citations:

| Source  | Citation UI                                             |
| ------- | ------------------------------------------------------- |
| YouTube | Video title, channel, timestamp, play button → opens YT |
| Paper   | Title, authors, arXiv ID, year, link to arXiv           |
| Article | Title, domain, author, date, link                       |
| X Post  | Username, date, likes/retweets count, link              |

Clicking citation → opens source or shows in preview panel.

---

# 7. Better Chat UX (Kiboui Components)

Upgrade chat with:

* Message editing (retry)
* Copy button per message
* Source citation cards below each AI response
* Typing indicators
* Markdown rendering with code syntax highlighting
* Voice input (optional)

---

# 8. API Usage Dashboard

## Per-session stats

* Total tokens used (prompt + completion)
* Estimated cost (configurable $ rate per 1M tokens)
* Graph: tokens over time per session
* Compare sessions

## Global stats

* Today's / weekly / monthly usage
* Cost breakdown by source type

---

# Implementation Phases

## Phase 1: Foundation (Weeks 1-2)

* [ ] New Qdrant collection cerebr-knowledge with topic field
* [ ] Topic extraction service (LLM-based)
* [ ] Refactor ingestion to support pluggable sources
* [ ] Add arXiv API + PDF upload
* [ ] Add web article scraping

## Phase 2: X Posts + Graph (Weeks 3-4)

* [ ] X post ingestion (manual URL paste)
* [ ] Re-index existing YouTube with topics
* [ ] Graph visualization component
* [ ] Topic-based filtering in retrieval

## Phase 3: Chat Sessions + Sharing (Weeks 5-6)

* [ ] Session management (create, rename, delete)
* [ ] Message history with source tracking
* [ ] Export chat (MD, JSON, HTML)
* [ ] Share links with view/edit access

## Phase 4: Usage + Polish (Weeks 7-8)

* [ ] API usage logging per message
* [ ] Usage dashboard UI
* [ ] Citation component improvements
* [ ] Kiboui chat components
* [ ] UI/UX polish

---

# Tech Additions

| New Dependency              | Purpose                     |
| --------------------------- | --------------------------- |
| beautifulsoup4 / playwright | Web scraping                |
| arxiv (PyPI)                | arXiv API                   |
| pypdf / pdfplumber          | PDF text extraction         |
| tweepy / snscrape           | X post fetching             |
| react-flow                  | Graph visualization         |
| recharts                    | Usage charts                |
| PostgreSQL (optional)       | Session/message persistence |

---

## Files to Modify / Add

* `apps/rag-pipeline/api/routes/ingest.py` — new unified ingestion endpoint
* `apps/rag-pipeline/api/routes/sessions.py` — session CRUD
* `apps/rag-pipeline/api/routes/share.py` — share links
* `apps/rag-pipeline/api/routes/usage.py` — usage stats
* `apps/rag-pipeline/actions/topic_extractor.py` — new
* `apps/rag-pipeline/actions/sources/` — source-specific handlers
* `apps/web/app/knowledge-graph/` — new page
* `apps/web/app/sessions/` — session management
* `apps/web/app/usage/` — usage dashboard
* `apps/web/components/chat/` — upgraded chat UI
* `packages/ui/graph.tsx` — reusable graph component


# Current v1 of usecerebr

## Knowledge base

The dataset for this project consisted of four YouTube videos provided in the assignment, covering machine learning, neural networks, and transformers. Two videos were in English and two in Hindi.

1. **3Blue1Brown — *But what is a Neural Network?***
   [https://youtube.com/watch?v=aircAruvnKk](https://youtube.com/watch?v=aircAruvnKk)

2. **3Blue1Brown — *Transformers, the tech behind LLMs***
   [https://youtube.com/watch?v=wjZofJX0v4M](https://youtube.com/watch?v=wjZofJX0v4M)

3. **CampusX — *What is Deep Learning?* (Hindi)**
   [https://youtube.com/watch?v=fHF22Wxuyw4](https://youtube.com/watch?v=fHF22Wxuyw4)

4. **CodeWithHarry — *All About Machine Learning & Deep Learning* (Hindi)**
   [https://youtube.com/watch?v=C6YtPJxNULA](https://youtube.com/watch?v=C6YtPJxNULA)

These videos were selected because they explain core machine learning concepts in detail and contain clear educational explanations suitable for building a retrieval-based QA system.

---

## Transcript Extraction

Transcripts were obtained using the **youtube-transcript-api**.

For the English videos, transcript retrieval was straightforward. However, the Hindi videos required additional processing because the transcripts were provided in **pure Hindi Devanagari script**.

To standardize the dataset, the Hindi transcripts were translated into English. Initially, a smaller translation model (`Helsinki-NLP/opus-mt-hi-en`) was tested locally, but the translations were often inaccurate and contained phonetic approximations or garbled outputs.

Therefore, the translation pipeline was replaced with **Google Deep Translate**, which produced significantly more reliable English translations.

### Why Translation Was Necessary

While it would have been possible to embed the Hindi transcripts directly, doing so would introduce a **cross-language retrieval problem**. Most user queries are expected to be in English, and embedding English queries against Hindi text embeddings can reduce semantic similarity performance.

To avoid this mismatch and improve retrieval quality, all transcripts were converted into **English before embedding**, ensuring that both stored documents and user queries exist in the same semantic space.

---

## Chunking Strategy

The transcripts were segmented into smaller chunks before being embedded and stored in the vector database.

This step was necessary because the videos ranged from approximately **15 minutes to 1 hour**, producing very large transcripts. Embedding an entire transcript at once would be inefficient and memory-intensive.

A chunking function was implemented that splits the transcripts based on **word count**, with a chunk size of **approximately 200 words**, which provided a good balance between:

* semantic coherence
* embedding efficiency
* retrieval precision

Each chunk was then individually embedded and inserted into the vector database.

---

## Embedding Model

The embedding model used was:

**all-MiniLM-L6-v2**

This is a lightweight **Sentence Transformer model** that provides strong performance for semantic similarity tasks while remaining computationally efficient.

Each transcript chunk was converted into a vector embedding using this model before being stored in the vector database.

---

## Vector Database

The vector database used in this project was **Qdrant**.

All transcript embeddings were stored in a collection named:

`yt-transcripts`

Each stored vector included a detailed payload containing metadata associated with the transcript segment.

### Payload Structure

```
{
  "payload": {
    "text": chunk["text"],
    "start_time": chunk["start_time"],
    "end_time": chunk["end_time"],
    "video_id": video_id,
    "source": source,
    "original_lang": original_lang,
    "is_translated": is_translated
  }
}
```

Each record also included:

* the **vector embedding**
* a **unique UUID identifier**

This metadata allowed the system to trace answers back to specific videos and timestamps.

---

## Retrieval Process

When a user submits a query:

1. The query text is first converted into an embedding using the same embedding model (`all-MiniLM-L6-v2`).
2. The embedding is used to search the **Qdrant vector database**.
3. The system retrieves the **Top-K most similar transcript chunks** based on cosine similarity.

These retrieved chunks serve as the **context for the language model**.

---

## Language Model for Answer Generation

For generating final responses, the system uses:

**Gemini 2.5 Flash**

The retrieved transcript chunks are provided to the model as context, allowing it to produce a **grounded answer based on the source material**.

This approach ensures that answers are derived from the retrieved content rather than from general model knowledge.

### Some Chats with the bot
![QA1](apps/web/public/qa1.png) 
![QA2](apps/web/public/qa2.png) 
![QA3](apps/web/public/qa3.png) 
![QA4](apps/web/public/qa4.png)
---

## API Layer

The backend is implemented using **FastAPI**.

A single primary endpoint handles queries:

`POST /api/query`

The request body accepts JSON input:

```
{
  "user_query": "..."
}
```

The endpoint performs:

1. Query embedding
2. Vector search in Qdrant
3. Context retrieval
4. LLM answer generation
5. Response formatting with source references

---

## Frontend Interface

The frontend is implemented using **Next.js with shadcn/ui components**.

The interface consists of a simple chat-style screen where:

* Users submit questions
* The RAG assistant generates answers
* Responses include **source citations with timestamps**
* Relevant **YouTube video cards** are displayed below the answer for verification

This allows users to quickly navigate to the exact portion of the source video used to generate the response.


---

## Self-Hosting Rag-Pipeline

You can run the entire backend and Redis stack locally using Docker Compose. No external setup is required — just clone the repo and run a single command.

### 1. Fork and Clone the project

```bash
git clone https://github.com/your-username/rag-systems-lab
cd apps/rag-pipeline
```

### 2. Set up environment variables

Copy the example environment file and edit if necessary:

```bash
cp .env.example .env
```

The `.env` file should include:

```env
PORT=8000
REDIS_HOST=redis
REDIS_PORT=6379
```

> `REDIS_HOST=redis` refers to the Redis service inside Docker Compose.

---

### 3. Run with Docker Compose

```bash
docker compose up --build
```

* The API will be available at `http://localhost:8000`
* Redis runs automatically inside Docker
* No manual installation needed

---

### 4. Access API

Test the query endpoint:

```bash
curl -X POST http://localhost:8000/api/query \
     -H "Content-Type: application/json" \
     -d '{"user_query": "What is a neural network?"}'
```

You should receive a response generated by the RAG pipeline using the embedded YouTube transcripts.

---

### 5. Stopping the stack

```bash
docker compose down
```

This stops both the API and Redis containers and cleans up the network.

---

This ensures that anyone can **self-host your RAG backend** with minimal setup.

