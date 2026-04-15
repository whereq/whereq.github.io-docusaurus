---
title: "Deep Dive into Redis VII: Commands"
slug: Deep-Dive-into-Redis-VII-Commands
date: 2026-01-09
tags: [redis]
authors: whereq
---
## 📊 Document Overview
*Organized by usage frequency and modern patterns*

## 🏆 Top 10 Most Used Redis Commands

### 1. SET - Store Key-Value Pair
**Purpose:** Store string value with optional expiration

**Syntax:**
```redis
SET key value [EX seconds|PX milliseconds] [NX|XX]
```

**Real-life Scenarios:**
- User session storage
- Cache with TTL (Time-To-Live)
- Feature flag storage
- Temporary data storage

**Best Practices:**
```redis
# Cache with 60-second expiration
SET user:123:profile "{name: 'John', email: 'john@email.com'}" EX 60

# Set only if key doesn't exist (for locks)
SET lock:order:456 "processing" EX 30 NX

# Set only if key exists (for updates)
SET user:123:status "active" XX
```

**Diagram:**
```
┌─────────────────────────────────────────────┐
│           SET Command Flow                  │
├─────────────────────────────────────────────┤
│   Client                    Redis Server    │
│     │                           │           │
│     │  SET key value EX 30      │           │
│     │──────────────────────────>│           │
│     │                           │           │
│     │        "OK"               │           │
│     │<──────────────────────────│           │
│     │                           │           │
│     │      (30 seconds later)   │           │
│     │  GET key                  │           │
│     │──────────────────────────>│           │
│     │        (nil)              │           │
│     │<──────────────────────────│           │
└─────────────────────────────────────────────┘
```

### 2. GET - Retrieve Key Value
**Purpose:** Get value of a key

**Syntax:** `GET key`

**Real-life Scenarios:**
- Retrieve cached data
- Read configuration
- Check feature flags

**Examples:**
```redis
# Basic get
GET user:456:profile

# Use with EXISTS check first
EXISTS user:456:profile
GET user:456:profile

# Pattern for cache miss handling
GET product:789
# If nil, fetch from database and SET with EX
```

### 3. DEL - Delete Keys
**Purpose:** Remove one or more keys

**Syntax:** `DEL key [key ...]`

**Best Practices:**
```redis
# Delete single key
DEL user:123:session

# Delete multiple keys
DEL user:123:profile user:123:preferences user:123:cart

# Safer deletion with EXISTS check
EXISTS important:config
DEL important:config

# Use UNLINK for large keys in production (non-blocking)
UNLINK large:dataset:456
```

### 4. INCR/DECR - Atomic Counters
**Purpose:** Increment/decrement integer values atomically

**Real-life Scenarios:**
- Page view counters
- Rate limiting
- Inventory management
- Unique ID generation

**Examples:**
```redis
# Basic counter
SET page:views 0
INCR page:views  # Returns 1
INCR page:views  # Returns 2

# Rate limiting pattern
INCR rate:limit:192.168.1.1
EXPIRE rate:limit:192.168.1.1 60

# Decrement inventory
SET product:789:stock 100
DECR product:789:stock  # Returns 99

# Increment by specific amount
INCRBY user:123:score 50
DECRBY user:123:score 20
```

**Rate Limiting Diagram:**
```
┌─────────────────────────────────────────────────┐
│           Rate Limiting Pattern                 │
├─────────────────────────────────────────────────┤
│  Minute 1    │  Minute 2    │  Minute 3        │
│  ┌─────────┐ │  ┌─────────┐ │  ┌─────────┐    │
│  │Request 1│ │  │Request 1│ │  │Request 1│    │
│  │INCR key │ │  │INCR key │ │  │INCR key │    │
│  │EXPIRE   │ │  │EXPIRE   │ │  │EXPIRE   │    │
│  └─────────┘ │  └─────────┘ │  └─────────┘    │
│  │Request 2│ │  │Request 2│ │                 │
│  │INCR→2   │ │  │INCR→2   │ │                 │
│  └─────────┘ │  └─────────┘ │                 │
│  │Request 3│ │  │Request 3│ │                 │
│  │INCR→3   │ │  │INCR→3   │ │                 │
│  └─────────┘ │  └─────────┘ │                 │
│  │Request 4│ │  │Request 4│ │                 │
│  │INCR→4   │ │  │GET→4    │ │                 │
│  │IF >3    │ │  │IF >3    │ │                 │
│  │Reject   │ │  │Reject   │ │                 │
│  └─────────┘ │  └─────────┘ │                 │
└─────────────────────────────────────────────────┘
```

