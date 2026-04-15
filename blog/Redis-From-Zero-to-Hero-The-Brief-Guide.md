---
title: "Redis: From Zero to Hero - The Brief Guide"
slug: Redis-From-Zero-to-Hero-The-Brief-Guide
date: 2026-01-07
tags: [redis]
authors: whereq
---
# Redis Architecture Deep Dive: Core Concepts from Zero to Hero

## Executive Summary
This document provides a comprehensive, structured understanding of Redis architecture and core concepts, distilled from in-depth technical discussions. It focuses on building accurate mental models of Redis' internal workings, persistence mechanisms, replication strategies, and clustering architecture.

## Table of Contents
1. [Redis Fundamentals](#1-redis-fundamentals)
2. [Persistence: RDB vs AOF](#2-persistence-rdb-vs-aof)
3. [Replication Architecture](#3-replication-architecture)
4. [High Availability with Sentinel](#4-high-availability-with-sentinel)
5. [Redis Cluster & Sharding](#5-redis-cluster--sharding)
6. [Data Movement & Consistency](#6-data-movement--consistency)

---

## 1. Redis Fundamentals

### 1.1 What is Redis?

**Redis** (REmote DIctionary Server) is an open-source, **in-memory data structure store** that can be used as a database, cache, message broker, and streaming engine. It provides sub-millisecond response times by storing all data in RAM.

```mermaid
graph TB
    subgraph "Redis Core Philosophy"
        A[In-Memory Storage] --> B[Single-Threaded Execution]
        B --> C[Rich Data Structures]
        C --> D[Optional Durability]
    end
    
    subgraph "Primary Use Cases"
        E[Caching Layer] --> F[Session Store]
        G[Real-time Analytics] --> H[Message Queue]
        I[Leaderboards] --> J[Rate Limiting]
    end
```

### 1.2 Single-Threaded Advantage

Redis uses a **single-threaded event loop** model which provides atomic operations without locks:

```mermaid
sequenceDiagram
    participant Client1
    participant Client2
    participant Redis
    
    Client1->>Redis: INCR counter
    Client2->>Redis: INCR counter
    Note over Redis: Sequential processing<br/>No race conditions
    Redis-->>Client1: 101
    Redis-->>Client2: 102
```

**Key Benefits:**
- No lock contention or synchronization overhead
- Predictable latency patterns
- Naturally atomic operations like `INCR`

### 1.3 Data Model

Redis is **not a table store** but rather a **huge hash map in memory** with rich data types:

| Data Structure | Conceptual Model | Primary Use Cases |
|---------------|-----------------|-------------------|
| **String** | Basic value/counter | Page views, rate limiting |
| **Hash** | Object/entity storage | User profiles, configurations |
| **List** | Queue/stack | Message queues, activity feeds |
| **Set** | Unique collection | Tags, friends lists |
| **Sorted Set** | Ranking system | Leaderboards, time-series |
| **Stream** | Append-only log | Event sourcing, message streams |

---

## 2. Persistence: RDB vs AOF

### 2.1 RDB (Redis Database File) - Snapshotting

**RDB is a point-in-time binary snapshot** of Redis memory, not a runtime state or memory block.

```mermaid
sequenceDiagram
    participant Client as Clients
    participant Main as Redis Main Process
    participant Fork as Forked Child Process
    participant Disk as Disk Storage
    
    Note over Client,Main: Normal Operation
    Client->>Main: Write Operations
    Main->>Main: Update in memory
    Main-->>Client: Responses
    
    Note over Main,Fork: RDB Snapshot Triggered
    Main->>Fork: Fork() - Create child process
    Note over Fork: Copy-on-Write<br/>Child gets memory snapshot
    
    par Main Process Continues
        Client->>Main: More writes
        Main->>Main: Update memory
        Main-->>Client: Responses
    and Child Process Writes
        Fork->>Fork: Iterate through dataset
        Fork->>Disk: Write RDB file
        Disk-->>Fork: Write complete
        Fork->>Main: Signal completion
    end
    
    Main->>Disk: Atomic rename temp→dump.rdb
```

**Key RDB Characteristics:**
- **File format**: Binary representation of memory at snapshot time
- **Creation**: Forked child process writes to disk (copy-on-write)
- **Use cases**: Fast restarts, backups, replication bootstrap
- **Risk**: Potential data loss between snapshots

### 2.2 AOF (Append Only File) - Write-Ahead Log

**AOF logs every write operation** received by the server for durability:

```mermaid
graph TB
    A[Write Command] --> B[Execute in Memory]
    B --> C[Append to AOF Buffer]
    C --> D{Sync Policy}
    
    D --> E[appendfsync always]
    D --> F[appendfsync everysec]
    D --> G[appendfsync no]
    
    E --> H["Write + Fsync every command<br/>Durability: Excellent<br/>Performance: Poor"]
    F --> I["Write every command<br/>Fsync every second<br/>Balance: Good (Recommended)"]
    G --> J["Write only<br/>OS decides fsync<br/>Performance: Excellent<br/>Durability: Poor"]
```

### 2.3 RDB + AOF Hybrid Approach

**Memory is the source of truth** - both RDB and AOF are derived artifacts:

```mermaid
graph TD
    Memory["Live In-Memory Data"] --> RDB["Periodic RDB Snapshot"]
    Memory --> AOF["Continuous AOF Append"]
    
    RDB --> Restart1[Fast Recovery]
    AOF --> Restart2[Durable Recovery]
    
    subgraph "Restart Priority"
        AOFExists{AOF exists?}
        AOFExists -->|Yes| LoadAOF
        AOFExists -->|No| LoadRDB
    end
```

**Production Recommendation**: Enable both RDB (for speed) and AOF (for durability) with `appendfsync everysec`.

---

## 3. Replication Architecture

### 3.1 Master-Replica Model

**Each Redis instance has one role**: master OR replica, typically deployed one instance per node for isolation.

```mermaid
graph TD
    subgraph "Production Deployment"
        Node1[Node 1] --> MasterA[Master Instance A]
        Node2[Node 2] --> ReplicaA1[Replica of A]
        Node3[Node 3] --> ReplicaA2[Replica of A]
    end
    
    MasterA -->|Async Replication| ReplicaA1
    MasterA -->|Async Replication| ReplicaA2
    
    subgraph "Traffic Pattern"
        Write[Write Requests] --> MasterA
        Read1[Read Requests] --> ReplicaA1
        Read2[Read Requests] --> ReplicaA2
    end
```

### 3.2 Replication Process

**No separate sync daemon** - replication is handled by Redis processes themselves:

```mermaid
sequenceDiagram
    participant Client
    participant Master
    participant Replica
    
    Note over Replica,Master: Initial Sync (Full Resynchronization)
    Replica->>Master: SYNC command
    Master->>Master: BGSAVE to create RDB
    Master->>Replica: Send RDB file
    Master->>Replica: Send buffered writes during BGSAVE
    Replica->>Replica: Load RDB + replay writes
    
    Note over Client,Master: Continuous Replication
    Client->>Master: Write command
    Master->>Master: Execute in memory
    Master->>Replica: Propagate command
    Master-->>Client: Response
    Replica->>Replica: Execute command
```

**Replication Buffer & Backlog:**
- **Replication buffer**: Commands not yet acknowledged by replicas
- **Replication backlog**: Circular buffer for reconnecting replicas
- **Key metrics**: `master_repl_offset` vs `replica_offset` for lag calculation

---

## 4. High Availability with Sentinel

### 4.1 Sentinel Architecture

**Redis Sentinel is a separate process** that monitors Redis instances and provides automatic failover:

```mermaid
graph TB
    subgraph "Redis Data Layer"
        A[Master] --> B[Replica 1]
        A --> C[Replica 2]
    end
    
    subgraph "Sentinel Cluster (Odd Number Recommended)"
        D[Sentinel 1] --> E[Sentinel 2]
        D --> F[Sentinel 3]
        E --> F
    end
    
    D --> A
    E --> A
    F --> A
    D --> B
    E --> B
    F --> B
    D --> C
    E --> C
    F --> C
    
    subgraph "Gossip Protocol"
        G[Sentinel Communication] --> H["Publish/Subscribe<br/>Failure Detection<br/>Leader Election"]
    end
```

### 4.2 Why Odd Number of Sentinels?

**Quorum and fault tolerance** prevent split-brain scenarios:

```mermaid
graph TD
    subgraph "3-Sentinel Cluster"
        A[Sentinel A] --> Vote[Majority Vote]
        B[Sentinel B] --> Vote
        C[Sentinel C] --> Vote
    end
    
    Vote --> D["Quorum = floor(3/2) + 1 = 2"]
    D --> E["Can tolerate 1 Sentinel failure"]
    
    subgraph "Failure Tolerance"
        F[Total Sentinels] --> G[Can Fail]
        3 --> H[1]
        5 --> I[2]
        7 --> J[3]
    end
```

### 4.3 Failover Process

```mermaid
sequenceDiagram
    participant S1 as Sentinel 1
    participant S2 as Sentinel 2
    participant S3 as Sentinel 3
    participant OldM as Old Master
    participant NewM as New Master (promoted replica)
    
    S1->>OldM: Ping (no response)
    S1->>S2: Report failure
    S1->>S3: Report failure
    
    Note over S1,S3: Quorum achieved (2/3 agree)
    
    S1->>S1: Elect self as leader (Raft consensus)
    
    S1->>NewM: SLAVEOF NO ONE
    NewM->>S1: Promotion successful
    
    S1->>Other Replicas: SLAVEOF new-master
    S1->>All Sentinels: Update configuration
    
    Note over S1,NewM: Clients rediscover new master via Sentinel
```

---

## 5. Redis Cluster & Sharding

### 5.1 Cluster Architecture Fundamentals

**Redis Cluster has multiple masters**, each responsible for a subset of hash slots:

```mermaid
graph TB
    subgraph "Redis Cluster - 3 Masters"
        A[Master 1<br/>Slots 0-5460] --> D[Replica 1.1]
        B[Master 2<br/>Slots 5461-10922] --> E[Replica 2.1]
        C[Master 3<br/>Slots 10923-16383] --> F[Replica 3.1]
    end
    
    subgraph "Hash Slot Logic"
        G[Key: user:123] --> H["CRC16('user:123')<br/>= 948293"]
        H --> I["Slot = 948293 % 16384<br/>= 5793"]
        I --> J["Slot 5793 ∈ Master 1's range"]
    end
    
    A <--> B
    B <--> C
    A <--> C
    
    subgraph "Cluster Bus"
        K[Gossip Protocol] --> L["Port: Redis port + 10000<br/>e.g., 6379 → 16379"]
    end
```

### 5.2 Key Concepts Clarified

**Slots are logical, not physical** - they exist only as routing metadata:

| Concept | Definition | Physical Existence |
|---------|------------|-------------------|
| **Slot** | Logical hash bucket (0-16383) | No - only metadata |
| **Shard** | Master + its assigned slots | Yes - Redis instance |
| **Key-Value Pair** | Actual data | Yes - in RAM/RDB |
| **Cluster Metadata** | Slot → node mapping | Yes - in `nodes.conf` |

### 5.3 Slot Assignment & Migration

**Slots are explicitly assigned**, not auto-calculated by modulo:

```mermaid
sequenceDiagram
    participant Admin as Administrator
    participant A as Master A
    participant B as Master B
    participant Client
    
    Admin->>A: CLUSTER SETSLOT 5793 MIGRATING B
    Admin->>B: CLUSTER SETSLOT 5793 IMPORTING A
    
    Note over A,B: Migration in progress
    
    Client->>A: GET user:123 (slot 5793)
    A-->>Client: -ASK 5793 B (temporary redirect)
    
    A->>B: MIGRATE "user:123" value TTL
    B->>B: Store in RAM
    
    Admin->>Cluster: CLUSTER SETSLOT 5793 NODE B
    
    Client->>A: GET user:123
    A-->>Client: -MOVED 5793 B (permanent redirect)
    Client->>B: GET user:123
    B-->>Client: value
```

### 5.4 Adding New Masters

**Redis does NOT auto-rebalance** when adding new masters:

```mermaid
flowchart TD
    A[Add New Master Node] --> B[Master joins with ZERO slots]
    B --> C[Manual/scripted resharding required]
    
    C --> D[Explicit slot migration]
    D --> E[Gradual key movement]
    E --> F[Updated cluster metadata]
    
    subgraph "Resharding Tools"
        G["redis-cli --cluster reshard"]
        H["--cluster-from <old-master>"]
        I["--cluster-to <new-master>"]
        J["--cluster-slots <count>"]
    end
```

**Why no auto-rebalance?** Avoids massive uncontrolled data movement and potential service disruption.

---

## 6. Data Movement & Consistency

### 6.1 Migration and Persistence Interaction

**Slot migration moves key-value pairs in memory**, not RDB files:

```mermaid
graph TD
    subgraph "Before Migration"
        A1[Master A RAM] --> B1["Key K in slot 5793"]
        A1 --> C1[Master A RDB<br/>Contains K]
    end
    
    subgraph "During Migration"
        A2[Master A] -->|MIGRATE K| D[Master B RAM]
        D --> E[Master B stores K]
        A2 --> F[Delete K from RAM]
    end
    
    subgraph "After Migration"
        A3[Master A RDB] --> G["Still contains K (stale)"]
        D2[Master B RAM] --> H["Now contains K"]
        D2 --> I["Next RDB will include K"]
    end
    
    subgraph "Crash Recovery Scenario"
        J[Master A crashes] --> K[Restart + load RDB]
        K --> L[RAM contains stale K]
        M[Cluster handshake] --> N["Slot 5793 → Master B"]
        L --> O[Mark K as orphan/delete]
    end
```

### 6.2 Critical Principles

1. **Key → Slot mapping is immutable**: `CRC16(key) % 16384` always yields same slot
2. **Slot → Node mapping is mutable**: Changed during migration
3. **RDB is local snapshot**: Never shared or merged between nodes
4. **Cluster metadata overrides RDB**: On restart, ownership checked against cluster state

### 6.3 Hash Tags for Co-location

**Force keys to same slot** using `{}` syntax for multi-key operations:

```text
# These hash to same slot (hash input = "123")
user:{123}:profile
user:{123}:orders
user:{123}:settings

# Enables:
MGET user:{123}:profile user:{123}:orders
MULTI/EXEC transactions
Lua scripts accessing multiple keys
```

### 6.4 Memory Management

**Redis must keep all active data in RAM** with explicit strategies for limits:

| Strategy | Mechanism | Use Case |
|----------|-----------|----------|
| **Eviction Policies** | `maxmemory-policy` (LRU, random, etc.) | Caching scenarios |
| **Horizontal Scaling** | Add more masters + reshard | Growing datasets |
| **Redis on Flash** | SSD-backed (Enterprise) | Large cold data |

**Never**: Automatic disk swapping or silent data eviction without configured policy.

---

## Summary: Redis Mental Model

### Core Architecture Truths

1. **Single-threaded with forked persistence**: Main thread handles commands, child processes for RDB/AOF
2. **RAM as source of truth**: Persistence is for recovery, not runtime operation
3. **Logical slot partitioning**: 16384 slots provide stable indirection layer
4. **Decentralized clustering**: No central controller, nodes coordinate via gossip
5. **Explicit data movement**: No automatic rebalancing, all migrations are operator-controlled

### Production Implications

- **Design keys carefully**: Natural distribution avoids hotspots
- **Use hash tags judiciously**: Only when multi-key operations required
- **Monitor slot distribution**: Ensure even load across masters
- **Plan resharding carefully**: Gradual migration during low traffic
- **Always have replicas**: Protect against data loss during migration windows

### Final Unified Model

```
Application → Key → CRC16 → Slot (0-16383) → Cluster Metadata → Master Node → RAM → RDB/AOF
                                     ↑
                              Replicas (sync)
```

This model ensures **predictable performance**, **linear scalability**, and **operational control** while maintaining Redis' signature sub-millisecond response times.