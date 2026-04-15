---
title: Deep Dive into Redis II
slug: Deep-Dive-into-Redis-II
date: 2026-01-08
tags: [redis, deep-dive]
authors: whereq
---
# Redis Core Concepts — A Deep Conceptual Guide

## 1. Big Picture: What Redis Actually Is

At its core, Redis is:

> **An in-memory data store**
> with **optional persistence**
> and **optional clustering (sharding + replication)**

Everything else is layered on top of this idea.

---

## 2. Node, Master, Replica — The Physical Roles

### Node

A **node** is a **single Redis process**:

* One Redis server
* One TCP port
* One memory space
* One persistence configuration (RDB/AOF)

```
[ Redis Node ]
   ├── RAM
   ├── RDB file (optional)
   ├── AOF file (optional)
   └── Network endpoint
```

---

### Master

A **master** node:

* Accepts **writes**
* Owns **slots** (in cluster mode)
* Replicates data to replicas

```
[ Master Node ]
   ├── Slot ownership
   ├── Handles writes
   ├── RAM = source of truth
   └── Replication stream
```

---

### Replica (Slave)

A **replica**:

* Receives data from a master
* Is **read-only**
* Can be promoted if master fails

```
Master ---> Replica
  RAM        RAM
  RDB        RDB
```

⚠️ Replicas **do not own slots**

---

## 3. Snapshot vs RDB vs AOF (Critical Distinction)

### Snapshot (Concept)

A **snapshot** is a **conceptual idea**:

> “Redis memory state at a specific moment in time”

It is **not a file**.

---

### RDB (Redis Database File)

**RDB is the physical result of a snapshot**

```
Time T
┌───────────────┐
│ Redis RAM     │  ---- SNAPSHOT ---->  dump.rdb
└───────────────┘
```

Key points:

* Full memory dump
* Binary file
* Point-in-time
* Created via:

  * `SAVE`
  * `BGSAVE`
  * Auto rules (e.g., every N seconds if M writes)

---

### AOF (Append Only File)

AOF records **operations**, not memory state.

```
SET a 1
INCR a
INCR a
DEL b
```

Key points:

* Append-only
* Grows over time
* Can be rewritten (AOF rewrite)
* Replays commands to rebuild RAM

---

### RDB vs AOF (Mental Model)

```
RDB: "What memory looks like"
AOF: "How memory was built"
```

---

## 4. Does RDB File Size Change?

**YES — absolutely**

### RDB characteristics:

* Each dump is **independent**
* File size can:

  * Increase
  * Decrease
* Depends on:

  * Key count
  * Value sizes
  * Data types
  * Compression efficiency

```
RDB at T1: 120 MB
RDB at T2: 95 MB   (keys deleted / smaller values)
```

❌ There is **NO incremental RDB writing**

Each RDB is:

> A full rewrite, from scratch

---

### AOF File Size Behavior

* Always appends
* Grows monotonically
* Periodically compacted by rewrite

---

## 5. Shards vs Sharding vs Slots

### Sharding (Concept)

**Sharding is a logical data partitioning strategy**

> “Split the total keyspace across multiple masters”

Sharding itself:

* Is NOT a file
* Is NOT persistence
* Is NOT memory layout

---

### Shard (In Redis Cluster)

A **shard** usually means:

> One master + its replicas
> owning a subset of hash slots

```
Shard 1: MasterA + Replicas
Shard 2: MasterB + Replicas
Shard 3: MasterC + Replicas
```

---

## 6. Slots — The Core of Redis Cluster

### Slot Basics

Redis Cluster defines:

* **16384 hash slots**
* Slots are integers: `0 → 16383`

Every key maps to **exactly one slot**

---

### Slot Calculation

In modern Redis:

```
slot = CRC16(key) % 16384
```

Optionally using hash tags:

```
{user:123}:name
{user:123}:email
```

→ Same slot

---

### Slots Are LOGICAL

Slots:

* Are NOT stored in RDB
* Are NOT stored in AOF
* Exist only in:

  * Cluster metadata
  * Node configuration
  * Client routing logic

---

## 7. Slot → Master Mapping (Routing)

```
Key: user:whereq
   |
CRC16
   |
Slot 5793
   |
Cluster Metadata
   |
MasterA
```

```
Client
  |
  |-- key --> slot
  |
  |-- slot --> master
```

Clients either:

* Cache slot tables
* Or ask Redis (`MOVED` / `ASK`)