### 5. EXPIRE - Set Key Expiration
**Purpose:** Set timeout on key

**Syntax:** `EXPIRE key seconds`

**Modern Alternatives:**
```redis
# Set with expiration in one command (preferred)
SET session:abc123 "user_data" EX 3600

# Update existing key's TTL
EXPIRE cache:key 300
EXPIREAT cache:key 1672531200  # Unix timestamp

# Check remaining TTL
TTL session:abc123
# Returns: -2 (key doesn't exist)
# Returns: -1 (key exists, no expire)
# Returns: >0 (seconds remaining)

# Remove expiration
PERSIST important:config
```

### 6. HSET/HGET - Hash Operations
**Purpose:** Store field-value pairs within a key

**Real-life Scenarios:**
- User profiles
- Product information
- Object storage
- Partial updates

**Examples:**
```redis
# Store user profile
HSET user:123 name "John Doe" email "john@email.com" age 30

# Get specific fields
HGET user:123 name  # "John Doe"
HGET user:123 age   # "30"

# Get all fields
HGETALL user:123

# Update single field
HSET user:123 age 31

# Check if field exists
HEXISTS user:123 email

# Increment numeric field
HINCRBY user:123 visits 1

# Get multiple fields
HMGET user:123 name email phone
```

**Hash vs String Storage:**
```
┌─────────────────┐     ┌─────────────────┐
│  String Storage │     │   Hash Storage  │
├─────────────────┤     ├─────────────────┤
│                 │     │                 │
│  user:123       │     │  user:123       │
│  ────────────   │     │  ────────────   │
│  {              │     │  name: "John"   │
│    "name":      │     │  email: "john@" │
│    "John",      │     │  age: "30"      │
│    "email":     │     │                 │
│    "john@...",  │     │                 │
│    "age": 30    │     │                 │
│  }              │     │                 │
│                 │     │                 │
│  Memory: 100B   │     │  Memory: 80B    │
│                 │     │  (more efficient│
│                 │     │   for many flds)│
└─────────────────┘     └─────────────────┘
```

### 7. LPUSH/RPUSH - List Operations
**Purpose:** Add elements to lists

**Real-life Scenarios:**
- Message queues
- Activity feeds
- Recent items
- Job queues

**Examples:**
```redis
# Message queue pattern
LPUSH messages:queue "{job: 'process', data: {...}}"
LPUSH messages:queue "{job: 'email', data: {...}}"

# Worker processing
RPOP messages:queue  # Gets oldest item

# Recent activities
LPUSH user:123:activity "Logged in"
LPUSH user:123:activity "Viewed product:789"
LPUSH user:123:activity "Purchased item"

# Get range (last 10 activities)
LRANGE user:123:activity 0 9

# Fixed-length list (news feed)
LPUSH feed:global "News item 1"
LTRIM feed:global 0 99  # Keep only 100 items
```

**Message Queue Pattern:**
```
┌─────────────┐    LPUSH    ┌─────────────┐    RPOP/BLPOP   ┌─────────────┐
│  Producer   │───────────>│   Redis     │<───────────────│  Consumer   │
│             │            │   List      │                │             │
│             │            │  ┌───────┐  │                │             │
│             │            │  │ Msg 3 │  │                │             │
│             │            │  │ Msg 2 │  │                │             │
│             │            │  │ Msg 1 │  │                │             │
│             │            │  └───────┘  │                │             │
└─────────────┘            └─────────────┘                └─────────────┘
      │                           │                               │
      │                           │                               │
      │                       (FIFO Queue)                       │
      └──────────────────────────────────────────────────────────┘
```

### 8. SADD/SMEMBERS - Set Operations
**Purpose:** Store unique unordered elements

**Real-life Scenarios:**
- Tags/categories
- Unique visitors
- Friends/followers
- Vote tracking

