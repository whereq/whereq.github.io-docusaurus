/**
 * The glossary — the third collection of the WhereQ Atlas.
 *
 * A glossary has its own page shape: a term, a definition, and the pages in
 * the Atlas where the term actually turns up. It is the most wiki-native
 * thing a wiki can carry, and it is what makes the other two collections
 * easier to read.
 */

import {AtlasGlossaryTerm} from './atlas-types';

export const GLOSSARY_TERMS: AtlasGlossaryTerm[] = [
  {
    term: 'ACID',
    definition:
      'The four guarantees a transactional database offers: Atomicity (a transaction is all or nothing), Consistency (constraints hold after it commits), Isolation (concurrent transactions do not see each other\'s partial work) and Durability (a committed transaction survives a crash).',
    related: ['postgresql', 'kafka'],
  },
  {
    term: 'Backpressure',
    definition:
      'The mechanism by which a system that cannot keep up with its input slows the producer down, instead of letting an unbounded queue build. Without it, the slowest component decides how much memory the whole system needs.',
    related: ['kafka', 'spark'],
  },
  {
    term: 'CDC — Change Data Capture',
    definition:
      'Reading the stream of changes out of a database\'s transaction log rather than polling the tables. It gives downstream systems the same ordered, durable change feed that the database itself wrote.',
    related: ['postgresql', 'kafka'],
  },
  {
    term: 'Circuit breaker',
    definition:
      'A pattern that stops calling a dependency once it has failed often enough, and probes it again after a cool-off. It exists to stop a slow failure from turning into a cascading one.',
  },
  {
    term: 'Columnar storage',
    definition:
      'Storing values grouped by column rather than by row. Because the values in one column share a type and usually a narrow range, they compress well together — and a query that needs three columns of two hundred reads only three.',
    related: ['avro-parquet', 'spark'],
  },
  {
    term: 'Control plane',
    definition:
      'The part of a distributed system that decides what should happen — the Kubernetes API server, the controllers, the scheduler. It is deliberately separate from the data plane, which does the actual work.',
    related: ['kubernetes'],
  },
  {
    term: 'CRD — CustomResourceDefinition',
    definition:
      'A Kubernetes extension that adds a new kind of object to the API, so you can model your own domain — and then get controllers, RBAC and the CLI for free.',
    related: ['kubernetes'],
  },
  {
    term: 'Eventual consistency',
    definition:
      'A guarantee that replicas of the same data converge, but that a read may return a stale value until they do. It buys write throughput and availability at the price of having to reason about what a reader sees.',
    related: ['postgresql'],
  },
  {
    term: 'Idempotency',
    definition:
      'The property of an operation that can be applied several times with the same result as applying it once. Retrying is only safe when the thing being retried is idempotent.',
    related: ['kafka', 'mcp'],
  },
  {
    term: 'Idempotency key',
    definition:
      'A token the client sends with a request so that the server can recognise a repeat of the same operation and return the first result instead of doing the work again. The usual way to make a retry safe.',
    related: ['whereq-cloud'],
  },
  {
    term: 'Immutable infrastructure',
    definition:
      'The practice of never patching a running server, only replacing it. A change is a new image and a new deployment; the old one is drained and discarded, so the running state is always reproducible from the configuration.',
    related: ['docker', 'kubernetes'],
  },
  {
    term: 'Kafka partition',
    definition:
      'An ordered slice of a topic. Ordering is guaranteed inside a partition and only inside one; a consumer group owns every partition of a topic, so adding consumers to a group divides the work and adding a group multiplies it.',
    related: ['kafka'],
  },
  {
    term: 'Leader election',
    definition:
      'How a cluster of peers agrees on which one is currently responsible for a role, so that exactly one of them does the work. It is how a group coordinator, a scheduler or a shard owner avoids two nodes doing the same thing at once.',
    related: ['kafka', 'kubernetes'],
  },
  {
    term: 'MVCC — Multi-Version Concurrency Control',
    definition:
      'A concurrency scheme where each transaction reads a consistent snapshot of the data, and updates write new versions rather than overwriting in place. Readers never block writers and writers never block readers — at the cost of having to clean up versions nobody reads any more.',
    related: ['postgresql'],
  },
  {
    term: 'OLAP versus OLTP',
    definition:
      'Two different workloads with two different optimisations. OLTP is the transactional system of record — many small writes, each cheap and durable. OLAP is the analytical system — few large scans over many rows, each touching few columns. A schema tuned for one is usually bad for the other.',
    related: ['postgresql', 'spark'],
  },
  {
    term: 'Partitioning',
    definition:
      'Splitting a dataset across shards so that work and storage are divided between them. In Kafka it is the unit of parallelism; in a database it is how one very large table is broken into manageable pieces.',
    related: ['kafka', 'postgresql'],
  },
  {
    term: 'Predicate pushdown',
    definition:
      'Pushing a filter down to where the data is read, so that rows which cannot match are never loaded. In Parquet it works with the statistics in the footer, which lets an engine skip whole row groups.',
    related: ['avro-parquet', 'spark'],
  },
  {
    term: 'Projection pushdown',
    definition:
      'Reading only the columns a query actually needs. It is the single biggest reason a columnar format beats a row format on analytical work: three columns of two hundred is three columns of bytes.',
    related: ['avro-parquet'],
  },
  {
    term: 'RAG — Retrieval-Augmented Generation',
    definition:
      'Fetching relevant context before asking a model to answer, and giving it that context in the prompt. It is how a model answers from your data rather than from whatever it happened to learn — and it is why the retrieval step, not the model, is usually the part to get right.',
    related: ['whereq-cloud', 'langchain'],
  },
  {
    term: 'Rate limiting',
    definition:
      'Capping how much work a caller can ask for in a window. The token bucket is the common shape: tokens are added at a fixed rate and spent per request, so bursts are allowed but the long-run rate is bounded.',
  },
  {
    term: 'Reconciliation',
    definition:
      'The loop at the heart of Kubernetes: observe what is, compare it with what should be, and act on the difference. Because it is a loop rather than a procedure, it can run repeatedly, out of order, and recover from a failure in the middle.',
    related: ['kubernetes'],
  },
  {
    term: 'Row group',
    definition:
      'Parquet\'s unit of storage: a horizontal slice of rows, itself divided into column chunks and pages. The statistics for each column chunk live in the file footer, which is what makes whole row groups skippable.',
    related: ['avro-parquet'],
  },
  {
    term: 'Saga',
    definition:
      'A distributed transaction written as a sequence of local transactions, each with a compensating action that undoes it if a later step fails. There is no single commit; there is an order and a set of compensations.',
  },
  {
    term: 'Schema registry',
    definition:
      'The service that holds the schema each topic\'s records follow, and that checks producers and consumers against it. It is what makes schema evolution safe on a stream, where Avro\'s own writer/reader resolution needs something to resolve against.',
    related: ['kafka', 'avro-parquet'],
  },
  {
    term: 'Sidecar',
    definition:
      'A container that runs alongside another to add a capability — a proxy, a log shipper, a service mesh proxy — without either one knowing about the other. Kubernetes made the pattern ordinary by sharing the pod\'s network namespace.',
    related: ['kubernetes', 'docker'],
  },
  {
    term: 'Stateless',
    definition:
      'A service that keeps nothing between requests, so any instance can answer any request. It is what makes horizontal scaling and rolling deployment simple, and what forces session state somewhere else.',
    related: ['kubernetes', 'whereq-cloud'],
  },
  {
    term: 'Token window',
    definition:
      'How much text a model can consider at once. Everything about a long document problem — chunking, retrieval, summarisation — is downstream of this number.',
    related: ['langchain', 'catobigato'],
  },
  {
    term: 'Vector index',
    definition:
      'A structure that finds the nearest neighbours of a vector without scanning every vector, usually by partitioning the space and comparing only nearby partitions. It is what makes similarity search over embeddings fast enough to be interactive.',
    related: ['langchain', 'whereq-cloud'],
  },
  {
    term: 'WAL — Write-Ahead Log',
    definition:
      'The durable record written before a change is applied to the data itself. On restart the log is replayed to bring the data up to date, which is why the log — not the data — is the thing you have to protect.',
    related: ['postgresql', 'kafka'],
  },
  {
    term: 'Zero-downtime deployment',
    definition:
      'Replacing running instances without dropping a request: start the new version alongside the old, wait for it to pass its health checks, move traffic over, then retire the old. Kubernetes makes the choreography routine, and readiness probes are what decide when it is safe.',
    related: ['kubernetes', 'docker'],
  },
];