---

## 8. How Slot Ranges Are Assigned

### Initial Cluster Creation

Slots are **manually assigned** (by admin tools):

```
3 Masters
16384 / 3 ≈ 5461 slots each

MasterA: 0     - 5460
MasterB: 5461  - 10922
MasterC: 10923 - 16383
```

⚠️ Redis does **NOT** do:

```
slot % number_of_masters
```

That would break consistency.

---

## 9. Adding a New Master (Re-sharding)

When a new master joins:

1. Admin decides how many slots to move
2. Slots are migrated
3. Keys are moved key-by-key

```
Before:
MasterA: 0-5460
MasterB: 5461-10922
MasterC: 10923-16383

After adding MasterD:
MasterA: 0-4095
MasterB: 4096-8191
MasterC: 8192-12287
MasterD: 12288-16383
```

---

## 10. Slot Migration — What Really Moves?

### Key Truth

> **Slot migration moves KEY-VALUE PAIRS in RAM**
> **NOT RDB files**

---

### Migration Flow

```
Slot 5793 moves from A → B

MasterA RAM:
  user:whereq -> {"user":"whereq"}

MasterB RAM:
  (empty)
```

```
1) Cluster metadata updated (MIGRATING / IMPORTING)
2) Key-value pairs copied
3) Ownership finalized
```

```
MasterA --> send key + value --> MasterB
```

---

### Slot Structure Clarification

❌ Slots do NOT store values like:

```
5793 -> {...}
```

✅ Actual storage:

```
"user:whereq" -> '{"user":"whereq"}'
```

Slot is only used for **routing**

---

## 11. RDB + Slot Migration Interaction

### Scenario Timeline

#### Step 1: RDB Snapshot

```
MasterA RAM:
  user:whereq

dump.rdb:
  user:whereq
```

✔ Correct

---

#### Step 2: Slot Migration Happens

```
MasterA --> sends key+value --> MasterB
```

Now:

```
MasterA RAM: (no user:whereq)
MasterB RAM: user:whereq
```

---

#### Step 3: No Immediate Snapshot

Redis does **NOT** auto-trigger RDB after migration.

This is OK because:

> **RDB is not authoritative for cluster topology**

---

### Crash Safety

If MasterA crashes:

1. It reloads RDB
2. It rejoins cluster
3. Cluster metadata says:

   * Slot 5793 belongs to MasterB
4. MasterA:

   * Deletes or ignores that key
   * Syncs from correct owner if replica

✔ No double ownership

---

## 12. Does Redis Re-hash During RDB Load?

YES — but conceptually.

When loading RDB:

* Redis loads **keys**
* Slot is recalculated
* If slot not owned → key discarded or redirected

```
RDB load
  |
  |-- key --> slot
  |-- slot --> ownership check
```

---

## 13. Routing Summary Diagram

```
Client
  |
  |-- key
  |-- CRC16
  |-- slot
  |
  +--> Master (via cluster map)
```

---

## 14. Memory Is Always the Source of Truth

### Redis Fundamental Rule

> **All Redis data must fit in RAM**

Persistence is:

* Recovery mechanism
* Replication mechanism
* NOT primary storage

---

### What If Data Exceeds RAM?

Redis will:

* Fail writes
* Or evict keys (if configured)

Eviction policies:

```
noeviction
allkeys-lru
volatile-lru
allkeys-random
...
```

Redis is **NOT** a disk-first database.

---

## 15. Final Concept Relationship Map

```
             ┌────────────┐
             │   Client   │
             └─────┬──────┘
                   │
                Routing
                   │
            ┌──────▼───────┐
            │ Hash Slot     │  (CRC16 % 16384)
            └──────┬───────┘
                   │
          ┌────────▼────────┐
          │ Master Node     │
          │  (RAM)          │
          └──────┬─────────┘
                 │
        ┌────────▼────────┐
        │ Replica Nodes   │
        └────────────────┘

Persistence:
  RAM --snapshot--> RDB
  RAM --commands--> AOF
```

---

## 16. One-Sentence Mental Models

* **Snapshot** → a moment in memory
* **RDB** → binary memory dump
* **AOF** → command history
* **Slot** → routing number
* **Shard** → slot-owning master group
* **Sharding** → data partition strategy
* **Master** → writes + slot owner
* **Replica** → copy + failover
* **Node** → Redis process
* **Routing** → key → slot → master

---