**Examples:**
```redis
# Store tags
SADD article:456:tags "redis" "database" "nosql" "cache"

# Check membership
SISMEMBER article:456:tags "redis"  # Returns 1 (true)

# Get all members
SMEMBERS article:456:tags

# Set operations (powerful!)
SADD users:online "user1" "user2" "user3"
SADD users:active "user2" "user3" "user4"

# Intersection (users both online AND active)
SINTER users:online users:active  # ["user2", "user3"]

# Union (all unique users)
SUNION users:online users:active  # ["user1","user2","user3","user4"]

# Difference (online but not active)
SDIFF users:online users:active  # ["user1"]

# Random element (lottery, sampling)
SRANDMEMBER users:online
SPOP users:online  # Removes and returns random
```

### 9. ZADD/ZRANGE - Sorted Set Operations
**Purpose:** Store sorted unique elements with scores

**Real-life Scenarios:**
- Leaderboards
- Time-series data
- Priority queues
- Range queries

**Examples:**
```redis
# Leaderboard
ZADD leaderboard 1000 "player1"
ZADD leaderboard 850 "player2"
ZADD leaderboard 920 "player3"

# Get top 3 players
ZREVRANGE leaderboard 0 2 WITHSCORES

# Get player rank (0-indexed from top)
ZREVRANK leaderboard "player2"

# Increment score
ZINCRBY leaderboard 50 "player1"

# Range queries (scores 800-900)
ZRANGEBYSCORE leaderboard 800 900

# Time-series pattern
ZADD temperature:nyc 1672444800 "38.5"  # timestamp, value
ZADD temperature:nyc 1672448400 "39.2"
ZRANGEBYSCORE temperature:nyc 1672444800 1672448400
```

**Leaderboard Architecture:**
```
┌─────────────────────────────────────────────────┐
│            Redis Sorted Set Leaderboard         │
├─────────────────────────────────────────────────┤
│  Score   │  Member         │  Operations       │
├──────────┼─────────────────┼───────────────────┤
│  1050    │  player1        │  ZADD score       │
│  920     │  player3        │  ZINCRBY +50      │
│  850     │  player2        │  ZREVRANGE 0 2    │
│  720     │  player4        │  ZREVRANK player2 │
│  650     │  player5        │  ZRANGEBYSCORE    │
│          │                 │  800 1000         │
└──────────┴─────────────────┴───────────────────┘
     ▲
     │
     └─── Scores automatically sorted,
          O(log N) operations
```

### 10. SCAN - Safe Key Iteration
**Purpose:** Incrementally iterate keys without blocking

**Why not KEYS?**
- `KEYS *` blocks Redis (use in production with extreme caution)
- `SCAN` is non-blocking, production-safe

**Examples:**
```redis
# Iterate through all keys matching pattern
SCAN 0 MATCH user:* COUNT 100

# Iterate specific type
SCAN 0 MATCH product:* COUNT 50 TYPE string

# Hash scan
HSCAN user:123 0 MATCH *name* COUNT 10

# Set scan
SSCAN tags:article:456 0 COUNT 20

# Sorted set scan
ZSCAN leaderboard 0 COUNT 15
```

**SCAN Iteration Pattern:**
```
┌─────────────────────────────────────────────┐
│         SCAN Iteration Process              │
├─────────────────────────────────────────────┤
│  Initial: SCAN 0 MATCH user:* COUNT 5      │
│  Returns:                                   │
│   1) "5" (next cursor)                     │
│   2) ["user:1", "user:2", "user:3"]        │
│                                            │
│  Next: SCAN 5 MATCH user:* COUNT 5        │
│  Returns:                                  │
│   1) "12" (next cursor)                    │
│   2) ["user:4", "user:5"]                 │
│                                            │
│  Next: SCAN 12 MATCH user:* COUNT 5       │
│  Returns:                                  │
│   1) "0" (iteration complete)             │
│   2) ["user:6"]                           │
│                                            │
│  Cursor 0 = Done                          │
└─────────────────────────────────────────────┘
```

## 🏗️ Data Structure Selection Guide

