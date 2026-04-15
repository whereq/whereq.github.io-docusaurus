---
title: Distributed Counter System with Redis - II
slug: Distributed-Counter-System-with-Redis-II
date: 2026-01-07
tags: [redis, system-design]
authors: whereq
---
1. [Executive Summary](#1-executive-summary)
2. [System Overview](#2-system-overview)
3. [Architecture Design](#3-architecture-design)
4. [Data Model](#4-data-model)
5. [API Design](#5-api-design)
6. [Implementation Details](#6-implementation-details)
7. [Performance Optimization](#7-performance-optimization)
8. [High Availability & Disaster Recovery](#8-high-availability--disaster-recovery)
9. [Security Considerations](#9-security-considerations)
10. [Monitoring & Observability](#10-monitoring--observability)
11. [Deployment Strategy](#11-deployment-strategy)
12. [Cost Analysis](#12-cost-analysis)
13. [Appendices](#13-appendices)

---

## 1. Executive Summary

### 1.1 Purpose
This document outlines the design for a **distributed counter system** using Redis as the centralized data store. The system provides atomic, consistent, and high-performance counter operations across multiple application instances.

### 1.2 Business Requirements
- **Accuracy**: Counters must be accurate with zero data loss
- **Performance**: Support 100K+ operations per second
- **Scalability**: Horizontal scaling to handle growing traffic
- **Availability**: 99.99% uptime SLA
- **Real-time**: Sub-millisecond latency for counter operations

### 1.3 Use Cases
1. **Page view counters** (website analytics)
2. **API rate limiting** (throttling requests)
3. **Inventory management** (product stock tracking)
4. **Social media metrics** (likes, shares, followers)
5. **Event ticketing** (available seats tracking)
6. **Gaming leaderboards** (player scores)
7. **IoT device metrics** (sensor data aggregation)

### 1.4 Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Data Store** | Redis | In-memory speed, atomic operations, built-in data structures |
| **Deployment Model** | Redis Cluster | High availability, horizontal scalability |
| **Persistence** | RDB + AOF | Balance between performance and durability |
| **Client Library** | Lettuce (Java) / ioredis (Node.js) | Production-ready, connection pooling, cluster support |
| **Caching Strategy** | Write-through with local cache | Reduce Redis load while maintaining consistency |

---

## 2. System Overview

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Client Layer (Users/Apps)                    │
└───────────────────────┬─────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     Load Balancer (HAProxy/NGINX)                   │
│                  • Health checks                                     │
│                  • SSL termination                                   │
│                  • Request routing                                   │
└───────────────────────┬─────────────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Application  │ │ Application  │ │ Application  │
│ Server 1     │ │ Server 2     │ │ Server N     │
│              │ │              │ │              │
│ ┌──────────┐ │ │ ┌──────────┐ │ │ ┌──────────┐ │
│ │ Local    │ │ │ │ Local    │ │ │ │ Local    │ │
│ │ Cache    │ │ │ │ Cache    │ │ │ │ Cache    │ │
│ │(Optional)│ │ │ │(Optional)│ │ │ │(Optional)│ │
│ └──────────┘ │ │ └──────────┘ │ │ └──────────┘ │
│              │ │              │ │              │
│ ┌──────────┐ │ │ ┌──────────┐ │ │ ┌──────────┐ │
│ │ Counter  │ │ │ │ Counter  │ │ │ │ Counter  │ │
│ │ Client   │ │ │ │ Client   │ │ │ │ Client   │ │
│ └─────┬────┘ │ │ └─────┬────┘ │ │ └─────┬────┘ │
└───────┼──────┘ └───────┼──────┘ └───────┼──────┘
        │                │                │
        └────────────────┼────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      Redis Sentinel Cluster                          │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    Sentinel Nodes (Monitoring)                │  │
│  │  [Sentinel 1]    [Sentinel 2]    [Sentinel 3]               │  │
│  │   • Health monitoring  • Automatic failover                   │  │
│  └──────────────────┬───────────────────────────────────────────┘  │
│                     │                                               │
│  ┌──────────────────┴───────────────────────────────────────────┐  │
│  │                    Redis Master-Replica Set                   │  │
│  │                                                                │  │
│  │  ┌────────────┐       ┌────────────┐      ┌────────────┐    │  │
│  │  │   Master   │──────▶│  Replica 1 │      │  Replica 2 │    │  │
│  │  │            │       │            │      │            │    │  │
│  │  │ Shard 1    │       │  Shard 1   │      │  Shard 1   │    │  │
│  │  │ Slots:     │       │ (Read-only)│      │ (Read-only)│    │  │
│  │  │ 0-5460     │       │            │      │            │    │  │
│  │  └────────────┘       └────────────┘      └────────────┘    │  │
│  │                                                                │  │
│  │  ┌────────────┐       ┌────────────┐      ┌────────────┐    │  │
│  │  │   Master   │──────▶│  Replica 1 │      │  Replica 2 │    │  │
│  │  │            │       │            │      │            │    │  │
│  │  │ Shard 2    │       │  Shard 2   │      │  Shard 2   │    │  │
│  │  │ Slots:     │       │ (Read-only)│      │ (Read-only)│    │  │
│  │  │ 5461-10922 │       │            │      │            │    │  │
│  │  └────────────┘       └────────────┘      └────────────┘    │  │
│  │                                                                │  │
│  │  ┌────────────┐       ┌────────────┐      ┌────────────┐    │  │
│  │  │   Master   │──────▶│  Replica 1 │      │  Replica 2 │    │  │
│  │  │            │       │            │      │            │    │  │
│  │  │ Shard 3    │       │  Shard 3   │      │  Shard 3   │    │  │
│  │  │ Slots:     │       │ (Read-only)│      │ (Read-only)│    │  │
│  │  │ 10923-16383│       │            │      │            │    │  │
│  │  └────────────┘       └────────────┘      └────────────┘    │  │
│  └────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     Persistence Layer                                │
│  • RDB Snapshots (every 5 minutes)                                  │
│  • AOF Log (append-only file for durability)                        │
│  • Backup to S3/Cloud Storage (hourly)                             │
└─────────────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   Monitoring & Alerting                              │
│  • Prometheus (metrics collection)                                   │
│  • Grafana (visualization)                                          │
│  • PagerDuty (alerting)                                             │
│  • ELK Stack (logging)                                              │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.2 System Components

#### 2.2.1 Application Layer
- **Counter Client Library**: Handles connection pooling, retries, circuit breaking
- **Local Cache** (Optional): Reduces Redis load for read-heavy workloads
- **Business Logic**: Application-specific counter operations

#### 2.2.2 Redis Layer
- **Redis Cluster**: Distributed key-value store with automatic sharding
- **Sentinel**: Monitoring and automatic failover
- **Persistence**: RDB snapshots + AOF logging

#### 2.2.3 Infrastructure Layer
- **Load Balancer**: Distributes traffic across application servers
- **Monitoring**: Prometheus, Grafana, ELK stack
- **Backup**: Automated backups to cloud storage

### 2.3 Data Flow Diagrams

#### 2.3.1 Increment Counter Flow

```
┌──────────┐
│  Client  │
└────┬─────┘
     │
     │ 1. POST /counter/increment
     │    { counter: "page_views", value: 1 }
     ▼
┌─────────────────┐
│  App Server     │
│                 │
│  2. Check local │
│     cache       │
│     (optional)  │
└────┬────────────┘
     │
     │ 3. INCR counter:page_views
     ▼
┌─────────────────┐
│  Redis Master   │
│                 │
│  4. Atomic      │
│     increment   │
│                 │
│  5. Return new  │
│     value       │
└────┬────────────┘
     │
     │ 6. Replicate to replicas
     ▼
┌─────────────────┐
│  Redis Replica  │
│                 │
│  7. Async       │
│     replication │
└─────────────────┘
     │
     │ 8. Return response
     ▼
┌──────────┐
│  Client  │
│          │
│  Result: │
│  { value: 1001 }
└──────────┘
```

#### 2.3.2 Batch Increment Flow (Optimized)

```
Application Server
┌─────────────────────────────────────┐
│                                     │
│  1. Buffer increments (100ms)      │
│     • page_views: +5               │
│     • api_calls: +3                │
│     • errors: +1                   │
│                                     │
│  2. Flush buffer (batch)           │
└─────────┬───────────────────────────┘
          │
          │ 3. Pipeline command:
          │    INCRBY counter:page_views 5
          │    INCRBY counter:api_calls 3
          │    INCRBY counter:errors 1
          ▼
┌─────────────────────────────────────┐
│  Redis Master                       │
│                                     │
│  4. Execute pipeline atomically    │
│     • All or nothing               │
│     • Single network round trip    │
│                                     │
│  5. Return all results             │
│     [1005, 503, 42]                │
└─────────┬───────────────────────────┘
          │
          │ 6. Response
          ▼
┌─────────────────────────────────────┐
│  Application Server                 │
│                                     │
│  7. Update local cache (optional)  │
│  8. Return to client               │
└─────────────────────────────────────┘
```

---

## 3. Architecture Design

### 3.1 System Architecture Patterns

#### 3.1.1 Write-Through Cache Pattern

```
┌────────────────────────────────────────────────────────────┐
│                    Application Logic                       │
└─────────────────┬──────────────────────────────────────────┘
                  │
                  │ Increment counter
                  ▼
          ┌───────────────┐
          │ Is write op?  │
          └───┬───────┬───┘
              │       │
         Yes  │       │ No (read)
              ▼       ▼
     ┌────────────┐  ┌────────────┐
     │ Write to   │  │ Check      │
     │ Redis      │  │ local      │
     │ (MASTER)   │  │ cache      │
     └─────┬──────┘  └─────┬──────┘
           │               │
           │               │ Cache miss?
           │               ▼
           │         ┌────────────┐
           │         │ Read from  │
           │         │ Redis      │
           │         │ (REPLICA)  │
           │         └─────┬──────┘
           │               │
           ▼               ▼
     ┌──────────────────────────┐
     │ Update local cache       │
     │ (with TTL)               │
     └──────────────────────────┘
```

#### 3.1.2 Circuit Breaker Pattern

```
┌─────────────────────────────────────────────────────────┐
│                    Client Request                       │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
          ┌─────────────────┐
          │ Circuit Breaker │
          │ State?          │
          └────┬────┬───┬───┘
               │    │   │
       ┌───────┘    │   └────────┐
       │ CLOSED     │ OPEN       │ HALF-OPEN
       ▼            ▼            ▼
┌──────────┐  ┌──────────┐  ┌──────────┐
│ Execute  │  │ Fail     │  │ Try one  │
│ normally │  │ fast     │  │ request  │
└────┬─────┘  │          │  └────┬─────┘
     │        │          │       │
     │        │          │       │ Success?
     ▼        ▼          ▼       ▼
┌──────────────────────────────────────┐
│       Track Success/Failure          │
│                                      │
│  Failures > Threshold?               │
│    Yes → Open circuit                │
│                                      │
│  After timeout (30s)?                │
│    Yes → Half-open                   │
│                                      │
│  Half-open success?                  │
│    Yes → Close circuit               │
└──────────────────────────────────────┘
```

### 3.2 Deployment Architecture

#### 3.2.1 Multi-Region Setup

```
┌──────────────────────────────────────────────────────────────────┐
│                         Global Load Balancer                      │
│                      (GeoDNS / AWS Route53)                       │
└────────────┬─────────────────────────────────┬───────────────────┘
             │                                 │
    ┌────────┴────────┐               ┌───────┴────────┐
    │                 │               │                │
    ▼                 ▼               ▼                ▼
┌─────────────────────────┐      ┌─────────────────────────┐
│   Region: US-EAST-1     │      │   Region: EU-WEST-1     │
│                         │      │                         │
│  ┌──────────────────┐   │      │  ┌──────────────────┐   │
│  │ Redis Cluster    │   │      │  │ Redis Cluster    │   │
│  │ (Primary)        │◄──┼──────┼─▶│ (Replica)        │   │
│  │                  │   │      │  │                  │   │
│  │ • 3 Shards       │   │      │  │ • 3 Shards       │   │
│  │ • 2 Replicas ea. │   │      │  │ • Read-only      │   │
│  └──────────────────┘   │      │  └──────────────────┘   │
│                         │      │                         │
│  ┌──────────────────┐   │      │  ┌──────────────────┐   │
│  │ App Servers      │   │      │  │ App Servers      │   │
│  │ (3-10 instances) │   │      │  │ (3-10 instances) │   │
│  └──────────────────┘   │      │  └──────────────────┘   │
│                         │      │                         │
│  Cross-region           │      │  Cross-region           │
│  replication ───────────┼──────┼──────────────────────▶  │
│  (async, eventual       │      │                         │
│   consistency)          │      │                         │
└─────────────────────────┘      └─────────────────────────┘

    • Latency: 10-20ms              • Latency: 10-20ms
    • Write: US region              • Write: Replicate from US
    • Read: Local                   • Read: Local
```

#### 3.2.2 Kubernetes Deployment

```yaml
# Redis StatefulSet
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: redis-cluster
spec:
  serviceName: redis-cluster
  replicas: 6  # 3 masters + 3 replicas
  selector:
    matchLabels:
      app: redis-cluster
  template:
    metadata:
      labels:
        app: redis-cluster
    spec:
      containers:
      - name: redis
        image: redis:7.2-alpine
        ports:
        - containerPort: 6379
          name: client
        - containerPort: 16379
          name: gossip
        volumeMounts:
        - name: data
          mountPath: /data
        - name: conf
          mountPath: /conf
        command:
        - redis-server
        - /conf/redis.conf
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 100Gi

---
# Application Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: counter-service
spec:
  replicas: 5
  selector:
    matchLabels:
      app: counter-service
  template:
    metadata:
      labels:
        app: counter-service
    spec:
      containers:
      - name: app
        image: counter-service:v1.0
        env:
        - name: REDIS_CLUSTER_NODES
          value: "redis-cluster-0.redis-cluster:6379,redis-cluster-1.redis-cluster:6379"
        ports:
        - containerPort: 8080
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
```

---

## 4. Data Model

### 4.1 Redis Data Structures

#### 4.1.1 Simple Counter (STRING)

```
Key Pattern: counter:{name}
Value: Integer (64-bit signed)
TTL: Optional (for temporary counters)

Examples:
┌────────────────────────────────┬────────────┬─────────┐
│ Key                            │ Value      │ TTL     │
├────────────────────────────────┼────────────┼─────────┤
│ counter:page_views             │ 1,234,567  │ -1      │
│ counter:api:rate_limit:user123 │ 45         │ 3600s   │
│ counter:daily_signups:20260107 │ 892        │ 86400s  │
│ counter:product:SKU123:stock   │ 150        │ -1      │
└────────────────────────────────┴────────────┴─────────┘

Commands:
- INCR counter:page_views           → Increment by 1
- INCRBY counter:page_views 5       → Increment by 5
- DECR counter:product:SKU123:stock → Decrement by 1
- GET counter:page_views            → Read current value
- SET counter:page_views 0 EX 3600  → Reset with TTL
```

#### 4.1.2 Counter with Metadata (HASH)

```
Key Pattern: counter_meta:{name}
Value: Hash with multiple fields

Example: User engagement counter
┌────────────────────────────────────────────────────────┐
│ Key: counter_meta:user:12345                           │
├────────────────────┬───────────────────────────────────┤
│ Field              │ Value                             │
├────────────────────┼───────────────────────────────────┤
│ page_views         │ 1,234                             │
│ likes_given        │ 456                               │
│ comments_posted    │ 89                                │
│ shares             │ 23                                │
│ last_active        │ 2026-01-07T10:30:00Z              │
│ created_at         │ 2025-06-15T08:00:00Z              │
└────────────────────┴───────────────────────────────────┘

Commands:
- HINCRBY counter_meta:user:12345 page_views 1
- HGETALL counter_meta:user:12345
- HGET counter_meta:user:12345 page_views
- HMSET counter_meta:user:12345 last_active "2026-01-07T10:30:00Z"
```

#### 4.1.3 Time-Series Counter (SORTED SET)

```
Key Pattern: ts_counter:{name}
Value: Sorted Set (timestamp → count)

Example: Hourly page views
┌──────────────────────────────────────────────────────────┐
│ Key: ts_counter:page_views:hourly                        │
├──────────────────────┬───────────────────────────────────┤
│ Score (Timestamp)    │ Member (Count)                    │
├──────────────────────┼───────────────────────────────────┤
│ 1704697200           │ 15,234  (2026-01-07 08:00)        │
│ 1704700800           │ 18,456  (2026-01-07 09:00)        │
│ 1704704400           │ 21,789  (2026-01-07 10:00)        │
│ 1704708000           │ 19,234  (2026-01-07 11:00)        │
└──────────────────────┴───────────────────────────────────┘

Commands:
- ZADD ts_counter:page_views:hourly 1704697200 15234
- ZRANGE ts_counter:page_views:hourly 0 -1 WITHSCORES
- ZRANGEBYSCORE ts_counter:page_views:hourly 1704697200 1704708000
- ZCARD ts_counter:page_views:hourly  → Get total entries
```

#### 4.1.4 Distributed Counter with Sharding

```
Strategy: Split counter across multiple keys to reduce contention

Pattern: counter:{name}:shard:{N}
Total = SUM of all shards

Example: High-traffic page view counter
┌────────────────────────────────┬────────────┐
│ Key                            │ Value      │
├────────────────────────────────┼────────────┤
│ counter:homepage:shard:0       │ 342,156    │
│ counter:homepage:shard:1       │ 338,942    │
│ counter:homepage:shard:2       │ 345,789    │
│ counter:homepage:shard:3       │ 341,234    │
└────────────────────────────────┴────────────┘

Total = 342,156 + 338,942 + 345,789 + 341,234 = 1,368,121

Algorithm:
1. Hash counter name to determine shard: shard_id = hash(user_id) % NUM_SHARDS
2. Increment specific shard: INCR counter:homepage:shard:{shard_id}
3. Read total: MGET counter:homepage:shard:* and sum

Benefits:
• Reduces lock contention on single key
• Distributes load across cluster
• Improves write throughput
```

### 4.2 Key Naming Conventions

```
Standard Pattern: {namespace}:{entity}:{id}:{attribute}

Examples:
• counter:page_views                    - Simple global counter
• counter:user:12345:profile_views      - User-specific counter
• counter:product:SKU789:stock          - Product inventory
• counter:api:rate_limit:192.168.1.1    - IP-based rate limit
• counter:daily:signups:2026-01-07      - Date-based counter
• counter:campaign:SUMMER2026:clicks    - Campaign tracking

Hierarchical Structure:
counter
├── global
│   ├── page_views
│   ├── api_calls
│   └── errors
├── user
│   ├── {user_id}
│   │   ├── profile_views
│   │   ├── posts_created
│   │   └── followers
├── product
│   └── {sku}
│       ├── views
│       ├── purchases
│       └── stock
└── daily
    └── {date}
        ├── signups
        ├── revenue
        └── orders
```

### 4.3 Data Retention Policies

```
┌──────────────────────┬──────────────┬─────────────────────────┐
│ Counter Type         │ Retention    │ Strategy                │
├──────────────────────┼──────────────┼─────────────────────────┤
│ Real-time metrics    │ 24 hours     │ TTL=86400               │
│ Daily aggregates     │ 90 days      │ TTL=7776000             │
│ Monthly aggregates   │ 2 years      │ TTL=63072000            │
│ Permanent counters   │ Indefinite   │ No TTL                  │
│ Rate limit counters  │ 1 hour       │ TTL=3600                │
└──────────────────────┴──────────────┴─────────────────────────┘

Automatic Archival:
• Hourly job exports old counters to Data Warehouse
• Compressed and stored in S3/GCS
• Queryable via BigQuery/Athena
```

---

## 5. API Design

### 5.1 REST API Endpoints

#### 5.1.1 Counter Operations

```http
POST /api/v1/counters/{counterName}/increment
Content-Type: application/json

{
  "value": 1,
  "metadata": {
    "user_id": "12345",
    "source": "web"
  }
}

Response 200 OK:
{
  "counter": "page_views",
  "value": 1001,
  "timestamp": "2026-01-07T10:30:45Z"
}

---

GET /api/v1/counters/{counterName}

Response 200 OK:
{
  "counter": "page_views",
  "value": 1001,
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2026-01-07T10:30:45Z"
}

---

POST /api/v1/counters/{counterName}/decrement
Content-Type: application/json

{
  "value": 1
}

Response 200 OK:
{
  "counter": "product_stock",
  "value": 149,
  "timestamp": "2026-01-07T10:30:50Z"
}

---

POST /api/v1/counters/{counterName}/reset

Response 200 OK:
{
  "counter": "daily_views",
  "value": 0,
  "timestamp": "2026-01-07T00:00:00Z"
}

---

POST /api/v1/counters/batch
Content-Type: application/json

{
  "operations": [
    { "counter": "page_views", "action": "increment", "value": 1 },
    { "counter": "api_calls", "action": "increment", "value": 5 },
    { "counter": "errors", "action": "increment", "value": 1 }
  ]
}

Response 200 OK:
{
  "results": [
    { "counter": "page_views", "value": 1002 },
    { "counter": "api_calls", "value": 5678 },
    { "counter": "errors", "value": 43 }
  ]
}
```

### 5.2 Client Library Interface

#### 5.2.1 Java Client (Using Lettuce)

```java
public interface CounterClient {
    /**
     * Increment counter by 1
     * @param counterName Name of the counter
     * @return New counter value
     */
    CompletableFuture<Long> increment(String counterName);
    
    /**
     * Increment counter by specified value
     * @param counterName Name of the counter
     * @param value Amount to increment
     * @return New counter value
     */
    CompletableFuture<Long> incrementBy(String counterName, long value);
    
    /**
     * Decrement counter by specified value
     * @param counterName Name of the counter
     * @param value Amount to decrement
     * @return New counter value
     */
    CompletableFuture<Long> decrementBy(String counterName, long value);
    
    /**
     * Get current counter value
     * @param counterName Name of the counter
     * @return Current value
     */
    CompletableFuture<Long> get(String counterName);
    
    /**
     * Reset counter to zero
     * @param counterName Name of the counter
     * @return Success status
     */
    CompletableFuture<Boolean> reset(String counterName);
    
    /**
     * Batch operations
     * @param operations List of counter operations
     * @return Map of counter names to new values
     */
    CompletableFuture<Map<String, Long>> batchExecute(
        List<CounterOperation> operations
    );
}

// Usage Example
public class CounterService {
    private final CounterClient counterClient;
    
    public void trackPageView(String userId, String page) {
        counterClient.increment("page_views")
            .thenCompose(count -> 
                counterClient.incrementBy("user:" + userId + ":views", 1))
            .whenComplete((result, error) -> {
                if (error != null) {
                    log.error("Failed to track page view", error);
                } else {
                    log.info("Page view tracked: {}", result);
                }
            });
    }
}
```

#### 5.2.2 Node.js Client (Using ioredis)

```javascript
class CounterClient {
    constructor(redisClient) {
        this.redis = redisClient;
        this.localCache = new Map();
        this.cacheTTL = 60000; // 60 seconds
    }
    
    /**
     * Increment counter by 1
     * @param {string} counterName - Name of the counter
     * @returns {Promise<number>} New counter value
     */
    async increment(counterName) {
        const key = `counter:${counterName}`;
        const value = await this.redis.incr(key);
        this.updateLocalCache(counterName, value);
        return value;
    }
    
    /**
     * Increment counter by specified value
     * @param {string} counterName - Name of the counter
     * @param {number} value - Amount to increment
     * @returns {Promise<number>} New counter value
     */
    async incrementBy(counterName, value) {
        const key = `counter:${counterName}`;
        const newValue = await this.redis.incrby(key, value);
        this.updateLocalCache(counterName, newValue);
        return newValue;
    }
    
    /**
     * Get current counter value (with local cache)
     * @param {string} counterName - Name of the counter
     * @returns {Promise<number>} Current value
     */
    async get(counterName) {
        // Check local cache first
        const cached = this.localCache.get(counterName);
        if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
            return cached.value;
        }
        
        // Fetch from Redis
        const key = `counter:${counterName}`;
        const value = await this.redis.get(key);
        const numValue = parseInt(value) || 0;
        
        this.updateLocalCache(counterName, numValue);
        return numValue;
    }
    
    /**
     * Batch operations using pipeline
     * @param {Array<Object>} operations - List of operations
     * @returns {Promise<Array<number>>} Results
     */
    async batchExecute(operations) {
        const pipeline = this.redis.pipeline();
        
        for (const op of operations) {
            const key = `counter:${op.counter}`;
            switch (op.action) {
                case 'increment':
                    pipeline.incrby(key, op.value || 1);
                    break;
                case 'decrement':
                    pipeline.decrby(key, op.value || 1);
                    break;
                case 'get':
                    pipeline.get(key);
                    break;
            }
        }
        
        const results = await pipeline.exec();
        return results.map(([err, value]) => err ? null : value);
    }
    
    updateLocalCache(counterName, value) {
        this.localCache.set(counterName, {
            value,
            timestamp: Date.now()
        });
    }
}

// Usage Example
const counterClient = new CounterClient(redisClient);

// Track page view
await counterClient.increment('page_views');

// Batch operations
const results = await counterClient.batchExecute([
    { counter: 'page_views', action: 'increment', value: 1 },
    { counter: 'api_calls', action: 'increment', value: 5 },
    { counter: 'errors', action: 'get' }
]);
```

#### 5.2.3 Python Client (Using redis-py)

```python
from typing import Dict, List, Optional
import redis
from redis.cluster import RedisCluster
import asyncio
from datetime import datetime, timedelta

class CounterClient:
    def __init__(self, redis_client: RedisCluster):
        self.redis = redis_client
        self.local_cache: Dict[str, tuple[int, datetime]] = {}
        self.cache_ttl = timedelta(seconds=60)
    
    async def increment(self, counter_name: str) -> int:
        """Increment counter by 1"""
        key = f"counter:{counter_name}"
        value = await self.redis.incr(key)
        self._update_local_cache(counter_name, value)
        return value
    
    async def increment_by(self, counter_name: str, value: int) -> int:
        """Increment counter by specified value"""
        key = f"counter:{counter_name}"
        new_value = await self.redis.incrby(key, value)
        self._update_local_cache(counter_name, new_value)
        return new_value
    
    async def get(self, counter_name: str) -> int:
        """Get current counter value with local caching"""
        # Check local cache
        if counter_name in self.local_cache:
            value, timestamp = self.local_cache[counter_name]
            if datetime.now() - timestamp < self.cache_ttl:
                return value
        
        # Fetch from Redis
        key = f"counter:{counter_name}"
        value = await self.redis.get(key)
        num_value = int(value) if value else 0
        
        self._update_local_cache(counter_name, num_value)
        return num_value
    
    async def batch_execute(self, operations: List[Dict]) -> List[int]:
        """Execute multiple operations in a pipeline"""
        pipeline = self.redis.pipeline()
        
        for op in operations:
            key = f"counter:{op['counter']}"
            action = op['action']
            value = op.get('value', 1)
            
            if action == 'increment':
                pipeline.incrby(key, value)
            elif action == 'decrement':
                pipeline.decrby(key, value)
            elif action == 'get':
                pipeline.get(key)
        
        results = await pipeline.execute()
        return [int(r) if r else 0 for r in results]
    
    def _update_local_cache(self, counter_name: str, value: int):
        self.local_cache[counter_name] = (value, datetime.now())

# Usage
counter_client = CounterClient(redis_client)

# Track page view
count = await counter_client.increment('page_views')
print(f"Page views: {count}")

# Batch operations
results = await counter_client.batch_execute([
    {'counter': 'page_views', 'action': 'increment'},
    {'counter': 'api_calls', 'action': 'increment', 'value': 5},
    {'counter': 'errors', 'action': 'get'}
])
```

---

## 6. Implementation Details

### 6.1 Connection Management

#### 6.1.1 Connection Pool Configuration

```java
// Java - Lettuce Configuration
@Configuration
public class RedisConfig {
    
    @Bean
    public RedisClusterClient redisClusterClient() {
        List<RedisURI> nodes = Arrays.asList(
            RedisURI.create("redis://node1:6379"),
            RedisURI.create("redis://node2:6379"),
            RedisURI.create("redis://node3:6379")
        );
        
        ClusterClientOptions options = ClusterClientOptions.builder()
            .autoReconnect(true)
            .maxRedirects(3)
            .validateClusterNodeMembership(true)
            .build();
        
        return RedisClusterClient.create(nodes);
    }
    
    @Bean
    public GenericObjectPoolConfig<StatefulRedisClusterConnection> poolConfig() {
        GenericObjectPoolConfig config = new GenericObjectPoolConfig();
        config.setMaxTotal(50);           // Max connections
        config.setMaxIdle(20);            // Max idle connections
        config.setMinIdle(5);             // Min idle connections
        config.setMaxWaitMillis(2000);    // Max wait time
        config.setTestOnBorrow(true);     // Test before borrowing
        config.setTestWhileIdle(true);    // Test during idle
        return config;
    }
}
```

```javascript
// Node.js - ioredis Cluster Configuration
const Redis = require('ioredis');

const cluster = new Redis.Cluster([
    { host: 'node1', port: 6379 },
    { host: 'node2', port: 6379 },
    { host: 'node3', port: 6379 }
], {
    redisOptions: {
        password: process.env.REDIS_PASSWORD,
        tls: process.env.REDIS_TLS === 'true' ? {} : undefined
    },
    clusterRetryStrategy: (times) => {
        return Math.min(100 * times, 2000);
    },
    enableReadyCheck: true,
    maxRedirections: 16,
    retryDelayOnFailover: 100,
    retryDelayOnClusterDown: 300,
    slotsRefreshTimeout: 1000,
    enableOfflineQueue: true,
    lazyConnect: false
});

cluster.on('error', (err) => {
    console.error('Redis Cluster Error:', err);
});

cluster.on('ready', () => {
    console.log('Redis Cluster Ready');
});

module.exports = cluster;
```

### 6.2 Error Handling & Retry Logic

#### 6.2.1 Exponential Backoff Strategy

```
Retry Attempt Flow:
┌──────────────────────────────────────────────────────────┐
│ Attempt 1: Immediate                                     │
│   ↓ Failure                                              │
│ Wait: 100ms                                              │
│   ↓                                                      │
│ Attempt 2                                                │
│   ↓ Failure                                              │
│ Wait: 200ms                                              │
│   ↓                                                      │
│ Attempt 3                                                │
│   ↓ Failure                                              │
│ Wait: 400ms                                              │
│   ↓                                                      │
│ Attempt 4                                                │
│   ↓ Failure                                              │
│ Wait: 800ms                                              │
│   ↓                                                      │
│ Attempt 5                                                │
│   ↓ Failure                                              │
│ Give up, return error                                    │
└──────────────────────────────────────────────────────────┘

Formula: delay = min(baseDelay * 2^attempt, maxDelay)
```

```java
public class RetryableCounterClient {
    private static final int MAX_RETRIES = 5;
    private static final int BASE_DELAY_MS = 100;
    private static final int MAX_DELAY_MS = 5000;
    
    public CompletableFuture<Long> incrementWithRetry(String counterName) {
        return retryOperation(() -> increment(counterName), 0);
    }
    
    private <T> CompletableFuture<T> retryOperation(
            Supplier<CompletableFuture<T>> operation,
            int attempt) {
        
        return operation.get()
            .exceptionally(error -> {
                if (attempt >= MAX_RETRIES) {
                    throw new RuntimeException("Max retries exceeded", error);
                }
                
                if (isRetryableError(error)) {
                    int delay = calculateDelay(attempt);
                    log.warn("Retry attempt {} after {}ms", attempt + 1, delay);
                    
                    return CompletableFuture
                        .delayedExecutor(delay, TimeUnit.MILLISECONDS)
                        .execute(() -> retryOperation(operation, attempt + 1));
                } else {
                    throw new RuntimeException("Non-retryable error", error);
                }
            });
    }
    
    private int calculateDelay(int attempt) {
        return Math.min(
            BASE_DELAY_MS * (int) Math.pow(2, attempt),
            MAX_DELAY_MS
        );
    }
    
    private boolean isRetryableError(Throwable error) {
        return error instanceof TimeoutException ||
               error instanceof RedisConnectionException ||
               error instanceof RedisClusterException;
    }
}
```

### 6.3 Atomic Operations & Race Conditions

#### 6.3.1 Inventory Deduction with Stock Check

```lua
-- Lua script for atomic stock deduction
-- KEYS[1]: counter key (e.g., "counter:product:SKU123:stock")
-- ARGV[1]: amount to deduct
-- Returns: new stock level or -1 if insufficient stock

local current = redis.call('GET', KEYS[1])
if not current then
    return -1
end

local stock = tonumber(current)
local deduct = tonumber(ARGV[1])

if stock < deduct then
    return -1  -- Insufficient stock
end

local new_stock = redis.call('DECRBY', KEYS[1], deduct)
return new_stock
```

```java
public class InventoryService {
    private final RedisCommands<String, String> redis;
    private final String LUA_SCRIPT = """
        local current = redis.call('GET', KEYS[1])
        if not current then return -1 end
        local stock = tonumber(current)
        if stock < tonumber(ARGV[1]) then return -1 end
        return redis.call('DECRBY', KEYS[1], ARGV[1])
    """;
    
    public boolean deductInventory(String sku, int quantity) {
        String key = "counter:product:" + sku + ":stock";
        
        Long result = redis.eval(
            LUA_SCRIPT,
            ScriptOutputType.INTEGER,
            new String[]{key},
            String.valueOf(quantity)
        );
        
        if (result == -1) {
            log.warn("Insufficient stock for SKU: {}", sku);
            return false;
        }
        
        log.info("Stock deducted for {}: new level = {}", sku, result);
        return true;
    }
}
```

#### 6.3.2 Rate Limiting with Sliding Window

```lua
-- Sliding window rate limiter
-- KEYS[1]: rate limit key
-- ARGV[1]: window size (seconds)
-- ARGV[2]: max requests
-- ARGV[3]: current timestamp

local key = KEYS[1]
local window = tonumber(ARGV[1])
local max_requests = tonumber(ARGV[2])
local now = tonumber(ARGV[3])

-- Remove old entries outside the window
redis.call('ZREMRANGEBYSCORE', key, 0, now - window)

-- Count current requests in window
local current = redis.call('ZCARD', key)

if current < max_requests then
    -- Add new request
    redis.call('ZADD', key, now, now)
    redis.call('EXPIRE', key, window)
    return {1, max_requests - current - 1}  -- [allowed, remaining]
else
    return {0, 0}  -- [not allowed, remaining = 0]
end
```

### 6.4 Bulk Operations Optimization

#### 6.4.1 Batch Processing Pattern

```
Single Operation Pattern (Inefficient):
┌─────────────────────────────────────────────┐
│ For each increment:                         │
│   1. Network round trip (1-5ms)             │
│   2. Redis processing (0.1ms)               │
│   3. Network return (1-5ms)                 │
│                                             │
│ Total for 100 increments: 200-1000ms       │
└─────────────────────────────────────────────┘

Pipeline Pattern (Efficient):
┌─────────────────────────────────────────────┐
│ Batch 100 operations:                       │
│   1. Single network round trip (1-5ms)      │
│   2. Redis processes all (10ms)             │
│   3. Single network return (1-5ms)          │
│                                             │
│ Total for 100 increments: 12-20ms          │
│ Speedup: 10-50x faster!                     │
└─────────────────────────────────────────────┘
```

```javascript
class BatchProcessor {
    constructor(counterClient) {
        this.client = counterClient;
        this.buffer = [];
        this.flushInterval = 100; // ms
        this.maxBatchSize = 1000;
        
        // Start periodic flush
        setInterval(() => this.flush(), this.flushInterval);
    }
    
    async increment(counterName, value = 1) {
        return new Promise((resolve, reject) => {
            this.buffer.push({
                counter: counterName,
                action: 'increment',
                value,
                resolve,
                reject
            });
            
            // Flush immediately if buffer is full
            if (this.buffer.length >= this.maxBatchSize) {
                this.flush();
            }
        });
    }
    
    async flush() {
        if (this.buffer.length === 0) return;
        
        const batch = this.buffer.splice(0, this.maxBatchSize);
        
        try {
            const results = await this.client.batchExecute(
                batch.map(op => ({
                    counter: op.counter,
                    action: op.action,
                    value: op.value
                }))
            );
            
            // Resolve all promises
            batch.forEach((op, index) => {
                op.resolve(results[index]);
            });
        } catch (error) {
            // Reject all promises
            batch.forEach(op => op.reject(error));
        }
    }
}

// Usage
const batchProcessor = new BatchProcessor(counterClient);

// These will be batched automatically
await Promise.all([
    batchProcessor.increment('page_views'),
    batchProcessor.increment('api_calls', 5),
    batchProcessor.increment('errors')
]);
```

---

## 7. Performance Optimization

### 7.1 Performance Metrics

```
Target Performance SLAs:
┌────────────────────────┬──────────────┬─────────────┬──────────────┐
│ Operation              │ P50          │ P95         │ P99          │
├────────────────────────┼──────────────┼─────────────┼──────────────┤
│ Single increment       │ 1-2 ms       │ 5 ms        │ 10 ms        │
│ Batch increment (100)  │ 5-10 ms      │ 20 ms       │ 30 ms        │
│ Read (with cache)      │ 0.1-0.5 ms   │ 1 ms        │ 2 ms         │
│ Read (no cache)        │ 1-2 ms       │ 5 ms        │ 10 ms        │
└────────────────────────┴──────────────┴─────────────┴──────────────┘

Throughput Targets:
• Single Redis node: 50,000-100,000 ops/sec
• 3-node cluster: 150,000-300,000 ops/sec
• With client-side caching: 500,000+ reads/sec
```

### 7.2 Caching Strategy

#### 7.2.1 Multi-Level Caching

```
┌────────────────────────────────────────────────────────────┐
│                     Application Request                     │
└──────────────────┬─────────────────────────────────────────┘
                   │
                   ▼
         ┌─────────────────┐
         │  L1: In-Memory  │
         │  (Process-local)│
         │  TTL: 10-60s    │
         │  Size: 1,000    │
         └────┬────────────┘
              │ Cache miss
              ▼
         ┌─────────────────┐
         │  L2: Redis      │
         │  (Distributed)  │
         │  TTL: 300s      │
         │  Size: Unlimited│
         └────┬────────────┘
              │ Cache miss
              ▼
         ┌─────────────────┐
         │ L3: Database    │
         │ (PostgreSQL)    │
         │ TTL: Permanent  │
         └─────────────────┘

Performance Comparison:
• L1 hit: 0.1 ms  (99% hit rate for hot keys)
• L2 hit: 1-2 ms  (95% hit rate overall)
• L3 hit: 10-50 ms (rare, only on cold start)
```

#### 7.2.2 Cache Invalidation Strategies

```java
public class CacheInvalidationManager {
    
    // Strategy 1: TTL-based (simplest)
    public void setWithTTL(String key, long value, int ttlSeconds) {
        redis.setex(key, ttlSeconds, String.valueOf(value));
    }
    
    // Strategy 2: Write-through (consistency)
    public long incrementWithInvalidation(String counterName) {
        String key = "counter:" + counterName;
        long newValue = redis.incr(key);
        
        // Invalidate local caches across all app servers
        cacheInvalidationBus.publish("invalidate:" + counterName);
        
        return newValue;
    }
    
    // Strategy 3: Lazy invalidation (eventual consistency)
    public long getWithLazyInvalidation(String counterName) {
        LocalCacheEntry entry = localCache.get(counterName);
        
        if (entry != null && !entry.isExpired()) {
            return entry.getValue();
        }
        
        // Fetch fresh value
        long value = redis.get("counter:" + counterName);
        localCache.put(counterName, value, Duration.ofSeconds(60));
        
        return value;
    }
}
```

### 7.3 Sharding Strategy

#### 7.3.1 Consistent Hashing

```
Hash Ring Distribution:
                    0°
                    │
        Node C      │      Node A
         (240°)     │       (0°)
               ╲    │    ╱
                ╲   │   ╱
                 ╲  │  ╱
                  ╲ │ ╱
                   ╲│╱
        180° ────────────── 0°/360°
                   ╱│╲
                  ╱ │ ╲
                 ╱  │  ╲
                ╱   │   ╲
               ╱    │    ╲
        Node B      │      Node A
         (120°)     │      (360°)
                    │
                   180°

Key Mapping:
• hash("counter:page_views") = 45° → Node A
• hash("counter:api_calls") = 135° → Node B
• hash("counter:errors") = 270° → Node C

Benefits:
• Minimal key redistribution on node add/remove
• Balanced load distribution
• Built into Redis Cluster
```

#### 7.3.2 Manual Sharding for Hot Keys

```java
public class ShardedCounterClient {
    private static final int NUM_SHARDS = 10;
    
    public long incrementSharded(String counterName) {
        // Distribute writes across shards
        int shardId = ThreadLocalRandom.current().nextInt(NUM_SHARDS);
        String shardedKey = String.format(
            "counter:%s:shard:%d", 
            counterName, 
            shardId
        );
        
        return redis.incr(shardedKey);
    }
    
    public long getTotal(String counterName) {
        // Read from all shards and sum
        List<CompletableFuture<Long>> futures = new ArrayList<>();
        
        for (int i = 0; i < NUM_SHARDS; i++) {
            String shardedKey = String.format(
                "counter:%s:shard:%d",
                counterName,
                i
            );
            futures.add(redis.getAsync(shardedKey));
        }
        
        return CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
            .thenApply(v -> futures.stream()
                .mapToLong(f -> f.join())
                .sum())
            .join();
    }
}
```

---

## 8. High Availability & Disaster Recovery

### 8.1 Redis Cluster Architecture

```
High Availability Setup (3 Masters + 3 Replicas):

┌────────────────────────────────────────────────────────────┐
│                    Sentinel Monitoring Layer                │
│  [Sentinel 1]    [Sentinel 2]    [Sentinel 3]             │
│   • Quorum: 2 (majority of 3)                              │
│   • Health check interval: 1s                              │
│   • Failover timeout: 3s                                   │
└──────────────────┬─────────────────────────────────────────┘
                   │ Monitors
                   ▼
┌────────────────────────────────────────────────────────────┐
│                    Redis Cluster Nodes                      │
│                                                            │
│  ┌──────────┐         ┌──────────┐         ┌──────────┐  │
│  │ Master 1 │────────▶│Replica 1a│         │Replica 1b│  │
│  │ Slots:   │         │(standby) │         │(standby) │  │
│  │ 0-5460   │         │          │         │          │  │
│  └──────────┘         └──────────┘         └──────────┘  │
│                                                            │
│  ┌──────────┐         ┌──────────┐         ┌──────────┐  │
│  │ Master 2 │────────▶│Replica 2a│         │Replica 2b│  │
│  │ Slots:   │         │(standby) │         │(standby) │  │
│  │5461-10922│         │          │         │          │  │
│  └──────────┘         └──────────┘         └──────────┘  │
│                                                            │
│  ┌──────────┐         ┌──────────┐         ┌──────────┐  │
│  │ Master 3 │────────▶│Replica 3a│         │Replica 3b│  │
│  │ Slots:   │         │(standby) │         │(standby) │  │
│  │10923-    │         │          │         │          │  │
│  │16383     │         │          │         │          │  │
│  └──────────┘         └──────────┘         └──────────┘  │
└────────────────────────────────────────────────────────────┘

Failover Scenario:
1. Master 1 fails
2. Sentinels detect failure (1-3s)
3. Sentinels vote on promotion (quorum = 2)
4. Replica 1a promoted to Master
5. Clients automatically redirected
6. Total downtime: 3-5 seconds
```

### 8.2 Backup Strategy

```
Backup Architecture:
┌────────────────────────────────────────────────────────────┐
│                    Redis Master Nodes                       │
│  • RDB snapshots every 5 minutes                           │
│  • AOF log (append-only, fsync every second)               │
└──────────────────┬─────────────────────────────────────────┘
                   │
                   ▼
┌────────────────────────────────────────────────────────────┐
│                 Local Backup Storage                        │
│  • Last 24 hours of RDB snapshots                          │
│  • Rolling AOF logs                                        │
│  • Retention: 24 hours                                     │
└──────────────────┬─────────────────────────────────────────┘
                   │
                   │ Hourly sync
                   ▼
┌────────────────────────────────────────────────────────────┐
│              Cloud Storage (S3/GCS)                         │
│  • Compressed and encrypted backups                        │
│  • Retention policy:                                       │
│    - Hourly: 7 days                                        │
│    - Daily: 30 days                                        │
│    - Weekly: 1 year                                        │
│    - Monthly: 7 years (compliance)                         │
└────────────────────────────────────────────────────────────┘

Recovery Time Objectives (RTO):
• Hot standby failover: 3-5 seconds
• Restore from local backup: 5-10 minutes
• Restore from cloud backup: 30-60 minutes
• Disaster recovery (full rebuild): 2-4 hours

Recovery Point Objectives (RPO):
• With AOF: < 1 second data loss
• With RDB only: Up to 5 minutes data loss
• After disaster: Up to 1 hour data loss
```

### 8.3 Disaster Recovery Procedures

```bash
#!/bin/bash
# Disaster Recovery Script

DR_SCENARIO=$1  # "master_failure", "cluster_down", "data_corruption"

case $DR_SCENARIO in
    "master_failure")
        echo "Scenario: Redis Master Node Failure"
        echo "1. Sentinels detect failure automatically"
        echo "2. Wait for automatic failover (3-5s)"
        echo "3. Verify new master promotion"
        redis-cli -h sentinel-1 -p 26379 SENTINEL get-master-addr-by-name mymaster
        
        echo "4. Check cluster health"
        redis-cli --cluster check redis-node1:6379
        ;;
        
    "cluster_down")
        echo "Scenario: Entire Cluster Failure"
        echo "1. Stop all Redis processes"
        systemctl stop redis-cluster
        
        echo "2. Restore from latest backup"
        LATEST_BACKUP=$(aws s3 ls s3://redis-backups/ --recursive | sort | tail -n 1 | awk '{print $4}')
        aws s3 cp s3://redis-backups/$LATEST_BACKUP /var/lib/redis/dump.rdb
        
        echo "3. Start Redis cluster"
        systemctl start redis-cluster
        
        echo "4. Verify data integrity"
        redis-cli --cluster check redis-node1:6379
        ;;
        
    "data_corruption")
        echo "Scenario: Data Corruption Detected"
        echo "1. Identify corruption timestamp"
        echo "2. Restore from point-in-time backup"
        
        TARGET_TIME=$2
        aws s3 cp s3://redis-backups/backup-$TARGET_TIME.rdb /var/lib/redis/dump.rdb
        
        echo "3. Replay AOF from that point"
        redis-check-aof --fix /var/lib/redis/appendonly.aof
        
        echo "4. Restart and verify"
        systemctl restart redis-cluster
        ;;
esac

# Health Check
echo "=== Cluster Health Check ==="
redis-cli --cluster info redis-node1:6379
redis-cli --cluster check redis-node1:6379

# Test Counter Operations
echo "=== Testing Counter Operations ==="
redis-cli INCR test:counter
redis-cli GET test:counter
redis-cli DEL test:counter

echo "Recovery completed at $(date)"
```

---

## 9. Security Considerations

### 9.1 Security Architecture

```
Security Layers:
┌────────────────────────────────────────────────────────────┐
│ Layer 1: Network Security                                  │
│ • VPC/Private subnet                                       │
│ • Security groups (allow only app servers)                 │
│ • No public internet access                                │
└──────────────────┬─────────────────────────────────────────┘
                   │
┌──────────────────┴─────────────────────────────────────────┐
│ Layer 2: Transport Security                                │
│ • TLS 1.3 encryption for all Redis connections            │
│ • Certificate validation                                   │
│ • Mutual TLS (mTLS) for client authentication             │
└──────────────────┬─────────────────────────────────────────┘
                   │
┌──────────────────┴─────────────────────────────────────────┐
│ Layer 3: Authentication                                    │
│ • Redis AUTH password (minimum 32 characters)              │
│ • ACL (Access Control Lists) for fine-grained permissions │
│ • Separate credentials per application/environment         │
└──────────────────┬─────────────────────────────────────────┘
                   │
┌──────────────────┴─────────────────────────────────────────┐
│ Layer 4: Authorization                                     │
│ • ACL rules per user:                                      │
│   - read-only users: ~* +@read                            │
│   - app users: counter:* +@write +@read                   │
│   - admin: * +@all                                        │
└──────────────────┬─────────────────────────────────────────┘
                   │
┌──────────────────┴─────────────────────────────────────────┐
│ Layer 5: Data Protection                                   │
│ • Encryption at rest (disk encryption)                     │
│ • Encrypted backups                                        │
│ • Sensitive data masking in logs                           │
└────────────────────────────────────────────────────────────┘
```

### 9.2 Redis ACL Configuration

```bash
# redis.conf - Enable ACL
aclfile /etc/redis/users.acl
requirepass your-strong-password-here

# /etc/redis/users.acl
# Admin user (full access)
user admin on >StrongAdminPass123! ~* +@all

# Application user (limited to counter operations)
user counter_app on >AppSecretPass456! ~counter:* +@write +@read +@string -@dangerous

# Read-only monitoring user
user monitor on >MonitorPass789! ~* +@read -@write -@dangerous

# Disable default user
user default off nopass ~* -@all
```

### 9.3 Security Best Practices Checklist

```
✓ Network Security:
  ☑ Redis nodes in private subnet (no public IP)
  ☑ Security groups allow only app servers (port 6379)
  ☑ Sentinel nodes in separate security group (port 26379)
  ☑ VPN required for admin access
  
✓ Authentication & Authorization:
  ☑ Strong Redis AUTH password (32+ characters)
  ☑ ACL enabled with principle of least privilege
  ☑ Separate users for apps, admins, monitoring
  ☑ Password rotation every 90 days
  ☑ No hardcoded credentials (use secrets manager)
  
✓ Encryption:
  ☑ TLS 1.3 for all Redis connections
  ☑ Encryption at rest for data volumes
  ☑ Encrypted backups in S3/GCS
  ☑ Certificate pinning in clients
  
✓ Monitoring & Auditing:
  ☑ All Redis commands logged
  ☑ Failed authentication attempts alerted
  ☑ Abnormal traffic patterns detected
  ☑ Regular security audits scheduled
  
✓ Operational Security:
  ☑ Disable dangerous commands (FLUSHALL, KEYS, CONFIG)
  ☑ Resource limits (maxmemory, maxclients)
  ☑ Rate limiting at application layer
  ☑ Regular security patches applied
```

---

## 10. Monitoring & Observability

### 10.1 Metrics Collection

```
Monitoring Stack Architecture:
┌────────────────────────────────────────────────────────────┐
│                    Redis Cluster Nodes                      │
│  • Expose metrics on :9121 (redis_exporter)                │
└──────────────────┬─────────────────────────────────────────┘
                   │
                   │ Scrape every 15s
                   ▼
┌────────────────────────────────────────────────────────────┐
│                    Prometheus Server                        │
│  • Store metrics (15 days retention)                       │
│  • Evaluate alerting rules                                 │
│  • Federation to long-term storage                         │
└──────────────────┬─────────────────────────────────────────┘
                   │
         ┌─────────┴─────────┬──────────────┐
         │                   │              │
         ▼                   ▼              ▼
┌─────────────────┐  ┌─────────────┐  ┌──────────────┐
│    Grafana      │  │ AlertManager│  │  VictoriaDB  │
│  (Dashboards)   │  │  (Alerts)   │  │ (Long-term)  │
│  • Real-time    │  │  • PagerDuty│  │  • 1y data   │
│  • Historical   │  │  • Slack    │  │  • Analysis  │
└─────────────────┘  └─────────────┘  └──────────────┘
```

### 10.2 Key Metrics to Monitor

#### 10.2.1 Redis Metrics

```yaml
# Critical Redis Metrics
metrics:
  performance:
    - redis_commands_processed_total
      description: "Total commands processed"
      threshold: "< 100k/s = Warning"
      
    - redis_instantaneous_ops_per_sec
      description: "Current ops/sec"
      threshold: "> 80k/s = Capacity planning needed"
      
    - redis_command_duration_seconds
      description: "Command latency"
      threshold: "P99 > 10ms = Alert"
      
  memory:
    - redis_memory_used_bytes
      description: "Memory usage"
      threshold: "> 80% = Warning, > 90% = Critical"
      
    - redis_memory_fragmentation_ratio
      description: "Memory fragmentation"
      threshold: "> 1.5 = Consider restart"
      
    - redis_evicted_keys_total
      description: "Evicted keys (maxmemory-policy)"
      threshold: "> 0 = Warning (data loss)"
      
  replication:
    - redis_connected_slaves
      description: "Number of connected replicas"
      threshold: "< 1 = Critical (no HA)"
      
    - redis_master_repl_offset
      description: "Replication lag (bytes)"
      threshold: "> 10MB = Warning"
      
  connections:
    - redis_connected_clients
      description: "Active client connections"
      threshold: "> 10k = Warning"
      
    - redis_rejected_connections_total
      description: "Connection rejections"
      threshold: "> 0 = Critical (maxclients reached)"
      
  persistence:
    - redis_rdb_last_save_timestamp_seconds
      description: "Last successful save"
      threshold: "> 600s = Warning (backup failed)"
      
    - redis_aof_last_rewrite_duration_sec
      description: "AOF rewrite duration"
      threshold: "> 60s = Performance impact"
```

#### 10.2.2 Application Metrics

```java
// Micrometer metrics in Java
@Service
public class CounterMetricsService {
    private final MeterRegistry meterRegistry;
    
    public void recordIncrement(String counterName, long latencyMs) {
        // Counter metric
        meterRegistry.counter(
            "counter.operations",
            "operation", "increment",
            "counter_name", counterName
        ).increment();
        
        // Latency histogram
        meterRegistry.timer(
            "counter.latency",
            "operation", "increment"
        ).record(latencyMs, TimeUnit.MILLISECONDS);
    }
    
    public void recordError(String counterName, Exception error) {
        meterRegistry.counter(
            "counter.errors",
            "counter_name", counterName,
            "error_type", error.getClass().getSimpleName()
        ).increment();
    }
    
    public void recordCacheHit(boolean hit) {
        meterRegistry.counter(
            "counter.cache",
            "result", hit ? "hit" : "miss"
        ).increment();
    }
}

// Expose custom metrics
@RestController
public class MetricsController {
    @GetMapping("/metrics/counters")
    public Map<String, Object> getCounterMetrics() {
        return Map.of(
            "total_operations", getTotalOperations(),
            "cache_hit_rate", getCacheHitRate(),
            "average_latency_ms", getAverageLatency(),
            "error_rate", getErrorRate()
        );
    }
}
```

### 10.3 Grafana Dashboards

```
Dashboard: Redis Counter System Overview
┌──────────────────────────────────────────────────────────┐
│ Time Range: Last 24h        Auto-refresh: 30s           │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │ Operations  │  │ Latency P99 │  │ Error Rate  │    │
│  │  125k/s     │  │   3.2 ms    │  │   0.01%     │    │
│  │   ↑ 15%     │  │   ↓ 0.5ms   │  │   ↓ 0.005%  │    │
│  └─────────────┘  └─────────────┘  └─────────────┘    │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Operations per Second (24h)                      │  │
│  │ [Line graph showing ops/sec over time]           │  │
│  │ Peak: 150k at 14:00                              │  │
│  │ Current: 125k                                    │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌────────────────────┐  ┌──────────────────────────┐  │
│  │ Memory Usage       │  │ Top Counters (by ops)    │  │
│  │ [Gauge: 65%]       │  │ 1. page_views: 45k/s     │  │
│  │ 13GB / 20GB        │  │ 2. api_calls: 30k/s      │  │
│  │                    │  │ 3. user_actions: 25k/s   │  │
│  └────────────────────┘  │ 4. events: 15k/s         │  │
│                          │ 5. clicks: 10k/s         │  │
│  ┌────────────────────┐  └──────────────────────────┘  │
│  │ Cache Hit Rate     │                                 │
│  │ [Pie chart]        │  ┌──────────────────────────┐  │
│  │ Hits: 95%          │  │ Replication Lag          │  │
│  │ Misses: 5%         │  │ [Line graph]             │  │
│  └────────────────────┘  │ Master → Replica: 0.2s   │  │
│                          └──────────────────────────┘  │
├──────────────────────────────────────────────────────────┤
│ Recent Alerts:                                           │
│ • None - All systems operational ✓                      │
└──────────────────────────────────────────────────────────┘
```

### 10.4 Alerting Rules

```yaml
# prometheus-alerts.yml
groups:
  - name: redis_counter_alerts
    interval: 30s
    rules:
      # High latency alert
      - alert: HighRedisLatency
        expr: histogram_quantile(0.99, rate(redis_command_duration_seconds_bucket[5m])) > 0.010
        for: 5m
        labels:
          severity: warning
          component: redis
        annotations:
          summary: "High Redis latency detected"
          description: "P99 latency is {{ $value }}s (threshold: 10ms)"
          
      # Memory usage alert
      - alert: RedisMemoryHigh
        expr: (redis_memory_used_bytes / redis_memory_max_bytes) > 0.90
        for: 5m
        labels:
          severity: critical
          component: redis
        annotations:
          summary: "Redis memory usage critical"
          description: "Memory usage is {{ $value | humanizePercentage }} (threshold: 90%)"
          
      # Replication lag alert
      - alert: ReplicationLagHigh
        expr: redis_master_repl_offset - redis_slave_repl_offset > 10485760
        for: 2m
        labels:
          severity: warning
          component: redis
        annotations:
          summary: "High replication lag"
          description: "Lag is {{ $value | humanize1024 }}B behind master"
          
      # Connection pool exhaustion
      - alert: ConnectionPoolExhausted
        expr: rate(redis_rejected_connections_total[5m]) > 0
        for: 1m
        labels:
          severity: critical
          component: redis
        annotations:
          summary: "Redis rejecting connections"
          description: "Connection limit reached - scale up"
          
      # Application error rate
      - alert: HighCounterErrorRate
        expr: rate(counter_errors_total[5m]) > 10
        for: 5m
        labels:
          severity: warning
          component: application
        annotations:
          summary: "High counter operation error rate"
          description: "Error rate is {{ $value }} errors/sec"
```

---

## 11. Deployment Strategy

### 11.1 Environment Setup

```
Environment Progression:
┌────────────────────────────────────────────────────────┐
│ Development (Local)                                    │
│ • Single Redis node                                    │
│ • No replication                                       │
│ • Volume: 1k ops/sec                                   │
│ • Purpose: Feature development                         │
└────────────────┬───────────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────────────────┐
│ Staging (Cloud)                                        │
│ • 3-node cluster (1 master + 2 replicas per shard)    │
│ • Sentinel enabled                                     │
│ • Volume: 10k ops/sec                                  │
│ • Purpose: Integration testing, QA                     │
└────────────────┬───────────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────────────────┐
│ Production (Multi-region)                              │
│ • 9-node cluster (3 masters + 2 replicas each)        │
│ • Sentinel + Redis Cluster mode                       │
│ • Volume: 100k+ ops/sec                                │
│ • Purpose: Live traffic                                │
└────────────────────────────────────────────────────────┘
```

### 11.2 Blue-Green Deployment

```
Blue-Green Deployment Strategy:
┌────────────────────────────────────────────────────────┐
│                    Load Balancer                       │
│              Route: 100% → Blue                        │
└──────────────────┬─────────────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        ▼                     ▼
┌─────────────────┐    ┌─────────────────┐
│ Blue (Current)  │    │ Green (New)     │
│ v1.0            │    │ v1.1            │
│                 │    │                 │
│ Redis Cluster   │    │ Redis Cluster   │
│ • 3 shards      │    │ • 3 shards      │
│ • Production    │    │ • Standby       │
└─────────────────┘    └─────────────────┘

Deployment Steps:
1. Deploy v1.1 to Green environment
2. Run smoke tests on Green
3. Gradually shift traffic: 10% → 50% → 100%
4. Monitor for errors/latency
5. If successful: Blue becomes standby
6. If failure: Instant rollback to Blue
```

### 11.3 Canary Deployment

```
Canary Deployment Flow:
┌────────────────────────────────────────────────────────┐
│ Step 1: Deploy to 1% of users                          │
│ • Monitor for 1 hour                                   │
│ • Check: error rate, latency, success rate             │
└────────────────┬───────────────────────────────────────┘
                 │ ✓ Success
                 ▼
┌────────────────────────────────────────────────────────┐
│ Step 2: Increase to 10%                                │
│ • Monitor for 30 minutes                               │
└────────────────┬───────────────────────────────────────┘
                 │ ✓ Success
                 ▼
┌────────────────────────────────────────────────────────┐
│ Step 3: Increase to 50%                                │
│ • Monitor for 15 minutes                               │
└────────────────┬───────────────────────────────────────┘
                 │ ✓ Success
                 ▼
┌────────────────────────────────────────────────────────┐
│ Step 4: Full rollout to 100%                           │
│ • Continue monitoring                                  │
└────────────────────────────────────────────────────────┘

Traffic Split Configuration (Istio):
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: counter-service
spec:
  hosts:
    - counter-service
  http:
    - match:
        - headers:
            canary:
              exact: "true"
      route:
        - destination:
            host: counter-service
            subset: v2
          weight: 100
    - route:
        - destination:
            host: counter-service
            subset: v1
          weight: 90
        - destination:
            host: counter-service
            subset: v2
          weight: 10
```

### 11.4 Rolling Updates

```bash
#!/bin/bash
# Rolling update script for Redis Cluster

NODES=("node1" "node2" "node3" "node4" "node5" "node6")

for NODE in "${NODES[@]}"; do
    echo "Updating $NODE..."
    
    # 1. Check if node is master
    IS_MASTER=$(redis-cli -h $NODE -p 6379 ROLE | head -1)
    
    if [ "$IS_MASTER" == "master" ]; then
        echo "$NODE is master - triggering failover first"
        redis-cli -h $NODE -p 6379 CLUSTER FAILOVER
        sleep 5
    fi
    
    # 2. Stop Redis
    ssh $NODE "systemctl stop redis"
    
    # 3. Update Redis binary
    ssh $NODE "wget https://download.redis.io/releases/redis-7.2.3.tar.gz"
    ssh $NODE "tar xzf redis-7.2.3.tar.gz && cd redis-7.2.3 && make install"
    
    # 4. Start Redis
    ssh $NODE "systemctl start redis"
    
    # 5. Wait for node to rejoin cluster
    sleep 10
    
    # 6. Verify cluster health
    redis-cli --cluster check redis-node1:6379
    
    echo "$NODE updated successfully"
    echo "Waiting 60s before next node..."
    sleep 60
done

echo "Rolling update completed"
```

---

## 12. Cost Analysis

### 12.1 Infrastructure Costs (Monthly)

```
AWS Cost Breakdown (Production):
┌────────────────────────────┬──────────┬────────┬──────────┐
│ Component                  │ Quantity │ Unit $ │ Total $  │
├────────────────────────────┼──────────┼────────┼──────────┤
│ EC2: r6g.2xlarge (Redis)   │ 9 nodes  │ $250   │ $2,250   │
│ EBS: gp3 100GB             │ 9 vols   │ $10    │ $90      │
│ EC2: m6i.large (App)       │ 5 nodes  │ $70    │ $350     │
│ ALB (Load Balancer)        │ 1        │ $25    │ $25      │
│ Data Transfer (out)        │ 1TB      │ $90    │ $90      │
│ S3 Backup Storage          │ 500GB    │ $12    │ $12      │
│ CloudWatch (monitoring)    │ -        │ -      │ $50      │
│ VPN/Direct Connect         │ 1        │ $100   │ $100     │
├────────────────────────────┴──────────┴────────┼──────────┤
│ Total Monthly Cost                              │ $2,967   │
└─────────────────────────────────────────────────┴──────────┘

Cost per Million Operations:
• At 100M ops/day: $0.99 per million ops
• At 1B ops/day: $0.10 per million ops

Cost Optimization Opportunities:
• Reserved Instances: Save 30-40% ($890/month)
• Spot Instances for non-prod: Save 60-70%
• Graviton instances (r6g): 20% cheaper than r5
• S3 Glacier for old backups: 90% storage savings
```

### 12.2 Scaling Cost Projections

```
Growth Scenario Analysis:
┌─────────────┬───────────┬────────────┬─────────────┬──────────┐
│ Daily Ops   │ Nodes Req │ Monthly $  │ Cost/M ops  │ YoY      │
├─────────────┼───────────┼────────────┼─────────────┼──────────┤
│ 100M (now)  │ 9         │ $2,967     │ $0.99       │ Baseline │
│ 500M (6mo)  │ 15        │ $4,500     │ $0.30       │ +52%     │
│ 1B (1yr)    │ 27        │ $7,200     │ $0.24       │ +60%     │
│ 5B (2yr)    │ 45        │ $11,800    │ $0.08       │ +64%     │
└─────────────┴───────────┴────────────┴─────────────┴──────────┘

Key Insights:
• Cost per operation decreases with scale
• Non-linear scaling due to better utilization
• Breaking even with managed Redis at 500M ops/day
```

---

## 13. Appendices

### Appendix A: Redis Commands Reference

```bash
# Counter Operations
INCR counter:name              # Increment by 1
INCRBY counter:name 5          # Increment by 5
DECR counter:name              # Decrement by 1
DECRBY counter:name 3          # Decrement by 3
GET counter:name               # Get current value
SET counter:name 0             # Reset to 0

# Atomic Operations
GETSET counter:name 100        # Set and return old value
APPEND counter:name "text"     # Append to string

# Expiration
EXPIRE counter:name 3600       # Set TTL (seconds)
TTL counter:name               # Check remaining TTL
PERSIST counter:name           # Remove TTL

# Batch Operations
MGET counter:1 counter:2       # Get multiple
MSET counter:1 10 counter:2 20 # Set multiple

# Pipeline Example
redis-cli --pipe <<EOF
INCR counter:page_views
INCR counter:api_calls
INCR counter:errors
EOF
```

### Appendix B: Performance Benchmarks

```bash
# redis-benchmark command
redis-benchmark -h localhost -p 6379 \
  -t set,get,incr,lpush,lpop \
  -n 1000000 \
  -c 50 \
  -d 16 \
  --csv

# Results (r6g.2xlarge):
"test","rps","avg_latency_ms","min_latency","p50","p95","p99","p99.9"
"INCR",98765,0.51,0.24,0.48,0.72,1.20,2.15
"GET",102340,0.49,0.20,0.45,0.68,1.15,2.10
"SET",95420,0.53,0.25,0.50,0.75,1.25,2.20
"LPUSH",89230,0.56,0.28,0.53,0.80,1.35,2.40
```

### Appendix C: Troubleshooting Guide

```
Common Issues and Solutions:
┌─────────────────────────┬──────────────────────────────────┐
│ Issue                   │ Solution                         │
├─────────────────────────┼──────────────────────────────────┤
│ High latency           │ • Check network                  │
│                         │ • Increase connection pool      │
│                         │ • Use pipelining               │
│                         │ • Check slow log               │
├─────────────────────────┼──────────────────────────────────┤
│ Memory exhaustion       │ • Set maxmemory-policy         │
│                         │ • Add TTL to counters          │
│                         │ • Scale horizontally           │
│                         │ • Check for memory leaks       │
├─────────────────────────┼──────────────────────────────────┤
│ Connection refused      │ • Check Redis is running       │
│                         │ • Verify network rules         │
│                         │ • Check maxclients limit       │
│                         │ • Review authentication        │
├─────────────────────────┼──────────────────────────────────┤
│ Replication lag         │ • Check network bandwidth      │
│                         │ • Reduce write load            │
│                         │ • Optimize large values        │
│                         │ • Consider more replicas       │
├─────────────────────────┼──────────────────────────────────┤
│ Data inconsistency      │ • Check AOF/RDB config         │
│                         │ • Review fsync settings        │
│                         │ • Verify cluster slots         │
│                         │ • Check for split brain        │
└─────────────────────────┴──────────────────────────────────┘
```

### Appendix D: Glossary

- **AOF (Append-Only File)**: Durability mechanism that logs every write
- **Circuit Breaker**: Pattern to prevent cascading failures
- **Consistent Hashing**: Distribution algorithm for sharding
- **Gossip Protocol**: Cluster communication mechanism
- **Pipelining**: Sending multiple commands without waiting for replies
- **RDB (Redis Database)**: Point-in-time snapshot format
- **Sentinel**: High availability monitoring and failover
- **Sharding**: Distributing data across multiple nodes
- **Slot**: Unit of data distribution (16384 slots in cluster)
- **Write-Through**: Cache strategy where writes go to both cache and DB

---