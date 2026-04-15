---
title: Deep Dive into Redis III
slug: Deep-Dive-into-Redis-III
date: 2026-01-08
tags: [redis, deep-dive]
authors: whereq
---
Great question — **cluster metadata** is the last missing puzzle piece that makes everything you learned *click*.
I’ll explain **what it is, where it lives, what’s inside it, how it’s updated, and who trusts it**, again with diagrams and zero code.

---

# Redis Cluster Metadata — Deep Dive

## 1. What Is Redis Cluster Metadata?

**Redis cluster metadata** is the **shared logical map** that tells every node:

> “Who owns which slots, who is master/replica of whom, and how to route keys.”

It is:

* **NOT user data**
* **NOT stored in RDB**
* **NOT stored in AOF**
* **NOT centralized**

It is **distributed and eventually consistent**.

---

## 2. What Information Is in Cluster Metadata?

Each node stores **the same logical structure** (with slight timing differences):

### Core Contents

```
Cluster State:
  - cluster_id
  - epoch (version)
  - nodes:
      - node_id
      - ip:port
      - role (master / replica)
      - master_of (if replica)
      - slots owned (if master)
      - flags (fail, pfail, handshake, etc.)
```

---

### Conceptual Structure (Simplified)

```
CLUSTER METADATA
│
├── Cluster ID
├── Epoch (version)
│
├── Node A
│   ├── id: A1
│   ├── role: master
│   ├── slots: 0-5460
│   └── replicas: B1, B2
│
├── Node B
│   ├── id: C1
│   ├── role: master
│   ├── slots: 5461-10922
│
└── Node C
    ├── id: D1
    ├── role: master
    ├── slots: 10923-16383
```

---

## 3. Where Is Cluster Metadata Stored?

### On Every Node — Locally

Each Redis node stores cluster metadata in:

```
nodes.conf
```

Important properties:

* Written automatically by Redis
* Updated dynamically
* Not meant for manual editing
* Survives restart

```
Redis Node
├── RAM
├── dump.rdb
├── appendonly.aof
└── nodes.conf   <-- cluster metadata
```

---

### Key Point

> **nodes.conf is NOT a configuration file you manage**
>
> It is Redis’s **internal cluster ledger**

---

## 4. nodes.conf — What Does It Look Like Conceptually?

Conceptually (not exact syntax):

```
node A1 10.0.0.1:6379 master - 0-5460
node B1 10.0.0.2:6379 slave A1
node C1 10.0.0.3:6379 master - 5461-10922
node D1 10.0.0.4:6379 master - 10923-16383
```

Each node has:

* A unique **node ID**
* Role
* Slot ownership (masters only)
* Relationship to others

---

## 5. How Cluster Metadata Is Distributed

### Gossip Protocol

Redis Cluster uses a **gossip-style protocol**:

```
Node A <-- gossip --> Node B <-- gossip --> Node C
```

Metadata exchange happens:

* Periodically
* Piggybacked on heartbeat packets
* Incrementally

This ensures:

* No central coordinator
* No single source of truth
* High availability

---

## 6. Cluster Epoch — Versioning the Metadata

### Why Epoch Exists

When multiple changes happen:

* Failover
* Slot migration
* Master promotion

Redis needs to decide:

> “Which view of the cluster is newer?”

### Epoch Rule

```
Higher epoch = newer truth
```

Every metadata-changing event:

* Increments epoch
* Spreads via gossip

---

## 7. Slot Ownership in Metadata

Slots are represented as **ranges**, not individual numbers.

```
Node A:
  slots: 0-4095, 8192-12287
```

This allows:

* Non-contiguous ownership
* Partial migration

---

### During Migration (Transitional States)

```
Node A:
  MIGRATING slot 5793 -> Node B

Node B:
  IMPORTING slot 5793 <- Node A
```

Clients may see:

* `ASK`
* `MOVED`

---

## 8. Who Updates Cluster Metadata?

### Different Scenarios

| Event             | Who Triggers            | How             |
| ----------------- | ----------------------- | --------------- |
| Cluster creation  | Admin tool              | Assign slots    |
| Add master        | Admin tool              | Rebalance slots |
| Slot migration    | Source & target masters | Slot states     |
| Master failure    | Redis nodes             | Voting + epoch  |
| Replica promotion | Redis nodes             | Automatic       |

---

### Important Clarification

> Redis **does NOT have a leader node for metadata**

All nodes:

* Observe
* Vote
* Converge

---

## 9. Client’s View of Cluster Metadata

Clients:

* Cache slot → node map
* Learn from Redis replies

```
Client --> Node
         <-- MOVED 5793 10.0.0.2:6379
```

Client updates local cache.

---

### Client Metadata vs Server Metadata

```
Client cache = hint
Cluster metadata = authority
```

---

## 10. Metadata Is Separate from Data

This separation is intentional and powerful:

```
DATA PATH:
  Key -> RAM -> RDB/AOF

CONTROL PATH:
  Slot -> Metadata -> Routing
```

This is why:

* Slot migration doesn’t move files
* RDB doesn’t store slot info
* Restarting nodes doesn’t break routing

---

## 11. Failure Scenario: Why Metadata Saves You

### Master Crash After Migration

```
MasterA crashes
MasterB owns slot 5793
```

On restart:

1. MasterA loads RDB
2. Reads nodes.conf
3. Sees slot 5793 not owned
4. Discards or syncs properly

✔ No split-brain

---

## 12. Mental Model Diagram (Complete)

```
                 ┌────────────┐
                 │   Client   │
                 └─────┬──────┘
                       │
                Slot Calculation
                       │
                ┌──────▼───────┐
                │ Slot (0-16383)│
                └──────┬───────┘
                       │
         ┌─────────────▼─────────────┐
         │ Cluster Metadata (nodes)  │
         │  - slot ranges            │
         │  - roles                  │
         │  - epochs                 │
         └─────────────┬─────────────┘
                       │
              ┌────────▼────────┐
              │   Master Node   │
              │      RAM        │
              └────────┬────────┘
                       │
             ┌─────────▼─────────┐
             │   Replica Nodes   │
             └───────────────────┘
```

---

## 13. One-Sentence Summary

> **Redis cluster metadata is a distributed, versioned routing ledger that maps hash slots to master nodes, stored in `nodes.conf`, propagated by gossip, and completely independent from user data and persistence.**