```
┌─────────────────────────────────────────────────────────────┐
│         Choosing the Right Data Structure                   │
├──────────────┬────────────────┬─────────────┬───────────────┤
│ Use Case     │ Structure      │ Best For    │ Example       │
├──────────────┼────────────────┼─────────────┼───────────────┤
│ Simple Cache │ String         │ Single vals │ SET/GET       │
│              │                │ With TTL    │ user:session  │
├──────────────┼────────────────┼─────────────┼───────────────┤
│ Object Store │ Hash           │ Multiple    │ HSET/HGETALL  │
│              │                │ fields      │ user:profile  │
├──────────────┼────────────────┼─────────────┼───────────────┤
│ Queue        │ List           │ FIFO/LIFO   │ LPUSH/RPOP    │
│              │                │             │ jobs:queue    │
├──────────────┼────────────────┼─────────────┼───────────────┤
│ Unique Items │ Set            │ Membership  │ SADD/SISMEMBER│
│              │                │ Operations  │ article:tags  │
├──────────────┼────────────────┼─────────────┼───────────────┤
│ Rankings     │ Sorted Set     │ Scores      │ ZADD/ZRANGE   │
│              │                │ Ranges      │ leaderboard   │
├──────────────┼────────────────┼─────────────┼───────────────┤
│ Time Series  │ Sorted Set     │ Timestamps  │ ZADD ts:data  │
│              │ or Stream      │ Sequences   │ XADD log:stream│
└──────────────┴────────────────┴─────────────┴───────────────┘
```

## ⚡ Advanced & Modern Patterns

### 11. Pipeline - Batch Operations
**Purpose:** Reduce round-trip time

```redis
# Without pipeline (3 round trips)
SET user:1:name "John"
SET user:1:email "john@email.com"
SET user:1:age 30

# With pipeline (1 round trip)
MULTI
SET user:1:name "John"
SET user:1:email "john@email.com"
SET user:1:age 30
EXEC
```

### 12. Transactions - Atomic Operations
```redis
MULTI
GET account:123:balance
DECRBY account:123:balance 100
INCRBY account:456:balance 100
EXEC
```

### 13. Lua Scripting - Complex Atomic Operations
```redis
EVAL "local current = redis.call('GET', KEYS[1])
      if tonumber(current) < tonumber(ARGV[1]) then
        return redis.call('INCR', KEYS[1])
      else
        return nil
      end" 1 rate:limit:ip 10
```

### 14. Streams - Modern Message Queue
```redis
# Producer
XADD mystream * sensor-id 1234 temperature 19.8

# Consumer group
XGROUP CREATE mystream mygroup 0

# Consumer
XREADGROUP GROUP mygroup consumer1 COUNT 1 BLOCK 5000 STREAMS mystream >
```

## 🔐 Security & Production Commands

### 15. AUTH - Authentication
```redis
AUTH your_strong_password_here

# Better: Use Redis 6+ ACL
ACL SETUSER alice on >password ~cache:* +get +set
```

### 16. CONFIG - Configuration Management
```redis
# Get configuration
CONFIG GET maxmemory
CONFIG GET requirepass

# Set configuration (prefer redis.conf for persistence)
CONFIG SET maxmemory 2gb
CONFIG SET save "900 1 300 10 60 10000"

# Never expose these in production:
CONFIG SET requirepass ""  # DON'T!
CONFIG SET protected-mode no  # DON'T!
```

### 17. INFO - Monitoring
```redis
# Get all info (verbose)
INFO

# Get specific sections
INFO memory
INFO stats
INFO clients
INFO replication

# Critical metrics to monitor:
INFO memory  # used_memory, maxmemory, evictions
INFO stats   # instantaneous_ops_per_sec, keyspace_hits/misses
INFO persistence  # rdb_last_save_time, aof_rewrite_in_progress
```

## 🎯 Memory Optimization Commands

### 18. MEMORY USAGE
```redis
MEMORY USAGE large:key
MEMORY STATS
MEMORY PURGE  # Attempts to defragment (Redis 4+)
```

### 19. Efficient Data Encoding
```redis
# Use appropriate data types
# Strings under 44 bytes use EMBSTR encoding
SET small:key "short"  # More efficient

# Hashes with <= 512 fields use ziplist
HSET config:app field1 "val1" ... field500 "val500"

# Lists with small elements use ziplist
LPUSH recent:items "item1" "item2"  # Check list-max-ziplist* configs
```

