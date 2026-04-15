---
title: Why Kubernetes Chose etcd
slug: Why-Kubernetes-Chose-etcd
date: 2026-01-09
tags: [kubernetes, etcd]
authors: whereq
---
# Why Kubernetes Chose etcd

### A Deep Dive into Kubernetes’ Control Plane Backbone

---

## 1. One-Sentence Answer (Executive Summary)

**Kubernetes chose etcd because it provides strong consistency, fault tolerance, watchability, and simplicity—exactly what a distributed control plane needs.**

---

## 2. What Kubernetes Needs at Its Core

Before understanding *why etcd*, we must understand **what Kubernetes fundamentally is**.

### Kubernetes Is NOT:

* A container runtime
* A scheduler only
* A deployment tool

### Kubernetes IS:

> **A distributed state machine that continuously reconciles desired state with actual state**

That sentence alone explains why etcd matters.

---

## 3. Kubernetes Mental Model

```
User declares desired state
        ↓
Kubernetes stores desired state
        ↓
Controllers compare desired vs actual
        ↓
Actions taken to reconcile
        ↓
State updated
```

### Key Insight

👉 **Everything depends on a reliable, consistent source of truth**

---

## 4. The Role of the Kubernetes Data Store

The data store must hold:

* Desired state (YAML manifests)
* Cluster metadata
* Node status
* Pod status
* ConfigMaps
* Secrets
* Leases
* Locks
* Leader elections

This data store is the **single source of truth**.

---

## 5. Why This Data Store Is So Critical

If the data store is wrong, Kubernetes is wrong.

```
Wrong state → Wrong scheduling
Wrong locks → Split brain
Wrong config → Cluster outage
```

So Kubernetes needs a store that is:

```
✔ Always correct
✔ Always consistent
✔ Always available (with quorum)
✔ Observable (watchable)
✔ Deterministic
```

---

## 6. Why NOT Redis?

Let’s eliminate obvious candidates first.

### Redis Characteristics

```
Fast
In-memory
Eventual consistency
No consensus protocol
Best-effort durability
```

### Why Redis Fails Kubernetes’ Needs

```
Redis write → Master
Replica lag possible
Failover may lose writes
```

#### Diagram

```
APIServer → Redis
           ↓
     Possible stale read
```

🚫 **Unacceptable for Kubernetes**
Kubernetes requires **linearizable writes**, not *eventual* correctness.

---

## 7. Why NOT ZooKeeper?

ZooKeeper *was* a strong candidate.

### ZooKeeper Strengths

```
Strong consistency
Leader election
Distributed locks
Proven correctness
```

### Why Kubernetes Did NOT Choose ZooKeeper

| Issue                  | Explanation                |
| ---------------------- | -------------------------- |
| Operational complexity | Hard to operate at scale   |
| Watch semantics        | One-time triggers          |
| API ergonomics         | Not cloud-native           |
| Data model             | Hierarchical, not flexible |
| Tooling                | Heavy JVM ecosystem        |

ZooKeeper was **correct but heavy**.

---

## 8. Enter etcd

### etcd Core Identity

```
Distributed
Strongly consistent
Key-value store
Raft consensus
Watch-first design
```

---

## 9. etcd at a Glance

```
┌───────────────┐
│   Kubernetes  │
│ Control Plane │
└───────┬───────┘
        │
┌───────▼───────┐
│     etcd      │
│ (Source of    │
│   Truth)      │
└───────────────┘
```

---

## 10. Strong Consistency: The #1 Reason

### What etcd Guarantees

```
Write acknowledged
    ↓
Majority of nodes committed
    ↓
All future reads see it
```

#### Diagram (Raft)

```
Client
  ↓
Leader
  ↓
Follower A
  ↓
Follower B
(majority ACK)
```

✔ **No stale reads**
✔ **No lost writes**
✔ **No split brain**

---

## 11. Kubernetes Control Plane Is a Distributed State Machine

```
State S₀
  ↓
Event E₁
  ↓
State S₁
  ↓
Event E₂
  ↓
State S₂
```

etcd guarantees:

* Ordered events
* Durable transitions
* Deterministic replay

