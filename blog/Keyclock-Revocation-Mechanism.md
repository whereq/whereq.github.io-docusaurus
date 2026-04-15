---
title: Keyclock Revocation Mechanism
slug: Keyclock-Revocation-Mechanism
date: 2025-12-02
tags: [deep-dive, keycloak]
authors: whereq
---
# 🔥 **Q1 — How does Keycloak revoke access across all sessions, devices, and clients?**

### ⭐ **Senior-Level Answer**

Keycloak maintains a **server-side Session Store** (in-memory or distributed depending on the cluster).
This enables Keycloak to **centrally track active user sessions** including:

* Each login session
* Access tokens issued
* Refresh tokens issued
* Client sessions
* Offline sessions
* Device-specific sessions

### When a user logs out or an admin revokes access, Keycloak performs:

## **1. Session invalidation in the Session Store**

Keycloak marks the user session as **invalid** inside its central session map:

```
session_id -> state = INVALID
```

This invalidation immediately affects:

* All clients (web apps, mobile apps, services)
* All sessions (browser, mobile, REST clients)
* All tokens linked to the session

This is because **all tokens in Keycloak are tied to a Keycloak session ID** (`sid` claim).

---

## **2. Refresh Token Blacklist / revocation**

Keycloak stores refresh tokens in a **server-side token store** (unlike fully stateless JWT systems).

When the user logs out:

* All refresh tokens belonging to the session are invalidated.
* Any refresh request with those tokens is rejected.

This blocks all new access tokens across all devices.

---

## **3. Token Introspection (for OAuth2 Introspection clients)**

If a client uses `token_introspection`:

```
/protocol/openid-connect/token/introspect
```

Keycloak will return:

```
"active": false
```

as soon as the session is invalidated.

This enables immediate revocation for “online” services.

---

## **4. Realm-wide or client-side Revocation Events**

Keycloak issues **revocation events** when:

* Admin revokes all sessions
* Client is removed
* Roles or permissions change
* User is disabled

Clients using **Keycloak Adapters** (Tomcat, Spring, Node, Quarkus) receive the event and **invalidate local caches** of tokens.

---

# ⭐ Why Keycloak Can Do This (Technical Reason)

Because **Keycloak is NOT fully stateless**.
It manages a **stateful authentication session**, and tokens reference that session.

Therefore, revocation propagates instantly and globally.

---

# 🔥 **Q2 — Why can’t typical stateless JWT systems revoke access as effectively?**

### ⭐ **Senior-Level Answer**

A typical stateless JWT architecture uses **self-contained JWTs**:

* Token verification is done by services *locally* via public key.
* Services do not contact the authorization server again after token issuance.

This means:

### ❌ Once a JWT is issued, it cannot be revoked until it expires

Unless you add non-standard extensions.

### ❌ No central session store

There is nowhere to mark a session as invalid.

### ❌ No refresh token blacklist

Unless implemented manually with a database or Redis.

### ❌ No push revocation events to API clients

(Standard OAuth2 libraries don’t have this built in.)

---

## 💥 Final summary:

### **Keycloak (stateful + centralized session model)**

✔ Server-side session invalidation
✔ Refresh token revocation
✔ Token introspection
✔ Push revocation events to adapters
✔ Offline session management
✔ Works across multiple devices, browsers, apps
✔ Suitable for enterprise SSO

### **Common JWT-only stateless systems**

❌ No central session
❌ Cannot revoke tokens already issued
❌ Must wait until token expiration
❌ Must manually implement token blacklist
❌ Cannot force logout across multiple clients

This difference is *fundamental* to why enterprises choose Keycloak.

---

# 🔥 **Q3 — How does Keycloak ensure cluster-wide revocation in HA mode?**

### ⭐ Senior-Level Answer

Keycloak in cluster mode (Infinispan or newer methods) shares:

* User sessions
* Client sessions
* Offline sessions
* Login failure counters
* Revocation timestamps

All nodes listen to **Infinispan cache events**.

So when one node invalidates a session:

```
cluster-broadcast:
  event = session-revocation
  sid = 7ab3... 
```

Every node immediately removes the session from its local cache.

This ensures **revocation is cluster-wide and instantaneous**.

---

# 🔥 **Q4 — How does Keycloak reduce the JWT statelessness problem?**

### ⭐ Keycloak issues stateless JWT access tokens **but**:

**1. They have short TTL (5–15 minutes recommended)**
So compromise window is small.

**2. They are always tied to a session (`sid` claim).**

**3. They can be introspected by resource servers if required.**

Keycloak combines:

* Stateless JWT access tokens (performance)
* Stateful refresh token & session management (security)

This hybrid model is why Keycloak works well for enterprise.

---

# 🔥 **Q5 — How to architect revocation-sensitive microservices with Keycloak?**

### ⭐ Best practice

| Token Type              | Recommended Use                              |
| ----------------------- | -------------------------------------------- |
| **Access Token (JWT)**  | Short TTL (2–10 min), stateless verification |
| **Refresh Token**       | Managed by Keycloak; revocation effective    |
| **Token Introspection** | Only for zero-trust or sensitive APIs        |
| **Keycloak Adapters**   | To receive push revocation events            |

Your services should not store long-lived sessions themselves.
Let Keycloak handle that.