## 📈 Performance Optimization Patterns

### Connection Pooling Diagram:
```
┌─────────────┐      ┌─────────────────┐      ┌─────────────┐
│   App       │      │   Connection    │      │   Redis     │
│   Server    │─────▶│     Pool        │─────▶│   Server    │
│             │      │                 │      │             │
│  Request 1  │      │  ┌───────────┐  │      │             │
│  ─────────  │      │  │ Connection│──┼─────▶│  Process    │
│  GET key    │      │  │    1      │  │      │  Request    │
│             │      │  └───────────┘  │      │             │
│  Request 2  │      │  ┌───────────┐  │      │             │
│  ─────────  │      │  │ Connection│──┼─────▶│  Process    │
│  SET key    │───┬─▶│  │    2      │  │      │  Request    │
│             │   │  │  └───────────┘  │      │             │
│  Request 3  │   │  │  ┌───────────┐  │      │             │
│  ─────────  │   └─▶│  │ Connection│──┼─────▶│  Process    │
│  INCR key   │      │  │    3      │  │      │  Request    │
│             │      │  └───────────┘  │      │             │
└─────────────┘      └─────────────────┘      └─────────────┘
```

### 20. Monitor Slow Logs
```redis
# Configure slow log
CONFIG SET slowlog-log-slower-than 10000  # 10ms
CONFIG SET slowlog-max-len 128

# View slow logs
SLOWLOG GET 10
SLOWLOG LEN
SLOWLOG RESET
```

## 🚫 Anti-Patterns to Avoid

### Bad Patterns:
```redis
# 1. KEYS * in production (use SCAN instead)
KEYS *  # BLOCKS SERVER!

# 2. Large values in single key
SET huge:key "[...10MB of data...]"  # Blocks during serialization

# 3. Not using TTL for cache
SET cache:key "data"  # Might fill memory

# 4. Using Redis as primary database
# Redis is in-memory - data can be lost

# 5. Not monitoring memory usage
# Leads to OOM (Out Of Memory) errors
```

### Good Patterns:
```redis
# 1. Use pipelining for bulk operations
MULTI
SET key1 "val1"
SET key2 "val2"
EXEC

# 2. Use appropriate data structures
# For object with many fields: Hash, not multiple String keys

# 3. Always set TTL for cache
SET session:abc "data" EX 3600

# 4. Use Lua scripts for complex atomic operations

# 5. Monitor with INFO and SLOWLOG
```

## 🔄 Replication & High Availability Commands

### 21. Replication Management
```redis
# On replica
REPLICAOF master-ip 6379
REPLICAOF NO ONE  # Promote to master

# Check replication status
INFO replication

# Monitor replication lag
redis-cli --latency
```

### 22. Sentinel & Cluster Commands
```redis
# Sentinel
SENTINEL MASTERS
SENTINEL GET-MASTER-ADDR-BY-NAME mymaster

# Cluster
CLUSTER NODES
CLUSTER INFO
CLUSTER SLOTS
```

## 🧹 Maintenance Commands

### 23. Backup & Persistence
```redis
# Manual save (blocks)
SAVE  # Synchronous, blocks
BGSAVE  # Asynchronous, forks

# Check persistence status
INFO persistence
LASTSAVE  # Unix timestamp of last save

# AOF operations
BGREWRITEAOF
```

### 24. Cleanup & Debugging
```redis
# Flush data (CAUTION!)
FLUSHDB    # Current database
FLUSHALL   # All databases

# Debug object
DEBUG OBJECT keyname

# Monitor commands in real-time
MONITOR  # Use sparingly, verbose

# Client management
CLIENT LIST
CLIENT KILL addr ip:port
CLIENT PAUSE timeout_ms  # Pause clients
```

## 📊 Monitoring Dashboard Metrics