---

## 12. Watch Is a First-Class Primitive in etcd

This is **hugely important**.

### etcd Watch Model

```
Client sets watch
     ↓
Key changes
     ↓
Guaranteed event stream
```

### Kubernetes Depends on This

```
etcd change
   ↓
APIServer
   ↓
Controller
   ↓
Action
```

Controllers are **event-driven**, not polling-based.

---

## 13. Compare Watch Semantics

| System        | Watch Reliability              |
| ------------- | ------------------------------ |
| Redis Pub/Sub | Best effort                    |
| ZooKeeper     | One-shot                       |
| etcd          | Continuous, ordered, resumable |

Only etcd matches Kubernetes needs.

---

## 14. Simple Data Model = Huge Advantage

### etcd Uses Flat Key-Value Space

```
/registry/pods/ns1/podA
/registry/services/ns1/svcA
/registry/nodes/node1
```

### Benefits

```
✔ Easy versioning
✔ Easy compaction
✔ Easy snapshot
✔ Easy migration
```

ZooKeeper’s tree model complicates this.

---

## 15. Transactions & Compare-And-Swap

etcd supports:

```
IF version == X
THEN update
ELSE fail
```

Kubernetes uses this for:

* Leader election
* Resource locking
* Optimistic concurrency control

---

## 16. Leader Election (Kubernetes Everywhere)

```
Controller A
Controller B
Controller C
```

Only ONE should be active.

### etcd Makes This Safe

```
Lease → TTL → automatic expiry
```

Diagram:

```
Controller A holds lease
      ↓
Crash
      ↓
Lease expires
      ↓
Controller B elected
```

---

## 17. etcd Is Disk-Backed (Not Memory-Only)

### Why This Matters

```
Crash
↓
Restart
↓
State recovered
```

etcd durability is **mandatory** for cluster recovery.

---

## 18. Snapshot + WAL Model

```
Writes → WAL
        ↓
Periodic snapshot
```

### Benefits

* Fast recovery
* Small snapshots
* Replayable history

Perfect for Kubernetes.

---

## 19. Kubernetes Can Rebuild the Cluster from etcd Alone

This is HUGE.

```
Nodes die
Pods die
APIServer restarts
```

As long as **etcd survives**, Kubernetes reconstructs everything.

---

## 20. etcd Is Cloud-Native Friendly

| Feature        | Why It Matters        |
| -------------- | --------------------- |
| gRPC API       | Performance & tooling |
| TLS everywhere | Security              |
| Small binary   | Easy deployment       |
| Raft           | Simple mental model   |

---

## 21. Scaling Expectations Match Perfectly

### Kubernetes Data Profile

```
Low write volume
Small objects
High read consistency
```

### etcd Designed Exactly for This

etcd is **not** designed for:

* High QPS counters
* Large blobs
* Hot data paths

Which aligns perfectly.

---

## 22. Operational Model Alignment

```
3–5 nodes
Quorum based
Simple backups
Predictable behavior
```

Kubernetes admins can reason about failures.

---

## 23. What etcd Is NOT Used For in Kubernetes

```
❌ Pod logs
❌ Metrics
❌ Application data
❌ High-frequency events
```

etcd is **control plane only**.

---

## 24. Why etcd Won Over ZooKeeper (Final Comparison)

| Criteria           | ZooKeeper | etcd      |
| ------------------ | --------- | --------- |
| Consistency        | Strong    | Strong    |
| Watch model        | Weak      | Excellent |
| API                | Heavy     | Clean     |
| Cloud-native       | No        | Yes       |
| Operational burden | High      | Medium    |
| Fit for Kubernetes | ❌         | ✅         |

---

## 25. Final Mental Model

```
etcd = Brain
Kubernetes = Nervous System
Nodes = Muscles
```

If the brain is wrong, the body fails.

---

## 26. Final Takeaway

Kubernetes chose etcd because:

```
✔ Strong consistency
✔ Event-driven watches
✔ Simple, correct semantics
✔ Cloud-native design
✔ Perfect data profile match
```

**etcd is not fast—but Kubernetes does not need fast.
Kubernetes needs correct.**

---