---
title: ZooKeeper vs etcd
slug: ZooKeeper-vs-etcd
date: 2026-01-09
tags: [zookeeper, etcd]
authors: whereq
---
# Question: Why is ZooKeeper the primary option for correctness instead of etcd?


Short answer up front:

> **ZooKeeper is chosen over etcd when *absolute correctness, strict ordering, and coordination semantics* matter more than cloud-native ergonomics and operational simplicity.**

This goes straight to the **philosophy and historical trade-offs** of distributed systems.

---

## 1. “Correctness” Means Different Things in Different Systems

When people say **“ZooKeeper is more correct”**, they usually mean **coordination correctness**, not storage correctness.

### Two kinds of correctness

| Type                         | Meaning                                                    |
| ---------------------------- | ---------------------------------------------------------- |
| **Data correctness**         | Reads return the latest committed value                    |
| **Coordination correctness** | Ordering, fencing, session semantics are strictly enforced |

Both etcd and ZooKeeper are *data-correct*.
ZooKeeper is **exceptionally strong** at *coordination correctness*.

---

## 2. ZooKeeper’s Original Purpose (This Matters a LOT)

ZooKeeper was **not designed as a KV store**.

It was designed to solve **distributed coordination problems**:

* Leader election
* Distributed locks
* Membership tracking
* Configuration management
* Barrier synchronization

### ZooKeeper’s design assumption

> “If coordination is wrong, the entire distributed system collapses.”

This assumption drove **extremely conservative design choices**.

---

## 3. ZooKeeper’s Strongest Weapon: Session Semantics

ZooKeeper has **sessions**, etcd does not (in the same way).

### ZooKeeper session model

```
Client connects
↓
Session established
↓
Ephemeral nodes tied to session
↓
Client dies → session expires → nodes deleted
```

### Why this is powerful

```
Lock correctness
Leader correctness
Membership correctness
```

#### Diagram

```
Client A holds lock
   ↓
Client A crashes
   ↓
ZooKeeper deletes ephemeral node
   ↓
Lock immediately released
```

This is **automatic fencing**, not optional logic.

---

## 4. ZooKeeper’s Ordering Guarantees Are Extremely Strict

ZooKeeper guarantees:

* **Total order of writes**
* **Monotonic reads per client**
* **No reordering under failure**
* **Linearizable operations**

But more importantly:

> **ZooKeeper exposes ordering as a first-class primitive**

---

## 5. Sequential znodes (A Big Deal)

ZooKeeper can create nodes like:

```
/lock/node-00000001
/lock/node-00000002
/lock/node-00000003
```

This enables:

* Fair locks
* FIFO queues
* Barrier algorithms

etcd **cannot do this natively**.

---

## 6. ZooKeeper Watches vs etcd Watches (Subtle Difference)

You might hear:

> “etcd has better watches”

This is **true for data propagation**, but **false for coordination logic**.

### ZooKeeper watches are intentionally weaker

* One-shot
* Explicit re-registration
* Tied to session lifecycle

Why?

Because **ZooKeeper forces you to reason about race conditions explicitly**.

This reduces **false assumptions** in coordination logic.

---

## 7. ZooKeeper Is Extremely Conservative by Design

ZooKeeper assumes:

```
Network partitions WILL happen
Clients WILL crash
GC pauses WILL happen
```

So it prefers:

* Blocking over guessing
* Failure over inconsistency
* Simplicity over convenience

etcd is conservative too — but ZooKeeper is **paranoid**.

---

## 8. Why Large-Scale Distributed Systems Still Choose ZooKeeper

### Typical ZooKeeper users

* Apache Kafka
* Apache HBase
* Hadoop YARN
* Apache Storm
* Apache Solr
* Large financial systems
* Telco control planes

These systems care about:

```
✔ Strict leader fencing
✔ Lock correctness
✔ No split-brain EVER
✔ Predictable failure modes
```

---

## 9. ZooKeeper vs etcd: Philosophy Comparison

| Dimension              | ZooKeeper            | etcd                |
| ---------------------- | -------------------- | ------------------- |
| Primary role           | Coordination service | Consistent KV store |
| Session semantics      | First-class          | Lease-based         |
| Lock safety            | Extremely strong     | Strong but simpler  |
| Ordering primitives    | Built-in             | Limited             |
| API philosophy         | Explicit, low-level  | Simple, declarative |
| Cloud-native           | ❌                    | ✅                   |
| Operational simplicity | ❌                    | ✅                   |

---

## 10. Why Kubernetes Did NOT Choose ZooKeeper

Now the flip side.

Kubernetes **does not need**:

* Sequential znodes
* Complex lock trees
* Session-heavy logic

Kubernetes needs:

```
✔ State storage
✔ Event watching
✔ Simple transactions
✔ Declarative reconciliation
```

ZooKeeper would have been **overkill** and **harder to operate**.

---

## 11. Why ZooKeeper Is Still the “Primary Option” in Some Domains

ZooKeeper wins when:

### You need **coordination correctness > everything else**

Examples:

* Financial trading leader election
* Distributed job schedulers
* Metadata services with strict fencing
* Multi-writer consensus with fairness guarantees

In these systems:

> **A single incorrect lock is worse than total outage**

ZooKeeper optimizes for *never being wrong*, even if that means being unavailable.

---

## 12. Failure Mode Philosophy (Very Important)

### ZooKeeper failure philosophy

```
If unsure → stop
```

### etcd failure philosophy

```
If quorum exists → continue
```

Both are correct — but **ZooKeeper is stricter**.

---

## 13. Mental Model Summary

```
ZooKeeper = Distributed coordination kernel
etcd      = Distributed state store
```

ZooKeeper acts like a **kernel** enforcing rules.
etcd acts like a **database** holding truth.

---

## 14. Final Answer (Concise)

ZooKeeper is chosen over etcd when:

* **Coordination correctness is paramount**
* **Leader fencing must be absolute**
* **Fair ordering matters**
* **Failures must be explicit, not hidden**
* **Operational complexity is acceptable**

etcd is chosen when:

* **State correctness matters**
* **Watchability matters**
* **Cloud-native ops matter**
* **Simplicity matters**

---

## 15. One-Line Rule of Thumb

> **If you fear split-brain more than downtime → ZooKeeper**
> **If you fear operational complexity more than coordination edge cases → etcd**