```
┌─────────────────────────────────────────────────────┐
│              Redis Health Dashboard                 │
├─────────────────┬─────────────────┬─────────────────┤
│  Memory Usage   │  Command Stats  │  Connections    │
├─────────────────┼─────────────────┼─────────────────┤
│  Used: 1.2GB/2GB│  Ops/sec: 5,000 │  Connected: 45  │
│  60%            │  Hits: 98%      │  Max: 10,000    │
│  Peak: 1.8GB    │  Misses: 2%     │  Rejected: 0    │
│  Evictions: 0   │  Cmd/sec: 8,000 │  Timeout: 0     │
├─────────────────┼─────────────────┼─────────────────┤
│  Replication    │  Persistence    │  Keyspace       │
├─────────────────┼─────────────────┼─────────────────┤
│  Role: Master   │  RDB: Enabled   │  DB0 Keys: 45K  │
│  Slaves: 2      │  Last Save: 2m  │  Expires: 12K   │
│  Lag: 0.5s      │  AOF: Enabled   │  Avg TTL: 300s  │
│  Status: OK     │  Size: 500MB    │  Hit Rate: 99%  │
└─────────────────┴─────────────────┴─────────────────┘
```

## 🚀 Quick Reference Cheat Sheet

### Caching Patterns:
```redis
# Cache-aside pattern
1. GET cache:key
2. If nil, fetch from DB
3. SET cache:key value EX 300

# Write-through pattern
1. Update DB
2. SET cache:key new_value EX 300

# Write-behind pattern
1. SET cache:key new_value EX 300
2. Async update to DB
```

### Key Design Best Practices:
```
Good:           Bad:
user:123:profile    user_profile_123
session:abc123      abc123_session
product:789:views   product_views_789
geo:nyc:users       newyork_users_list

Pattern: object_type:id:field
```

### TTL Strategies:
```redis
# Cache: 5 minutes - 1 hour
SET cache:key value EX 300

# Session: 30 minutes - 24 hours
SET session:key data EX 1800

# Rate limit: 1 second - 1 minute
SET rate:limit:ip 1 EX 60 NX

# Leaderboard: 1 day - 7 days
EXPIRE leaderboard:daily 86400
```

## 🔍 Troubleshooting Commands

### 25. Diagnose Issues
```redis
# Check if Redis is alive
PING  # Should return PONG

# Check latency between commands
redis-cli --latency

# Monitor commands in real-time (debug)
MONITOR

# Check memory fragmentation
INFO memory | grep fragmentation

# List connected clients
CLIENT LIST

# Check slow queries
SLOWLOG GET 5
```

### 26. Performance Testing
```redis
# Benchmark tool (outside redis-cli)
redis-benchmark -t set,get -n 100000 -q

# Pipeline benchmark
redis-benchmark -t set,get -n 100000 -q -P 16
```

## 🎨 Visualization: Data Structure Memory Layout

```
String:
┌────────┬────────┬────────┐
│ Header │  Data  │  Null  │
│  Type  │ "value"│  term  │
└────────┴────────┴────────┘

Hash (ziplist encoding):
┌────┬────┬────┬────┬────┬────┐
│ ZL │ F1 │ V1 │ F2 │ V2 │ ZL │
│bytes│"name"│"John"│"age"│"30"│end │
└────┴────┴────┴────┴────┴────┘

List (quicklist):
┌─────────┬─────────┬─────────┐
│  Node   │  Node   │  Node   │
│ [ziplist│ [ziplist│ [ziplist│
│ "item1" │ "item4" │ "item7" │
│ "item2" │ "item5" │         │
│ "item3" │ "item6" │         │
└─────────┴─────────┴─────────┘
```

## 📚 Further Learning Path

### Next Steps:
1. **Redis Streams** - Modern message queues
2. **Redis Modules** - RediSearch, RedisJSON, RedisGraph
3. **Redis Cluster** - Horizontal scaling
4. **Redis Sentinel** - High availability
5. **Redis Enterprise** - Commercial features

### Production Checklist:
- [ ] Set `maxmemory` and eviction policy
- [ ] Enable persistence (RDB/AOF)
- [ ] Configure backups
- [ ] Set up monitoring
- [ ] Implement connection pooling
- [ ] Use key expiration
- [ ] Regular maintenance
- [ ] Disaster recovery plan

---

*Remember: Redis is single-threaded for commands. One slow command blocks all others. Always test commands in staging before production, and monitor performance metrics regularly.*