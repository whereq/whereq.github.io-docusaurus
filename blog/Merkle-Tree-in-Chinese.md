---
title: Merkle Tree in Chinese
slug: Merkle-Tree-in-Chinese
date: 2025-04-21
tags: [cypto-currency, ethereum, data-structure, merkle-tree]
authors: whereq
---
Merkle Tree（默克尔树）在区块链、密码学和数据完整性验证中是一个非常核心的概念。它是一种**树状数据结构**，用来高效而安全地验证数据的完整性。

---

## 🌳 一、Merkle Tree 是什么？

Merkle Tree 是一种**二叉树结构**，每个叶子节点是某一笔数据的哈希值，每个非叶子节点是其子节点哈希值的组合再哈希后的结果，直到根节点 —— Merkle Root。

### 📌 特点：

- 快速验证某条数据是否属于某批数据（O(log n)）
- 数据完整性校验非常高效
- 广泛用于区块链中（比特币、以太坊）以验证交易

---

## 🧩 二、图示说明

假设我们有 4 个交易 `Tx0, Tx1, Tx2, Tx3`：

```
               Merkle Root
                   │
           ┌───────┴────────┐
           │                │
        Hash01           Hash23
       ┌────┴────┐      ┌────┴────┐
    Hash0      Hash1  Hash2     Hash3
    │            │     │          │
  Tx0          Tx1   Tx2        Tx3
```

### 哈希过程：

- `Hash0 = hash(Tx0)`，`Hash1 = hash(Tx1)`
- `Hash01 = hash(Hash0 + Hash1)`
- `Merkle Root = hash(Hash01 + Hash23)`

---

## 💡 三、Merkle Tree 的作用

### ✅ 在区块链中主要用来：

| 用途                      | 说明 |
|---------------------------|------|
| 验证交易是否在区块中       | 比如比特币 SPV（轻节点）用来验证一笔交易是否在区块中，无需下载整个区块 |
| 保证数据不可篡改           | 即使更改一笔交易，Merkle Root 也会完全不同 |
| 批量处理大量数据的完整性验证 | 用于 IPFS、文件校验、区块快照 |

---

## 🧪 四、一个简单的 Merkle Tree 实现（用 JavaScript）

```ts
import { createHash } from 'crypto';

function sha256(data: string) {
  return createHash('sha256').update(data).digest('hex');
}

// 构建 Merkle Tree 并返回根节点
function buildMerkleTree(leaves: string[]): string {
  if (leaves.length === 0) return '';

  let level = leaves.map(sha256);

  while (level.length > 1) {
    const nextLevel: string[] = [];

    for (let i = 0; i < level.length; i += 2) {
      const left = level[i];
      const right = level[i + 1] ?? left; // 如果是奇数，复制最后一个
      nextLevel.push(sha256(left + right));
    }

    level = nextLevel;
  }

  return level[0];
}

// 示例
const txs = ['tx0', 'tx1', 'tx2', 'tx3'];
console.log('Merkle Root:', buildMerkleTree(txs));
```

---

## 🔍 五、如何验证某笔交易在 Merkle Tree 中？

验证步骤是：

1. 获取你那笔交易的哈希（比如 `tx1 → h1`）
2. 获取你需要验证路径的兄弟节点哈希（称为“Merkle Proof”）
3. 逐层拼接并计算，直到得出 Merkle Root
4. 看是否和真正的 Merkle Root 匹配

这样你就可以**仅凭部分数据验证整批数据完整性**，这在区块链轻节点中尤为重要。

---

## 📦 六、真实区块链场景

### 以太坊中：

- 并不直接使用二叉 Merkle Tree，而是使用改进版：**Merkle Patricia Trie** 来处理状态（账户、余额等）
- 区块头中的 `transactionsRoot`、`stateRoot` 等字段就是 Merkle 根

### 比特币中：

- 区块中的 `merkle_root` 字段是所有交易的 Merkle 根
- 支持轻节点（SPV）通过 Merkle Proof 验证交易

---

## 🧾 七、总结重点

| 项目       | 内容                                                         |
|------------|--------------------------------------------------------------|
| 是什么     | 二叉哈希树，用于验证大批数据中某一条数据是否存在              |
| 为什么重要 | 高效验证、防篡改、轻节点支持                                 |
| 区块链用途 | 交易验证、状态验证、数据完整性证明                           |
| 优点       | 空间占用小，验证时间快（对数级别），可组合证明               |
