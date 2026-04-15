---
title: "Deep Dive into Redis V: Magic Hash"
slug: Deep-Dive-into-Redis-V-Magic-Hash
date: 2026-01-08
tags: [redis]
authors: whereq
---
# Questions:
1. What the Redis “magic hash” really is
2. Why keys are **not strings**, but **SDS pointers**
3. How Redis achieves **O(1)** lookup without slots
4. How Redis dict works internally (buckets, hashing, collisions)
5. Why this is faster than slot-based indexing
6. What happens during rehashing (without stopping the world)

---

# Redis “Magic Hash”: How Redis Finds Data in O(1)

> **Redis does NOT use slots to find data**
> **Redis does NOT scan memory**
> **Redis uses a very carefully designed hash table**

This is the *real* magic.

---

## 1. First: Redis Keys Are NOT Strings

When you do:

```
SET user:whereq {"user":"whereq"}
```

Internally:

* `"user:whereq"` is stored as an **SDS**
* SDS = *Simple Dynamic String*
* Redis stores a **pointer** to SDS, not a raw string

---

### Internal Representation

```
key (char*) ──▶ SDS struct
                 ├── len
                 ├── alloc
                 └── buf[] = "user:whereq"
```

So when Redis “hashes the key”, it hashes:

> **the bytes in SDS.buf**, not a language string

---

## 2. Redis Dict: The Core Data Structure

Every Redis instance has:

```
redisDb
└── dict
```

This `dict` is a **hash table**, implemented as:

```
dict
├── ht[0]  (current table)
├── ht[1]  (rehashing table)
├── rehashidx
```

---

### Diagram: Redis Dict Layout

```
dict
├── ht[0]
│   ├── bucket[0] → entry → entry → NULL
│   ├── bucket[1] → NULL
│   ├── bucket[2] → entry → NULL
│   └── ...
├── ht[1] (used only during rehash)
└── rehashidx
```

---

## 3. The “Magic Hash” Function

Redis uses **SipHash** (modern Redis) for dict keys.

### Why SipHash?

| Reason     | Benefit                        |
| ---------- | ------------------------------ |
| Fast       | O(1) average                   |
| Secure     | Prevents hash-flooding attacks |
| Stable     | Good distribution              |
| Byte-based | Works on SDS.buf               |

---

### Hashing Flow

```
SDS.buf ("user:whereq")
     ↓
SipHash(key_bytes, secret_seed)
     ↓
64-bit hash value
```

This hash value is **not** the Redis slot hash.

---

## 4. From Hash → Bucket Index

Redis converts the hash to a bucket index:

```
index = hash & (table_size - 1)
```

Why this works:

* Table size is always power of 2
* Bitwise AND is faster than modulo

---

### Example

```
hash = 0xA92F4C19
table_size = 1024

index = hash & 1023
```

⚡ **One CPU instruction**

---

## 5. O(1) Lookup Path (Real Path)

When Redis reads a key:

```
1. Hash SDS.buf (SipHash)
2. Compute bucket index
3. Follow pointer
4. Compare keys (rare collisions)
5. Return value
```

---

### Diagram: Lookup Path

```
GET user:whereq
        ↓
SipHash(SDS.buf)
        ↓
bucket index
        ↓
bucket pointer
        ↓
dictEntry
        ↓
value pointer
```

---

## 6. Collision Handling (Still O(1))

Redis uses **separate chaining**:

```
bucket[i] → entry → entry → NULL
```

Why collisions stay rare:

* Good hash function
* Resize before load factor is high

---

### Load Factor Rules

| Condition         | Action |
| ----------------- | ------ |
| load factor ≥ 1   | expand |
| load factor ≤ 0.1 | shrink |

This keeps chains short.

---

## 7. Incremental Rehashing (No Stop-the-World)

When resizing is needed:

* Redis allocates ht[1]
* Gradually moves buckets from ht[0] → ht[1]
* Each command migrates a few buckets

---

### Rehashing Diagram

```
Before:
ht[0] → buckets
ht[1] → empty

During:
ht[0] → some buckets
ht[1] → some buckets
rehashidx → moving pointer

After:
ht[0] empty
ht[1] becomes new ht[0]
```

Reads check **both tables** during rehash.

---

## 8. Why Slots Are NOT Used for Lookup

Now your key insight:

> “Why not use slot to locate data?”

Because:

| Slot          | Dict           |
| ------------- | -------------- |
| 16K fixed     | Dynamic size   |
| Routing only  | Data access    |
| Cluster-level | Instance-level |
| Coarse        | Precise        |

Slot would require **secondary index**. Redis avoids this entirely.

---

## 9. Why This Is Faster Than Slot-Based Lookup

If Redis used slots to locate data:

```
slot → table → bucket → key
```

Current Redis:

```
hash(key) → bucket → key
```

Fewer indirections = faster.

---

## 10. Slot vs Dict Hash (Very Important)

| Purpose         | Hash Used |
| --------------- | --------- |
| Cluster routing | CRC16     |
| Key lookup      | SipHash   |

They are **completely independent**.

---

## 11. Full Mental Model (Correct)

```
Client
  ↓
CRC16(key) → slot → master
  ↓
SipHash(key) → bucket → dictEntry
  ↓
value
```

---

### Full Stack Diagram

```
┌────────┐
│ Client │
└───┬────┘
    │
    ▼
CRC16(key) ──▶ Slot ──▶ Master Node
                          │
                          ▼
                    SipHash(key)
                          │
                          ▼
                    Hash Table Bucket
                          │
                          ▼
                    dictEntry → Value
```

---

## 12. Why Redis Can Promise O(1)

Redis guarantees:

> **O(1) average time complexity**

Because:

* Good hash
* Controlled load factor
* Incremental rehash
* In-memory pointers

Worst-case exists (like any hash table), but is practically avoided.

---

## 13. Final Takeaway (Key Insight)

> **Slots route traffic.
> Dict hashes locate data.
> RDB/AOF persist state.
> None of them replace the others.**

Redis is fast because **each layer does only one job** — and does it extremely well.

---