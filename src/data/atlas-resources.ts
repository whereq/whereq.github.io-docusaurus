/**
 * The References shelf — the second collection of the WhereQ Atlas.
 *
 * These pages stand on their own. A reference is written to be read by
 * someone who has never heard of WhereQ: what the thing is, how it works,
 * what is under the hood, and where the primary source lives.
 *
 * Where a reference genuinely connects to a page elsewhere in the Atlas,
 * that link is recorded in `related` — the wiki's "See also". Nothing is
 * linked on the strength of a hunch.
 *
 * Every version number and date here was checked against the project's own
 * documentation at the time of writing.
 */

import {AtlasEntry, AtlasGroup} from './atlas-types';

export const RESOURCE_GROUPS: AtlasGroup[] = [
  {
    id: 'ai',
    title: 'AI & Agents',
    blurb:
      'The protocols and frameworks that let a model call a tool, run on your own machine, and keep its state.',
  },
  {
    id: 'web',
    title: 'Web & Interface',
    blurb:
      'The three layers most of the web is written on: the type system, the library, and the framework that renders it.',
  },
  {
    id: 'data',
    title: 'Data & Streaming',
    blurb:
      'The database of record, the event log that feeds it, the engine that computes over it, and the formats in between.',
  },
  {
    id: 'platform',
    title: 'Platform & Operations',
    blurb:
      'How software is packaged, shipped, scheduled and kept running.',
  },
];

