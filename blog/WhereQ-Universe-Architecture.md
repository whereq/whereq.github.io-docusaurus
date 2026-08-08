---
title: "Inside the WhereQ Universe: One Identity, Many Apps, Open APIs"
slug: whereq-universe-architecture
date: 2026-08-07
tags: [architecture, oauth, keycloak, identity, microservices, api, llm, mcp, whereq]
authors: whereq
---

The [WhereQ Universe](https://www.whereq.ca) is not a single product — it is a
**living ecosystem** of independent applications that share one identity layer,
one set of engineering conventions, and an increasingly open set of APIs. This
post walks through how the pieces fit together: why authentication lives in a
single place, how the apps expose data to customers, and where LLM agents and
MCP fit into the picture.

<!-- truncate -->

## The family at a glance

Every application in the Universe is deployable and operable on its own, but none
of them re-implement the cross-cutting concerns that every SaaS needs. Instead,
those concerns are factored out into shared services.

| Application | Domain | What it does |
| --- | --- | --- |
| **WhereQ App Hub** | [whereq.ca](https://www.whereq.ca) | The Universe entry point — a decentralized hub that ties the family together. |
| **Key To Marvel** | [keytomarvel.com](https://www.keytomarvel.com) | Centralized identity & access management (OAuth/OIDC provider). |
| **FlowDesk** | [flowdesk.top](https://www.flowdesk.top) | AI-powered stock analysis backed by a large archive of market records. |
| **CatoBigato** | [catobigato.com](https://www.catobigato.com) | AI tutor for K‑12 through college. |
| **Chroniq** | [chroniq.cc](https://www.chroniq.cc) | Time/records-oriented application in the family. |
| **WhereQ LLM** | [whereq.cc](https://www.whereq.cc) | AI/LLM-integrated platform (in progress). |
| **WhereQ** | [whereq.com](https://www.whereq.com) | Location-based guides, stories, and this engineering blog. |

The guiding idea is simple: **build each app small, and never duplicate a
capability that the ecosystem can provide once.** The two most important shared
capabilities today are *identity* (Key To Marvel) and *data/agent access* (the
open APIs and LLM wikis exposed by FlowDesk, CatoBigato, and Chroniq).

## Key To Marvel: one OAuth provider for the whole Universe

Historically, every new application meant re-solving the same problem: user
registration, login, password reset, social login, token issuance, session
management, role and permission modelling. Copy-pasting an auth module into each
codebase is how you end up with five slightly different, slightly broken login
systems and five places to patch when a CVE lands.

**Key To Marvel eliminates that duplication.** It is the single, centralized
OAuth 2.0 / OpenID Connect provider for the entire Universe. When a new
application needs authentication, it does **not** build an auth module. It simply
**creates a realm in Key To Marvel** and points its login flow there.

```
                         ┌──────────────────────────────────────────┐
                         │            Key To Marvel                 │
                         │        (keytomarvel.com — IdP)           │
                         │                                          │
                         │   ┌──────────┐  ┌──────────┐             │
                         │   │  realm:  │  │  realm:  │   ...       │
                         │   │ flowdesk │  │ catobi.  │             │
                         │   └──────────┘  └──────────┘             │
                         │      OAuth2 / OIDC · JWT · social login  │
                         └───────────────▲──────────────────────────┘
                                         │  OIDC redirect + token
             ┌───────────────┬───────────┴───────────┬───────────────┐
             │               │                       │               │
       ┌────────────┐   ┌───────────┐          ┌───────────┐   ┌───────────┐
       │ FlowDesk   │   │ CatoBigato│          │  Chroniq  │   │ WhereQ ×N │
       │flowdesk.top│   │catobigato │          │chroniq.cc │   │  apps     │
       └────────────┘   └───────────┘          └───────────┘   └───────────┘
        each app = one realm; no app ships its own auth module
```

### Why a realm-per-application model

A **realm** is an isolated security domain: its own users, roles, clients, and
token policies. Giving each application its own realm buys us several things at
once:

- **Isolation.** FlowDesk's users, roles, and clients never leak into
  CatoBigato's. A misconfiguration in one realm cannot affect another.
- **Zero duplication.** Login, registration, MFA, password reset, social
  login, token refresh, and session revocation are implemented **once** and
  inherited by every app that has a realm.
- **Consistent tokens.** Every app validates the same kind of signed JWT
  against Key To Marvel's public keys (JWKS). Backend services just verify the
  token — they never store passwords.
- **Central policy & patching.** Password rules, token lifetimes, brute-force
  protection, and security patches are applied in one place and take effect
  everywhere.
- **Optional SSO.** Because all realms live behind one provider, single
  sign-on across family apps is a configuration decision, not a rewrite.

### What an app has to do

Onboarding a new application to the Universe's identity layer is intentionally
boring:

1. Create a realm (or client within a shared realm) in Key To Marvel.
2. Register the app's redirect URIs and obtain a client ID/secret.
3. Wire the standard OIDC login flow — redirect to Key To Marvel, receive the
   authorization code, exchange it for tokens.
4. Validate the resulting JWT on the backend using Key To Marvel's JWKS.

That's it. No user table, no password hashing, no reset-email plumbing. The
application focuses entirely on its own domain.

```
User ──▶ App (flowdesk.top)
          │  1. not authenticated → redirect
          ▼
     Key To Marvel  ── 2. login / social login / MFA ──▶ user authenticates
          │
          │  3. authorization code → app callback
          ▼
     App exchanges code ──▶ Key To Marvel ──▶ 4. access + refresh JWT
          │
          ▼
     App backend verifies JWT signature via JWKS → grants access
```

## Open APIs: making integration easy for customers

Identity is only half of the "don't duplicate" story. The other half is
**data and capability access**. Several applications in the Universe already
provide — or are actively building — public API access so that customers can
integrate without scraping UIs or reverse-engineering internals.

- **[FlowDesk](https://www.flowdesk.top)** — API access for stock data and
  analysis (details below).
- **[CatoBigato](https://www.catobigato.com)** — API access to its tutoring and
  explanation capabilities.
- **[Chroniq](https://www.chroniq.cc)** — API access to its records/timeline
  capabilities.

The goal is to turn each app from a walled garden into a building block:
customers should be able to pull the data or trigger the functionality they need
directly, and compose it into their own products.

### LLM wikis for agents and MCP

APIs make integration possible; **LLM wikis make integration effortless.**
Alongside their REST endpoints, FlowDesk, CatoBigato, and Chroniq are providing
**LLM wikis** — structured, machine-readable documentation designed to be
consumed by an **LLM agent** or exposed through the **Model Context Protocol
(MCP)**.

Instead of a human reading API docs and hand-writing an integration, an LLM
agent can ingest the wiki, understand the available endpoints, their parameters,
and their semantics, and then call them directly. In practice this means:

- An agent can discover *what* an app can do and *how* to ask for it without a
  developer translating docs into code.
- An MCP server can front the app's API, so any MCP-capable assistant can use
  FlowDesk, CatoBigato, or Chroniq as a tool.
- Integration shifts from "read docs → write client → maintain client" to
  "point an agent at the wiki."

```
   ┌──────────────┐        reads        ┌──────────────────┐
   │  LLM Agent   │ ──────────────────> │   LLM Wiki       │
   │  / MCP host  │                     │ (app-provided)   │
   └──────┬───────┘                     └──────────────────┘
          │  calls, guided by the wiki
          ▼
   ┌────────────────────────────────────────────────┐
   │  App API  (flowdesk.top / catobigato / chroniq)│
   └────────────────────────────────────────────────┘
```

## FlowDesk: a market-data archive you can query

FlowDesk deserves a closer look because it sits on top of a genuinely valuable
asset: **a large, accumulated archive of stock records collected from various
stock markets.** Over time FlowDesk has been ingesting and storing market data
across exchanges, building up historical depth that most integrations would find
expensive to reproduce.

That archive is being opened up. FlowDesk **will provide endpoints (and other
mechanisms) for customers to fetch stock records directly** — so instead of
sourcing, cleaning, and warehousing market data yourself, you can pull it from
FlowDesk and get straight to the analysis.

```
   Various stock markets ──▶ FlowDesk ingestion ──▶ Stock-records archive
                                                          │
                                    ┌─────────────────────┼───────────────────────┐
                                    ▼                     ▼                       ▼
                              Customer API           LLM wiki / MCP        FlowDesk's own
                              (fetch records)        (agent access)        AI analysis
```

Combined with the LLM wiki, this is the pattern the whole Universe is moving
toward: **accumulate something valuable once, then expose it through both a
human-friendly API and an agent-friendly wiki.**

## How it all fits together

Put the two shared layers side by side and the architecture of the Universe
becomes clear:

```
                        ┌────────────────────────────────┐
                        │        WhereQ App Hub          │
                        │          (whereq.ca)           │
                        └───────────────┬────────────────┘
                                        │
        ┌───────────────────────────────┼───────────────────────────────┐
        │                               │                               │
  ┌───────────┐                   ┌───────────┐                   ┌───────────┐
  │ FlowDesk  │                   │ CatoBigato│                   │  Chroniq  │
  │  + API    │                   │  + API    │                   │  + API    │
  │  + wiki   │                   │  + wiki   │                   │  + wiki   │
  └─────┬─────┘                   └─────┬─────┘                   └─────┬─────┘
        │                               │                               │
        └───────────── authenticate via OIDC ───────────────────────────┘
                                        │
                                        ▼
                        ┌────────────────────────────────┐
                        │         Key To Marvel          │
                        │   centralized OAuth / OIDC     │
                        │      (one realm per app)       │
                        └────────────────────────────────┘
```

Two rules capture the design philosophy:

1. **Authenticate once, everywhere.** No application in the Universe builds its
   own auth. Each one creates a realm in Key To Marvel and trusts its tokens.
2. **Expose what you accumulate.** Apps that gather valuable data or
   capabilities (FlowDesk's market archive, CatoBigato's tutoring, Chroniq's
   records) publish them through open APIs *and* LLM wikis, so both developers
   and AI agents can integrate with minimal friction.

The result is an ecosystem where new applications are cheap to launch — they
inherit identity for free and can lean on the family's data and services —
while customers get a consistent login experience and a growing catalog of
APIs and agent-ready integrations.

---

*Explore the full ecosystem at [whereq.ca](https://www.whereq.ca).*
