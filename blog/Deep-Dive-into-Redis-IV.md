---
title: Deep Dive into Redis IV
slug: Deep-Dive-into-Redis-IV
date: 2026-01-08
tags: [redis]
authors: whereq
---
> **Slots are ONLY for routing, NOT for locating data.
> Redis finds data by key lookup in memory, not by slot.**

# How Redis Locates Data Inside a Shard (Deep Dive)

We’ll clarify **four different layers**, because confusion usually comes from mixing them:

1. **Routing layer (Cluster / Slots)**
2. **Process ownership layer (Master / Shard)**
3. **In-memory data structures**
4. **Persistence (RDB / AOF)**

---

## 1. Slot ≠ Data Location

### ❌ Common misunderstanding

> “Slot key tells Redis where the data is stored”

### ✅ Correct understanding

> **Slot only tells Redis WHICH MASTER should own the key**
>
> **It does NOT tell Redis WHERE inside memory the key lives**

---

## 2. What a Slot Really Is

A Redis slot is:

* An **integer label**: `0 ~ 16383`
* Computed by:

  ```
  slot = CRC16(key) % 16384
  ```
* Stored as **metadata**
* Used for **routing decisions only**

---

### Slot’s Responsibility

```
KEY  ──hash──▶ SLOT ──lookup──▶ MASTER NODE
```

That’s it.
After that, **slot is no longer involved**.

---

## 3. What Happens After Routing

Once the request reaches the correct master:

```
Client
  ↓
Correct Master
  ↓
Redis Process
  ↓
In-memory key lookup
```

At this point:

* Redis **does NOT use slots**
* Redis **does NOT use RDB**
* Redis **does NOT scan files**

---

## 4. Redis Is an In-Memory Database First

Redis always works like this:

```
WRITE:
Client → RAM → (later) RDB/AOF

READ:
Client → RAM
```

Persistence is **secondary**.

---

## 5. Core Data Structure: The Dictionary (Hash Table)

Every Redis instance maintains a **global in-memory dictionary**:

```
redisDb
└── dict
    ├── "user:whereq" → value_ptr
    ├── "order:1001" → value_ptr
    ├── "counter:login" → value_ptr
    └── ...
```

### This dictionary:

* Is a **hash table**
* Key lookup is **O(1) average**
* Slot is NOT part of the key

---

### Diagram: Inside a Redis Master

```
Redis Master (Shard Owner)
┌─────────────────────────────┐
│ redisDb                     │
│ ┌─────────────────────────┐ │
│ │ dict (hash table)       │ │
│ │ ┌──────────┐            │ │
│ │ │ key → ptr│───▶ Value  │ │
│ │ └──────────┘            │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

---

## 6. Then What Is a “Shard”?

In Redis terms:

> **A shard = one master + its replicas**

It is **not**:

* A separate data structure
* A file
* A memory region

It’s a **deployment and responsibility concept**.

---

### Logical Shard View

```
Shard A
├── Master A (owns slots 0–5460)
│   └── RAM: keys belonging to those slots
├── Replica A1
└── Replica A2
```

---

## 7. How Redis Ensures a Shard Only Contains Its Slots’ Data

Important rule:

> **A master only stores keys whose slots it owns**

This is enforced by:

* Slot ownership metadata
* Migration logic

---

### During Normal Operation

```
KEY "user:whereq"
↓
CRC16 → slot 5793
↓
Cluster metadata → Master A
↓
Stored in Master A’s dict
```

Master B **never sees this key**.

---

## 8. Slot Is NOT Stored With the Key

Internally, Redis stores:

```
key = "user:whereq"
value = '{"user":"whereq"}'
```

NOT:

```
slot = 5793
key = "user:whereq"
value = ...
```

Slot is **recomputed when needed**, not stored.

---

## 9. What About Slot Migration?

### Migration Moves DATA, Not Metadata Only

During migration:

```
Master A (slot 5793)
  |
  |-- key + value
  v
Master B
```

After migration:

* Master A deletes the key
* Master B stores the key in its own dict
* Metadata updates slot ownership

---

### Migration Diagram

```
Before:
Master A dict:  "user:whereq"
Master B dict:  (empty)

After:
Master A dict:  (deleted)
Master B dict:  "user:whereq"
```

Slot is just **the rule that decides this move**, not the container.

---

## 10. RDB Has No Index — Why That’s OK

You are correct:

> **RDB has no index**

That’s because:

* RDB is never queried directly
* Redis loads RDB into RAM at startup
* After loading, Redis rebuilds the hash table

---

### RDB Load Process

```
Redis restart
↓
Read RDB sequentially
↓
For each key:
  - allocate memory
  - insert into dict
↓
Ready for traffic
```

---

### Diagram: RDB Restore

```
dump.rdb
├── key1 → value1
├── key2 → value2
└── key3 → value3
        ↓
redisDb.dict
```

---

## 11. What Happens If RDB Contains “Wrong” Keys?

Example:

* Slot migrated away
* Old RDB still contains keys

On startup:

1. Redis loads all keys
2. Cluster metadata says:

   * “You do NOT own slot 5793”
3. Redis:

   * Deletes or refuses those keys
   * Or resyncs from correct master

✔ **Metadata always wins**

---

## 12. Full Request Lifecycle (End-to-End)

```
Client
  ↓
Hash key → slot
  ↓
Cluster metadata lookup
  ↓
Correct master
  ↓
Redis dict lookup
  ↓
Return value
```

---

### End-to-End Diagram

```
┌────────┐
│ Client │
└───┬────┘
    │ CRC16(key)
    ▼
┌────────────┐
│ Slot (5793)│
└───┬────────┘
    │ metadata
    ▼
┌────────────┐
│ Master A   │
│ redisDb    │
│ dict[key]  │
└────────────┘
```

---

## 13. Key Takeaways (Very Important)

### ✅ Correct Mental Model

| Concept  | Role                     |
| -------- | ------------------------ |
| Slot     | Routing label            |
| Shard    | Ownership responsibility |
| Master   | Data holder              |
| RAM dict | Actual data location     |
| RDB      | Cold backup              |
| AOF      | Change log               |

---

### 🔥 Golden Rule

> **Redis never locates data by slot.
> Redis locates data by key lookup in RAM.
> Slot only decides WHICH Redis instance is allowed to hold that key.**

---