export const RESOURCE_ENTRIES: AtlasEntry[] = [
  {
    id: 'mcp',
    collection: 'resources',
    name: 'Model Context Protocol',
    role: 'The Agent Protocol',
    tagline: 'An open standard for connecting AI applications to tools and data.',
    accent: '#6C8FF5',
    group: 'ai',
    summary:
      'MCP is an open protocol that standardises how an AI application talks to the systems it needs to work with — the tools it can call, the resources it can read, the prompts it can offer. Instead of every assistant and every service inventing a private integration, both ends speak MCP.',
    status: 'Specification 2026-07-28',
    url: 'https://modelcontextprotocol.io',
    capabilities: [
      'One message format — JSON-RPC 2.0 — carried identically over every transport.',
      'Two standard transports: stdio for a local subprocess, Streamable HTTP for a remote server.',
      'Three primitives — tools, resources and prompts — plus an optional discovery call for capabilities.',
      'Tier 1 SDKs for TypeScript, Python, Go and C#, with Rust in beta.',
      'A formal extensions framework, so proposals can mature outside the core.',
    ],
    sections: [
      {
        title: 'What it is',
        blocks: [
          {
            kind: 'paragraph',
            text: 'An assistant that cannot call anything is a text box. MCP is the answer to the awkward half of that sentence: it gives a model a standard way to reach the outside world, and it gives the outside world a standard way to describe what it offers.',
          },
          {
            kind: 'paragraph',
            text: 'The protocol is deliberately small. A server advertises tools (functions a model may call), resources (data a model may read) and prompts (reusable interaction templates). A client discovers them, calls them, and handles the results. Everything else — how the two are connected — is a transport detail.',
          },
        ],
      },
      {
        title: 'How it works',
        blocks: [
          {
            kind: 'paragraph',
            text: 'The 2026-07-28 revision changed the protocol\'s core from a bidirectional, stateful conversation into a stateless request/response one. Every request is self-describing, so any request can land on any instance behind a plain round-robin load balancer, with no shared session store to run.',
          },
          {
            kind: 'paragraph',
            text: 'Two transports carry the messages. On stdio, the client launches the server as a subprocess and exchanges newline-delimited JSON-RPC over its standard streams; the server may log freely to stderr, but stdout must carry nothing but protocol messages. On Streamable HTTP, the server exposes one endpoint that accepts POST, and answers each request with either a JSON object or a Server-Sent Events stream scoped to that request.',
          },
          {
            kind: 'list',
            items: [
              'Every Streamable HTTP request must carry an `MCP-Protocol-Version` header that matches the version in the body\'s `_meta`; a mismatch is rejected with a 400.',
              'The `Mcp-Method` and `Mcp-Name` headers carry the method and tool names, so a gateway can route, rate-limit and authorise without parsing the JSON body.',
              'Server-to-client calls such as sampling and elicitation are now expressed as Multi Round-Trip Requests — the answer is carried back inside a result rather than needing a permanently open stream.',
              'List responses carry cache hints and a deterministic order, so a client can cache a tool catalogue and keep an upstream prompt cache stable across reconnects.',
            ],
          },
        ],
      },
      {
        title: 'Under the hood',
        blocks: [
          {
            kind: 'table',
            head: ['Piece', 'What it is'],
            rows: [
              ['Wire format', 'JSON-RPC 2.0, UTF-8 encoded'],
              ['Transports', 'stdio (subprocess) and Streamable HTTP (single endpoint, POST)'],
              ['Primitives', 'Tools, resources and prompts'],
              ['Discovery', 'server/discover RPC, optional — every request is self-describing'],
              ['Extensions', 'A formal framework; Tasks live in io.modelcontextprotocol/tasks'],
              ['SDKs', 'Tier 1: TypeScript, Python, Go, C# — Rust in beta'],
              ['Lifecycle', 'Roots, Sampling and Logging are deprecated, with a twelve-month off-ramp'],
            ],
          },
        ],
      },
      {
        title: 'Where to read more',
        blocks: [
          {
            kind: 'links',
            items: [
              {
                label: 'The 2026-07-28 specification',
                href: 'https://modelcontextprotocol.io/specification/2026-07-28',
                external: true,
              },
              {
                label: 'The release announcement',
                href: 'https://blog.modelcontextprotocol.io/posts/2026-07-28/',
                external: true,
              },
            ],
          },
        ],
      },
    ],
    related: ['whereq-cloud', 'langchain', 'ollama'],
  },

  {
    id: 'ollama',
    collection: 'resources',
    name: 'Ollama',
    role: 'The Local Model Runner',
    tagline: 'Run a large language model on your own machine, behind one HTTP API.',
    accent: '#9CA3AF',
    group: 'ai',
    summary:
      'Ollama packages a model, its weights and the runtime that serves it into one downloadable unit, and exposes it over HTTP. `ollama pull` fetches a model, `ollama run` talks to it, and an application calls the same API whether the model is running on your laptop or in Ollama\'s cloud.',
    status: 'v0.12.6',
    url: 'https://ollama.com',
    capabilities: [
      'One command to fetch and run a model — `ollama pull`, then `ollama run`.',
      'A local HTTP API on port 11434, with `/api/generate` and `/api/chat` endpoints.',
      'An OpenAI-compatible surface at `/v1`, so existing clients need almost no changes.',
      'Cloud models alongside local ones, behind the same endpoints.',
      'Model management — pull, list, copy and delete — through the same API.',
    ],
    sections: [
      {
        title: 'What it is',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Ollama removes the two chores that make running a model on your own machine annoying: the dependency graph and the serving layer. You install one binary, name a model, and it is running.',
          },
          {
            kind: 'paragraph',
            text: 'The model library is a registry of tagged builds — `llama3.2`, `mistral`, `gemma4` and so on — each of which bundles the weights with everything needed to run them. That is what makes the same call work against a local server and against Ollama\'s hosted models.',
          },
        ],
      },
      {
        title: 'How it works',
        blocks: [
          {
            kind: 'paragraph',
            text: 'The local server binds to 127.0.0.1 on port 11434 by default; `OLLAMA_HOST` moves it. Requests are ordinary HTTP and JSON, and the API is deliberately not versioned — it is expected to stay backwards compatible instead.',
          },
          {
            kind: 'list',
            items: [
              '`/api/generate` and `/api/chat` are the Ollama-native endpoints; `/v1` is the OpenAI-compatible surface, and an Anthropic client can point its base URL at the same server.',
              'Cloud requests need an API key; local requests do not — the same code can fall through to a local model when the network is gone.',
              'The server can be run as a container, which is the usual way to reach it from another machine.',
              'A model can be preloaded by sending an empty request, so the first real prompt does not pay for the load.',
            ],
          },
        ],
      },
      {
        title: 'Under the hood',
        blocks: [
          {
            kind: 'table',
            head: ['Piece', 'What it is'],
            rows: [
              ['Default endpoint', 'http://localhost:11434 — bound to loopback unless OLLAMA_HOST says otherwise'],
              ['Native API', '/api/generate, /api/chat, /api/version, /api/tags'],
              ['Compatible API', '/v1 — OpenAI-shaped; an Anthropic client can use the same base URL'],
              ['Versioning', 'Not strictly versioned; stability is the contract'],
              ['Hosting', 'Local server, or the same container image on another host'],
            ],
          },
        ],
      },
      {
        title: 'Where to read more',
        blocks: [
          {
            kind: 'links',
            items: [
              {
                label: 'The API reference',
                href: 'https://docs.ollama.com/api/introduction',
                external: true,
              },
              {
                label: 'Ollama — architecture and conversation processing',
                href: '/blog/AI-LLM-Tool-Ollama-Architecture-and-Conversation-Processing-Flow-Analysis',
                external: false,
              },
            ],
          },
        ],
      },
    ],
    related: ['langchain', 'mcp', 'catobigato'],
  },

  {
    id: 'langchain',
    collection: 'resources',
    name: 'LangChain & LangGraph',
    role: 'The Agent Framework',
    tagline: 'The standard way to build something that reasons, calls tools and remembers.',
    accent: '#12A594',
    group: 'ai',
    summary:
      'LangChain is a framework for building LLM applications; LangGraph is the runtime underneath it, for anything that needs state, branching or recovery. Start with `create_agent` for the common case and drop to LangGraph when you want to control the graph yourself.',
    status: 'langchain 1.5.0',
    url: 'https://docs.langchain.com',
    capabilities: [
      '`create_agent` — the standard entry point, built on LangGraph.',
      'Persistence — conversations checkpoint and survive across sessions.',
      'Streaming of tokens, tool calls and reasoning traces in real time.',
      'Human-in-the-loop — pause an agent for approval before a sensitive action.',
      'Time travel — rewind a conversation and explore an alternate path.',
      'Middleware for model routing, retries, summarisation and policy.',
    ],
    sections: [
      {
        title: 'What it is',
        blocks: [
          {
            kind: 'paragraph',
            text: 'An agent is a loop: think, choose a tool, run it, feed the result back, decide again. LangChain is the set of building blocks for that loop, and LangGraph is the engine that runs it — a graph of nodes with explicit edges, where every step can be checkpointed, retried or interrupted.',
          },
          {
            kind: 'paragraph',
            text: 'The v1 line deliberately narrowed the surface. `create_agent` is now the standard way to build an agent, and it replaces the older prebuilt React agent; the long tail of legacy functionality moved into `langchain-classic` rather than being deleted.',
          },
        ],
      },
      {
        title: 'How it works',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Because `create_agent` runs on LangGraph, an agent gets persistence, streaming, human-in-the-loop and time travel without any extra wiring. A conversation is checkpointed as it goes, so a restart resumes where it left off and a human can approve a step before it happens.',
          },
          {
            kind: 'list',
            items: [
              'LangChain 1.5 adds decision models and decision-driven middleware — typed, probabilistic answers about text, messages and structured state.',
              'Model routing middleware selects a model per run from the configured choices.',
              'LangGraph 1.2 adds per-node timeouts, a `DeltaChannel` that stores only the incremental change per step, and a content-block streaming protocol with typed per-channel projections.',
              'Python 3.11 is the floor: LangChain 1.5 and langchain-core 1.8 dropped Python 3.10.',
            ],
          },
        ],
      },
      {
        title: 'Under the hood',
        blocks: [
          {
            kind: 'table',
            head: ['Piece', 'What it is'],
            rows: [
              ['langchain', '1.5.0 — the agent framework and its middleware'],
              ['langchain-core', '1.8 — the primitives shared across the ecosystem'],
              ['langgraph', '1.2.0 — the graph runtime, checkpoints and streaming'],
              ['Agent entry point', 'create_agent, replacing langgraph.prebuilt.create_react_agent'],
              ['Streaming', 'version="v3" — typed projections for values, messages, lifecycle and subgraphs'],
              ['Minimum Python', '3.11'],
            ],
          },
        ],
      },
      {
        title: 'Where to read more',
        blocks: [
          {
            kind: 'links',
            items: [
              {
                label: 'The documentation',
                href: 'https://docs.langchain.com',
                external: true,
              },
              {
                label: 'LangChain and LangGraph — the deep dive',
                href: '/blog/LangChain-and-LangGraph',
                external: false,
              },
              {
                label: 'WhereQ-GPT with LangGraph and LangChain',
                href: '/blog/WhereQ-GPT-with-LangGraph-and-LangChain',
                external: false,
              },
            ],
          },
        ],
      },
    ],
    related: ['mcp', 'ollama', 'whereq-cloud'],
  },

  {
    id: 'react',
    collection: 'resources',
    name: 'React',
    role: 'The UI Library',
    tagline: 'The library most of the web is written in.',
    accent: '#61DAFB',
    group: 'web',
    summary:
      'React is a library for building user interfaces out of components. You describe what the screen should look like for a given state; React works out which parts of the tree actually changed and touches only those in the DOM.',
    status: 'v19.3.1',
    url: 'https://react.dev',
    capabilities: [
      'Components — functions that return markup, composed rather than inherited.',
      'Hooks — state and effects as ordinary functions you can call.',
      'Reconciliation — the element tree is diffed and the DOM updated minimally.',
      'View Transitions and Fragment Refs, stable as of React 19.3.',
      'Server Components — a server can render a component without shipping its code to the browser.',
    ],
    sections: [
      {
        title: 'What it is',
        blocks: [
          {
            kind: 'paragraph',
            text: 'React treats the screen as a function of state. Change the state, and the description of what should be on screen changes with it. The work React does is working out the difference between the old description and the new one.',
          },
          {
            kind: 'paragraph',
            text: 'The model has held up for more than a decade, which is why it became the default. The interesting work since has moved to the edges: rendering on the server, transitions between states, and how a ref points at a particular thing rather than to a position in a list.',
          },
        ],
      },
      {
        title: 'How it works',
        blocks: [
          {
            kind: 'paragraph',
            text: 'When state changes, React re-runs the component, produces a new element tree, and diffs it against the previous one. The diff is structural — same type in the same position means update, different type means replace — and it is the reason a list keyed badly will re-create DOM nodes it did not need to.',
          },
          {
            kind: 'list',
            items: [
              'React 19.3 made View Transitions and Fragment Refs stable, both of which had been experimental for a year.',
              'Server Components move a component\'s rendering to the server, so its code never reaches the browser bundle.',
              'The current major is React 19; React Native 0.88 moved to React 19.3.',
            ],
          },
        ],
      },
      {
        title: 'Under the hood',
        blocks: [
          {
            kind: 'table',
            head: ['Piece', 'What it is'],
            rows: [
              ['Current release', '19.3.1 — released October 14, 2026'],
              ['Stable in 19.3', 'View Transitions and Fragment Refs'],
              ['Rendering model', 'A tree of elements, reconciled against the previous tree'],
              ['Server Components', 'Render on the server; the component code is not shipped to the client'],
              ['Ecosystem', 'React Native, and the build tooling (Vite, Next.js, Docusaurus) around it'],
            ],
          },
        ],
      },
      {
        title: 'Where to read more',
        blocks: [
          {
            kind: 'links',
            items: [
              {
                label: 'The documentation',
                href: 'https://react.dev',
                external: true,
              },
              {
                label: 'Component communication in React — a comprehensive guide',
                href: '/blog/Component-Communication-in-React-A-Comprehensive-Guide',
                external: false,
              },
              {
                label: 'Best practices for local storage handling in React',
                href: '/blog/Best-Practices-for-Local-Storage-Handling-in-ReactJS',
                external: false,
              },
            ],
          },
        ],
      },
    ],
    related: ['docusaurus', 'typescript', 'whereq-hub', 'whereq-ca'],
  },

  {
    id: 'docusaurus',
    collection: 'resources',
    name: 'Docusaurus',
    role: 'The Docs Engine',
    tagline: 'A React framework that turns Markdown into a documentation site.',
    accent: '#3ECC5F',
    group: 'web',
    summary:
      'Docusaurus reads Markdown and MDX, turns them into React pages, and ships them as a static site. It adds the things a documentation site needs and a blog does not: versioned docs, a sidebar, MDX components, and a plugin API that the search, the sitemap and the redirects all plug into.',
    status: 'v3.10.2',
    url: 'https://docusaurus.io',
    capabilities: [
      'Docs, blog and standalone pages in one site.',
      'MDX, so a page can use components wherever Markdown would have been.',
      'Versioned documentation — the file for v1.2 and the file for v2.0 live side by side.',
      'A plugin API: search, sitemap, redirects and the theme are all plugins.',
      'Swizzling, for replacing a theme component with your own.',
      'Docusaurus Faster — a faster build, stable as of 3.10.',
    ],
    sections: [
      {
        title: 'What it is',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Docusaurus is the framework this site runs on. It was built at Meta for documentation, and it kept the parts that documentation actually needs: a sidebar that tracks the file tree, a version dropdown that keeps old versions readable, and MDX so a page can do things Markdown cannot.',
          },
          {
            kind: 'paragraph',
            text: 'The build is a normal static build — every route is rendered to HTML at build time — but the authoring experience is a React one, because pages are components and MDX lets a page import them.',
          },
        ],
      },
      {
        title: 'How it works',
        blocks: [
          {
            kind: 'paragraph',
            text: 'The content plugin owns the routes; everything else is a plugin that can add to them. That is why search, the sitemap, the client-side redirects and the theme are all the same kind of thing, and why a custom page under `src/pages` sits alongside a doc page without special treatment.',
          },
          {
            kind: 'list',
            items: [
              'Docusaurus 3.10 is the last release of the v3.x line; it exists to prepare for v4.',
              'The monorepo moved to React 19, and React 18 support is dropped in v4.',
              '`future.v4` flags let a site opt into the v4 breaking changes early — namespaced local storage, Faster on by default, and MDX 1 compatibility off by default.',
              'Newly initialised sites are created with TypeScript 6.0.',
            ],
          },
        ],
      },
      {
        title: 'Under the hood',
        blocks: [
          {
            kind: 'table',
            head: ['Piece', 'What it is'],
            rows: [
              ['Current release', '3.10.2 — released July 10, 2026'],
              ['Line', '3.10 (April 7, 2026) is the last v3.x release; v4 is next'],
              ['Content', 'Markdown and MDX, versioned, with an autogenerated or manual sidebar'],
              ['Extensibility', 'A plugin API, plus theme swizzling for component-level changes'],
              ['Performance', 'Docusaurus Faster — stable in 3.10'],
              ['React', 'React 19 in the monorepo; React 18 dropped in v4'],
            ],
          },
        ],
      },
      {
        title: 'Where to read more',
        blocks: [
          {
            kind: 'links',
            items: [
              {
                label: 'The documentation',
                href: 'https://docusaurus.io/docs',
                external: true,
              },
              {
                label: 'The 3.10 release notes',
                href: 'https://docusaurus.io/blog/releases/3.10',
                external: true,
              },
            ],
          },
        ],
      },
    ],
    related: ['react', 'typescript', 'whereq-hub', 'whereq-ca'],
  },

  {
    id: 'typescript',
    collection: 'resources',
    name: 'TypeScript',
    role: 'The Type System',
    tagline: 'JavaScript with types — and, since 7.0, a native compiler.',
    accent: '#3178C6',
    group: 'web',
    summary:
      'TypeScript is JavaScript plus a static type system that runs before your code does. The compiler erases the types and emits plain JavaScript, so nothing about the runtime changes — but a large class of mistakes becomes a compile error instead of a 3 a.m. incident.',
    status: 'v7.0.2',
    url: 'https://www.typescriptlang.org',
    capabilities: [
      'Structural typing — shapes, not names, so the type follows the data.',
      'Inference from context, so the common case needs no annotation at all.',
      'Declaration files, so a library can ship its own types.',
      'Gradual adoption — a `.js` file can be renamed `.ts` one at a time.',
      'A native compiler — TypeScript 7 is a Go port, roughly ten times faster.',
    ],
    sections: [
      {
        title: 'What it is',
        blocks: [
          {
            kind: 'paragraph',
            text: 'The point of a type system is not to describe what the code does. It is to make the set of things the code can do explicit, so a mistake is caught by a program that never runs the code at all.',
          },
          {
            kind: 'paragraph',
            text: 'TypeScript does that without asking you to change how JavaScript works. Types are erased at compile time, the output is ordinary JavaScript, and every tool that already understands JavaScript still understands the result.',
          },
        ],
      },
      {
        title: 'How it works',
        blocks: [
          {
            kind: 'paragraph',
            text: 'The compiler walks the program, assigns a type to every expression, and reports the ones that cannot be reconciled. Because the type system is structural, two types match when their shapes match — which is why a plain object literal is often accepted where a class instance was expected, and why an interface is a description rather than a constructor.',
          },
          {
            kind: 'list',
            items: [
              'TypeScript 6.0 was released in March 2026, and TypeScript 7.0 followed in July — a native Go port, roughly ten times faster on large projects.',
              'TypeScript 7.0.2 is the current release; 7.1 is in beta.',
              'Declaration files (`.d.ts`) let a library publish its own types, so consumers get the same checking without writing anything.',
            ],
          },
        ],
      },
      {
        title: 'Under the hood',
        blocks: [
          {
            kind: 'table',
            head: ['Piece', 'What it is'],
            rows: [
              ['Current release', '7.0.2 — released August 20, 2026'],
              ['7.0', 'The native Go port, announced July 8, 2026 — about 10x faster'],
              ['Compiler output', 'Plain JavaScript; the types are erased'],
              ['Type system', 'Structural — types match on shape, not on name'],
              ['Adoption', 'Gradual — check one file at a time'],
            ],
          },
        ],
      },
      {
        title: 'Where to read more',
        blocks: [
          {
            kind: 'links',
            items: [
              {
                label: 'The handbook',
                href: 'https://www.typescriptlang.org/docs/handbook/intro.html',
                external: true,
              },
              {
                label: 'Announcing TypeScript 7.0',
                href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/',
                external: true,
              },
              {
                label: 'TypeScript — interface vs class vs type',
                href: '/blog/Typescript-interface-vs-class-vs-type',
                external: false,
              },
            ],
          },
        ],
      },
    ],
    related: ['react', 'docusaurus', 'whereq-hub', 'whereq-cloud'],
  },

  {
    id: 'postgresql',
    collection: 'resources',
    name: 'PostgreSQL',
    role: 'The Database',
    tagline: 'The relational database that most of the world runs on.',
    accent: '#4169E1',
    group: 'data',
    summary:
      'PostgreSQL is an open source relational database — the system of record for most applications that need transactions, constraints and a query planner. It is the default answer when "the data must not be wrong" is a requirement rather than a hope.',
    status: 'PostgreSQL 19',
    url: 'https://www.postgresql.org',
    capabilities: [
      'Full ACID transactions.',
      'MVCC — readers never block writers, and writers never block readers.',
      'A cost-based query planner, with statistics it keeps up to date itself.',
      'Row-level security, so a database can enforce tenancy on its own.',
      'Extensions — PostGIS for geography, pgvector for embeddings.',
    ],
    sections: [
      {
        title: 'What it is',
        blocks: [
          {
            kind: 'paragraph',
            text: 'PostgreSQL is what "a database" means when someone says it without qualifying. It is a full relational system with transactions, foreign keys, check constraints, views and a planner that will rewrite your query if it thinks it can do better.',
          },
          {
            kind: 'paragraph',
            text: 'The extensions are what turned it from a good default into an unusually capable one. PostGIS makes it a spatial database; pgvector makes it a vector store; the JSON operators make it a document store that still keeps its constraints.',
          },
        ],
      },
      {
        title: 'How it works',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Every update rewrites the row, and every old version stays visible to readers until no one needs it. That is MVCC, and it is why a reporting query does not block the write that is landing next to it — and why the vacuum process exists to clean up what nobody reads any more.',
          },
          {
            kind: 'list',
            items: [
              'PostgreSQL 19 was released on November 19, 2026.',
              'PostgreSQL 18, released September 2025, added an asynchronous I/O subsystem, `uuidv7()`, skip-scan B-tree lookups, virtual generated columns by default, OAuth authentication, and `OLD`/`NEW` in `RETURNING`.',
              'MD5 password authentication is deprecated as of 18, and will be removed in a future major release.',
            ],
          },
        ],
      },
      {
        title: 'Under the hood',
        blocks: [
          {
            kind: 'table',
            head: ['Piece', 'What it is'],
            rows: [
              ['Current major', 'PostgreSQL 19 — released November 19, 2026'],
              ['Concurrency', 'MVCC with snapshot isolation per transaction'],
              ['Durability', 'Write-ahead logging; the log is the source of truth for recovery'],
              ['Type system', 'Rich types, including arrays, ranges, JSON and the geometric types'],
              ['Extensions', 'PostGIS, pgvector and thousands more on the extension registry'],
            ],
          },
        ],
      },
      {
        title: 'Where to read more',
        blocks: [
          {
            kind: 'links',
            items: [
              {
                label: 'The documentation',
                href: 'https://www.postgresql.org/docs/current/',
                external: true,
              },
              {
                label: 'Data integrity and consistency in databases',
                href: '/blog/Data-Integrity-and-Consistency-in-Databases',
                external: false,
              },
              {
                label: 'Best practices of deploying PostgreSQL in Kubernetes',
                href: '/blog/Best-Practices-of-Deploying-PostgreSQL-in-Kubernetes',
                external: false,
              },
            ],
          },
        ],
      },
    ],
    related: ['whereq-cloud', 'caijing', 'kafka', 'spark'],
  },

  {
    id: 'kafka',
    collection: 'resources',
    name: 'Apache Kafka',
    role: 'The Event Log',
    tagline: 'A distributed, append-only log that every service can read from.',
    accent: '#E4572E',
    group: 'data',
    summary:
      'Kafka is a distributed event log. Producers append records to topics; consumers read them independently, each keeping its own position. That single idea is why it became the default transport between services — it decouples producers from consumers in time as well as in code.',
    status: 'v4.4.0',
    url: 'https://kafka.apache.org',
    capabilities: [
      'Partitions — the unit of both parallelism and ordering.',
      'Consumer groups, so a set of consumers shares the work of a topic.',
      'Replication across brokers, tracked by the in-sync replica set.',
      'KRaft consensus — since 4.0 there is no ZooKeeper, and the metadata quorum is part of Kafka itself.',
      'Exactly-once transactions, with read-process-write semantics.',
    ],
    sections: [
      {
        title: 'What it is',
        blocks: [
          {
            kind: 'paragraph',
            text: 'A queue moves a message from a producer to a consumer. A log keeps the message, in order, for as long as you like, and lets every consumer decide for itself where to read. That difference is the whole design, and it is what lets you replay history, add a new consumer without touching the old one, and decouple the pace of production from the pace of consumption.',
          },
        ],
      },
      {
        title: 'How it works',
        blocks: [
          {
            kind: 'paragraph',
            text: 'A topic is split into partitions, and a partition is an ordered sequence. Each consumer group owns every partition of a topic, so adding consumers to a group divides the work, while adding a new group multiplies it. Ordering is guaranteed within a partition and only within a partition.',
          },
          {
            kind: 'list',
            items: [
              'Kafka 4.4.0 was released on October 22, 2026.',
              'Kafka 4.0, in March 2025, removed ZooKeeper mode entirely and made KRaft the default — the metadata quorum lives in the cluster rather than in a separate ensemble.',
              'KIP-848\'s new consumer group protocol reached general availability in 4.0, moving rebalance complexity into the broker\'s group coordinator.',
              'Clients and Kafka Streams require Java 11; brokers, Connect and the tools require Java 17.',
            ],
          },
        ],
      },
      {
        title: 'Under the hood',
        blocks: [
          {
            kind: 'table',
            head: ['Piece', 'What it is'],
            rows: [
              ['Current release', '4.4.0 — released October 22, 2026'],
              ['Metadata', 'KRaft — a Raft-based quorum built into Kafka since 4.0'],
              ['Unit of work', 'A partition of a topic; ordered within a partition'],
              ['Replication', 'Leader plus followers, tracked by the in-sync replica set'],
              ['Exactly-once', 'Transactional producers and consumers, for read-process-write'],
              ['Java', '11 for clients and Streams, 17 for brokers, Connect and tools'],
            ],
          },
        ],
      },
      {
        title: 'Where to read more',
        blocks: [
          {
            kind: 'links',
            items: [
              {
                label: 'The documentation',
                href: 'https://kafka.apache.org/documentation/',
                external: true,
              },
              {
                label: 'Kafka producer tuning guide',
                href: '/blog/Kafka-Producer-Tuning-Guide',
                external: false,
              },
              {
                label: 'Kafka transactions',
                href: '/blog/Kafka-Transaction',
                external: false,
              },
            ],
          },
        ],
      },
    ],
    related: ['whereq-cloud', 'spark', 'avro-parquet', 'kubernetes'],
  },

  {
    id: 'spark',
    collection: 'resources',
    name: 'Apache Spark',
    role: 'The Compute Engine',
    tagline: 'The engine for computing over data too large to fit on one machine.',
    accent: '#E25A1C',
    group: 'data',
    summary:
      'Spark is a cluster computing framework for large-scale data processing. You describe a job as a sequence of transformations over a DataFrame, and the engine works out how to split it across a cluster, shuffle the data between stages, and recover when a worker disappears.',
    status: 'v4.3.0',
    url: 'https://spark.apache.org',
    capabilities: [
      'The DataFrame API — SQL-shaped operations over distributed data.',
      'The Catalyst optimizer and the Tungsten execution engine.',
      'Structured Streaming — the same API over a continuous stream.',
      'Connectors for Parquet, ORC, Avro, JDBC, Kafka and Delta Lake.',
      'Runs on Kubernetes, YARN and standalone clusters.',
    ],
    sections: [
      {
        title: 'What it is',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Spark began as a way to do MapReduce-style computation in memory instead of writing every intermediate result to disk. It has since grown into a general query engine with a SQL front end, a streaming subsystem and a machine-learning library, all sharing one execution core.',
          },
        ],
      },
      {
        title: 'How it works',
        blocks: [
          {
            kind: 'paragraph',
            text: 'You write transformations; the engine writes the job. Catalyst pushes filters and projections down into the source, the Tungsten engine compiles whole stages into generated code, and the scheduler inserts shuffle boundaries where data has to be redistributed between partitions.',
          },
          {
            kind: 'list',
            items: [
              'Spark 4.3.0 was released on October 30, 2026.',
              'The 3.5 line is still maintained — 3.5.10 shipped on November 22, 2026 — so a large installed base is not stranded.',
              'Structured Streaming treats a stream as a continuous table, which is why the batch and streaming APIs are the same.',
            ],
          },
        ],
      },
      {
        title: 'Under the hood',
        blocks: [
          {
            kind: 'table',
            head: ['Piece', 'What it is'],
            rows: [
              ['Current release', '4.3.0 — released October 30, 2026'],
              ['Optimizer', 'Catalyst — rule-based, with cost-based selection'],
              ['Execution', 'Tungsten — whole-stage compilation and managed memory'],
              ['APIs', 'DataFrame, SQL, Structured Streaming and the ML library'],
              ['Cluster managers', 'Kubernetes, YARN, standalone and local'],
            ],
          },
        ],
      },
      {
        title: 'Where to read more',
        blocks: [
          {
            kind: 'links',
            items: [
              {
                label: 'The documentation',
                href: 'https://spark.apache.org/docs/latest/',
                external: true,
              },
              {
                label: 'Avro to Parquet pipeline in big data applications',
                href: '/blog/Avro-to-Parquet-Pipeline-in-Big-Data-Applications',
                external: false,
              },
            ],
          },
        ],
      },
    ],
    related: ['kafka', 'avro-parquet', 'postgresql', 'kubernetes'],
  },

  {
    id: 'avro-parquet',
    collection: 'resources',
    name: 'Avro & Parquet',
    role: 'The Storage Formats',
    tagline: 'Two file formats that disagree about how data should be laid out — and why that matters.',
    accent: '#7C3AED',
    group: 'data',
    summary:
      'Avro and Parquet are both binary file formats, and they are built for opposite jobs. Avro stores records row by row and is built for writing. Parquet stores values column by column and is built for reading. Nearly every mistake with one of them is really a mistake about which side of that trade-off you are on.',
    status: 'Apache top-level projects',
    url: 'https://parquet.apache.org',
    capabilities: [
      'Parquet — columnar, so a query touching three of two hundred columns reads three.',
      'Parquet footer statistics — minimum, maximum and null counts per column chunk.',
      'Page indexes and predicate pushdown, so whole row groups can be skipped entirely.',
      'Avro — the schema travels with the data, as JSON.',
      'Avro schema resolution — explicit writer/reader rules for forward and backward compatibility.',
    ],
    sections: [
      {
        title: 'What it is',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Parquet was created at Twitter and Cloudera and is now the default file format of the lakehouse ecosystem — Iceberg, Delta Lake and Hudi all assume it. It stores values column by column, which means the bytes of a column sit next to each other and can be compressed together.',
          },
          {
            kind: 'paragraph',
            text: 'Avro is the other way round. It stores records one at a time, with the schema embedded as JSON, and it was designed around a different problem: a stream of events whose producers and consumers evolve independently.',
          },
        ],
      },
      {
        title: 'How it works',
        blocks: [
          {
            kind: 'paragraph',
            text: 'The practical consequence of the layout difference is projection pushdown. A query that needs three columns out of two hundred reads three columns of bytes, not two hundred columns of rows — and because Parquet also keeps per-column-chunk statistics in its footer, an engine can skip whole row groups that cannot match a filter.',
          },
          {
            kind: 'list',
            items: [
              'Columnar writes are the weak side of Parquet: appending one record means touching every column buffer, so writers batch into row groups and small frequent appends are poor.',
              'Avro handles small appends well and has explicit rules for resolving a writer\'s schema against a reader\'s schema — defaults and type promotions included.',
              'Both formats store their schema with the data and both support per-column compression codecs.',
              'Parquet added a typed `Variant` representation for heterogeneous values, introduced in August 2025 and documented by Apache in February 2026.',
            ],
          },
        ],
      },
      {
        title: 'Under the hood',
        blocks: [
          {
            kind: 'table',
            head: ['', 'Parquet', 'Avro'],
            rows: [
              ['Layout', 'Columnar', 'Row-oriented'],
              ['Built for', 'Reading — analytical queries', 'Writing — events and records'],
              ['Schema', 'In the file, as Thrift', 'In the file, as JSON'],
              ['Column pruning', 'Yes — projection and predicate pushdown', 'No'],
              ['Schema evolution', 'Limited on its own; a table format manages it', 'Strong, rule-based writer/reader resolution'],
              ['Small appends', 'Poor', 'Good'],
              ['Typical home', 'The analytical warehouse', 'Kafka payloads and the landing zone'],
            ],
          },
        ],
      },
      {
        title: 'Where to read more',
        blocks: [
          {
            kind: 'links',
            items: [
              {
                label: 'The Parquet site',
                href: 'https://parquet.apache.org',
                external: true,
              },
              {
                label: 'The Avro site',
                href: 'https://avro.apache.org',
                external: true,
              },
              {
                label: 'Deep dive into Avro and Parquet formats',
                href: '/blog/Deep-Dive-into-Avro-and-Parquet-Formats',
                external: false,
              },
            ],
          },
        ],
      },
    ],
    related: ['kafka', 'spark', 'postgresql', 'whereq-cloud'],
  },

  {
    id: 'docker',
    collection: 'resources',
    name: 'Docker',
    role: 'The Container Runtime',
    tagline: 'The packaging format almost every service now ships in.',
    accent: '#2496ED',
    group: 'platform',
    summary:
      'Docker put a filesystem, a process and its dependencies into a single image, and gave that image a standard way to run anywhere. An image is built once and behaves the same on a laptop, a CI runner and a production host — which is the part that actually changed how software ships.',
    status: 'BuildKit by default',
    url: 'https://docs.docker.com',
    capabilities: [
      'A Dockerfile — a declarative recipe for an image.',
      'BuildKit, the default builder since the legacy path was deprecated.',
      'Buildx — builders that can run as a container, in Kubernetes, or on a remote daemon.',
      'Layer caching — only the layers that changed are rebuilt.',
      'OCI images — the format Docker images are written in, and the one other runtimes read.',
    ],
    sections: [
      {
        title: 'What it is',
        blocks: [
          {
            kind: 'paragraph',
            text: 'An image is a filesystem plus the metadata needed to run it. A container is that filesystem mounted, with a process started inside it and a handful of kernel features — namespaces, cgroups, capability dropping — keeping it from touching anything it should not.',
          },
          {
            kind: 'paragraph',
            text: 'The value was never the packaging format on its own. It was that the packaging format became a contract: the thing that runs in CI is the thing that runs in production, byte for byte.',
          },
        ],
      },
      {
        title: 'How it works',
        blocks: [
          {
            kind: 'paragraph',
            text: 'A build is a sequence of layers, each one a diff. The cache is the diff chain, so a build only re-runs the steps after the last thing that changed. BuildKit parallelised that, added better cache control, and made the build itself able to run somewhere other than your machine.',
          },
          {
            kind: 'list',
            items: [
              'BuildKit is the default builder for Docker Desktop and Docker Engine; `docker build` uses Buildx unless you are in Windows container mode or set `DOCKER_BUILDKIT=0`.',
              'With BuildKit only the files your build actually uses are transmitted, and leading `../` paths are stripped rather than followed.',
              'Buildx exposes four drivers: `docker` (the bundled library), `docker-container`, `kubernetes`, and `remote`.',
              'Windows container support is the one place the legacy builder is still used, because BuildKit\'s Windows support is still experimental.',
            ],
          },
        ],
      },
      {
        title: 'Under the hood',
        blocks: [
          {
            kind: 'table',
            head: ['Piece', 'What it is'],
            rows: [
              ['Builder', 'BuildKit — the default; the legacy builder is deprecated'],
              ['Driver', 'Buildx — docker, docker-container, kubernetes, remote'],
              ['Image format', 'OCI — read by Docker, containerd and other runtimes'],
              ['Isolation', 'Namespaces, cgroups and dropped capabilities'],
              ['Caching', 'Per-layer; only the steps after the last change re-run'],
            ],
          },
        ],
      },
      {
        title: 'Where to read more',
        blocks: [
          {
            kind: 'links',
            items: [
              {
                label: 'The Docker documentation',
                href: 'https://docs.docker.com',
                external: true,
              },
              {
                label: 'Best practices for writing Dockerfiles',
                href: '/blog/Best-Practices-for-Writing-Dockerfiles',
                external: false,
              },
              {
                label: 'Best practices of using Docker in application development',
                href: '/blog/Best-Practices-of-Using-Docker-in-Application-Development',
                external: false,
              },
            ],
          },
        ],
      },
    ],
    related: ['kubernetes', 'whereq-cloud'],
  },

  {
    id: 'kubernetes',
    collection: 'resources',
    name: 'Kubernetes',
    role: 'The Orchestrator',
    tagline: 'The scheduler that keeps a fleet of containers running where they belong.',
    accent: '#326CE5',
    group: 'platform',
    summary:
      'Kubernetes takes a description of what should be running and makes it so. You declare a Deployment, a StatefulSet or a Job; the control plane works out where to put it, keeps it running, replaces it when it dies, and rolls out changes when you ask it to.',
    status: 'v1.37.x',
    url: 'https://kubernetes.io',
    capabilities: [
      'Declarative desired state — you declare what should exist, not how to create it.',
      'A control plane whose controllers continuously reconcile actual state against desired state.',
      'A scheduler that places workloads by resource requests and constraints.',
      'Rolling updates with health checks and automatic rollback.',
      'CRDs — extend the API with your own kinds.',
    ],
    sections: [
      {
        title: 'What it is',
        blocks: [
          {
            kind: 'paragraph',
            text: 'The idea that makes Kubernetes work is the reconcile loop. You state what should be true; a controller observes what is true, computes the difference, and acts. It is a loop, not a procedure, so it does not need to run once, in order, or perfectly.',
          },
          {
            kind: 'paragraph',
            text: 'Everything else — the scheduler, the self-healing, the rolling update, the service discovery — falls out of that loop applied to different kinds of object.',
          },
        ],
      },
      {
        title: 'How it works',
        blocks: [
          {
            kind: 'paragraph',
            text: 'A Deployment says "run three of these". The controller notices the mismatch between three and the two that are running, and creates one. The scheduler finds a node with room. When that node dies, the replacement goes elsewhere and the pod\'s identity moves with it — which is what a StatefulSet adds on top.',
          },
          {
            kind: 'list',
            items: [
              'The project maintains release branches for the three most recent minor releases: 1.37, 1.36 and 1.35.',
              'The latest patch on the 1.37 branch is 1.37.2, released in October 2026; 1.38 is in beta.',
              'Minor releases land three times a year on roughly fifteen-week cycles, and deprecated APIs may be removed with a minor release.',
            ],
          },
        ],
      },
      {
        title: 'Under the hood',
        blocks: [
          {
            kind: 'table',
            head: ['Piece', 'What it is'],
            rows: [
              ['Supported branches', '1.37, 1.36 and 1.35'],
              ['Latest patch', '1.37.2 — released October 27, 2026'],
              ['In development', '1.38 — beta as of November 2026'],
              ['Control model', 'Controllers reconciling actual state against desired state'],
              ['Extensibility', 'CustomResourceDefinitions extend the API with new kinds'],
              ['Release cadence', 'Three minor releases a year, ~15-week cycles'],
            ],
          },
        ],
      },
      {
        title: 'Where to read more',
        blocks: [
          {
            kind: 'links',
            items: [
              {
                label: 'The documentation',
                href: 'https://kubernetes.io/docs/home/',
                external: true,
              },
              {
                label: 'Comprehensive guide to Kubernetes',
                href: '/blog/Comprehensive-Guide-to-Kubernetes',
                external: false,
              },
              {
                label: 'Deep dive into core Kubernetes components',
                href: '/blog/Deep-Dive-into-Core-Kubernetes-Components',
                external: false,
              },
            ],
          },
        ],
      },
    ],
    related: ['docker', 'spark', 'whereq-cloud'],
  },
];
