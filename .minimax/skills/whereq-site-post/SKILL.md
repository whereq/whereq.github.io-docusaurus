---
name: whereq-site-post
description: |
  Write and publish posts into the WhereQ docs hub — the Docusaurus site at
  `/home/whereq/git/whereq.github.io-docusaurus` that serves whereq.com —
  covering announcements, release notes, and tech docs for any application in
  the WhereQ Universe, each in English and Chinese.
  Use this skill when the user says "announce", "publish a post", "write a blog
  post", "release notes", "post about <app>", "announcement for <app>", "add an
  article to the site", or asks to update the News page with a new
  announcement. Trigger on "写一篇发布公告", "写发布说明", "发个文章".
  Do NOT use it to write the app's own README or changelog (that belongs in
  the app's repository), to edit the site's React pages or CSS beyond what a
  post needs, or to deploy the built site to GitHub Pages.
---

# WhereQ Site Post

Author one post for the WhereQ docs hub and wire it into the site's data
files. Every post ships as **two files** — English and Chinese — and the
Chinese one is a real translation, not a stub.

## The site in one paragraph

Docusaurus 3.10, TypeScript, at `/home/whereq/git/whereq.github.io-docusaurus`.
Blog posts are flat files in `blog/`. The locales are `en` (default) and
`zh-CN`, but **there is no `i18n/` directory** — the zh-CN build ships
Docusaurus's built-in Chinese *chrome*, while all content falls back to the
English originals. So a Chinese post is delivered as its own `-CN`-suffixed
blog file, not as a Docusaurus translation. The News page (`/news`) is
data-driven from `src/data/news.ts`, and the release history behind the
announcements lives in `src/data/news-release-ledger.ts`.

Full map of the conventions: `references/site-structure.md`.
Post-writing craft (tone, structure, EN/CN pairing): `references/announcement-craft.md`.

## Inputs to collect

- **Which application** — its `id` in `src/data/news.ts` (e.g. `whereq-dosbox`)
  and the GitHub repo that holds the source of truth.
- **What kind of post** — a first announcement, a release note for a specific
  version, or a tech doc. This decides the shape and how much detail it
  carries.
- **The facts** — version, release date, what actually shipped. Read these
  from the app's own repo (tags, changelog, `docs/releases/`). Never invent a
  version or a date; an announcement that contradicts the repo is worse than
  no announcement.
- **The angle** — the *why* and the feeling, not the feature list. For a first
  announcement this is the whole post.
- **Assets** — logo (light + dark variants) and screenshots, with their
  original paths in the app's repo.

## Procedure

1. **Read the app's own repo before writing a word.** Tags, changelog,
   `docs/releases/`, README. The post's facts must be traceable to it, because
   that is where a reader will check.
   Reason: the announcement is the hub's entry point into that repo; a
   mismatch between the two makes both less credible.

2. **Confirm the app's entry in `src/data/news.ts`.**
   - Open source → belongs in `OPEN_SOURCE_APPS`, and carries `repo`, so the
     page renders a **Source** button.
   - Closed source → belongs in `PROPRIETARY_APPS`, no `repo`, so no Source
     button. An open-source app in the proprietary list is a bug.
   - If the app is not listed at all, add the entry now: `id`, `name`,
     `tagline`, optional `url` (omit when the app has no hosted instance),
     `repo`, `logo` (a path under `/img/apps/`), `accent`, and
     `announcements: []`.
   Reason: the News page is the universe's index; an app that shipped but is
   missing from it is invisible.

3. **Copy the assets into `static/img/apps/`.**
   - App logo → `static/img/apps/<app-id>.png` (the News page tile).
   - A logo that must work on both themes → **two** files:
     `<app>-logo.png` (opaque, for light backgrounds) and
     `<app>-logo-transparent.png` (transparent, for dark backgrounds).
   - Screenshots → `static/img/apps/<app>-<what>.jpg`.
   Reason: `static/` is served at the site root, so the post references
   `/img/apps/<file>`. Copying rather than linking means the site does not
   depend on another repo being reachable.

4. **Write the English post** as `blog/<Title-With-Dashes>.mdx`.
   Use `.mdx` whenever the post needs an `import` or JSX (a themed logo, a
   styled figure). Frontmatter, exactly:

   ```yaml
   ---
   title: "Human title, quoted"
   slug: Title-With-Dashes
   date: 2026-11-12
   tags: [short, kebab, inline]
   authors: whereq
   ---
   ```

   Rules the site enforces:
   - `slug` **equals the filename stem** — 203 of the 204 existing posts do
     exactly this. The single exception is `WhereQ-Universe-Architecture`,
     whose slug is lowercase. Match the stem, don't lowercase it.
   - `authors` must be a key in `blog/authors.yml` (currently `whereq` →
     "Dazhi Zhang (Tony)").
   - `date` is `YYYY-MM-DD` and must not be in the future.
   - `tags` is an inline array; tags are **not** centrally registered, so
     unknown tags are expected and only warn.

5. **Write the Chinese post** as `blog/<same-stem>-CN.mdx`, with
   `slug: <same-stem>-CN`.
   Write natural Chinese prose, not a word-for-word translation — a Chinese
   reader should not hit English syntax. Keep product names, commands, and
   identifiers in their original form (`DOSBox`, `C:\>`, `libdosbox.so`).
   Reason: the Chinese file is a standalone post, so it has to stand on its
   own for a reader who never sees the English one.

6. **Register the announcement** in the app's `announcements` array in
   `src/data/news.ts`:

   ```ts
   announcements: [
     {
       title: 'WhereQ-DOSBox: bringing the DOS era back to your phone',
       url: '/blog/WhereQ-DOSBox-Announcement',
       date: '2026-11-12',
     },
     {
       title: 'WhereQ-DOSBox：把 DOS 年代带回手机',
       url: '/blog/WhereQ-DOSBox-Announcement-CN',
       date: '2026-11-12',
     },
   ],
   ```

   One entry per language, each linking to its own post. `url` is
   site-relative (`/blog/<slug>`) or an absolute external URL. The page sorts
   newest first itself — do not pre-sort.

7. **Add the release ledger entry** in `src/data/news-release-ledger.ts`,
   keyed by the same app `id`. This file is the evidence trail and is **not**
   imported by the News page, so it never reaches the browser bundle.

   ```ts
   'whereq-dosbox': [
       {
         version: 'v1.0.0.1',
         date: '2026-11-11',
         title: 'WhereQ-DOSBox — native Android port of DOSBox r4305',
         url: tag('whereq-dosbox', 'v1.0.0.1'),
       },
   ],
   ```

   Use the existing helpers rather than hand-writing URLs: `tag(repo, version)`
   for a git tag, `doc(repo, path)` for a file in the app's repo. The `title`
   is the app's own release-note wording — reuse it, don't paraphrase it.

   **Check before you write.** The ledger often already carries the version —
   the release may predate the announcement. If the entry is there, leave the
   ledger untouched and say so in your report rather than adding a duplicate.

8. **Build and verify.** The build never fails on a missing image
   (`onBrokenMarkdownImages: 'ignore'`) and only warns on a broken link, so
   passing the build is *not* proof the post is correct:

   ```sh
   cd /home/whereq/git/whereq.github.io-docusaurus
   node .minimax/skills/whereq-site-post/scripts/check-post.mjs <slug> [<slug-CN>]
   npm run build
   ```

   The checker locates the site repo by walking up from its own directory, so
   it also works from an installed copy under the agent's user skill
   directory. Override with `WHEREQ_SITE_REPO=<path>` if needed.

   Then confirm the built output really contains the post and its images:
   `build/blog/<slug>/index.html` exists, the logo and screenshot paths in it
   resolve to files under `build/img/`, and `build/news/index.html` links to
   both announcements.

9. **Commit only what belongs together**, then stop. Do not push, tag, or
   deploy unless the user asks in that turn — this repo deploys by pushing
   the built site to a separate Pages repo (`whereq.github.io`, `master`
   branch), which is not reversible by a later commit.

## Output contract

- Two post files: `blog/<stem>.mdx` and `blog/<stem>-CN.mdx`, both with
  matching frontmatter shape.
- Assets under `static/img/apps/`.
- The app's `announcements` array in `src/data/news.ts` holding one entry per
  language.
- A ledger entry in `src/data/news-release-ledger.ts` when the post is
  release-scoped.
- A clean build, with the new post present in `build/blog/` and both
  announcements present in `build/news/index.html`.

## Failure handling

- **The app is not in `news.ts`** → add the entry (step 2) rather than
  skipping the registration; the post would otherwise be orphaned.
- **The app's repo has no release notes** → link the tag with `tag(repo,
  version)` and use the tag's own message as the ledger title.
- **A version or date cannot be confirmed** → leave it out of the post and
  say so to the user. Do not guess a date; a wrong date on the News page is
  visible and wrong.
- **The image does not resolve in the built HTML** → the path is wrong; the
  build will not tell you. Re-check the `static/img/apps/` copy.
- **`npm run typecheck` reports errors** → they are pre-existing (a `locale`
  argument in `docusaurus.config.ts` and a `JSX` namespace in four files).
  Confirm they are unchanged by your edit rather than trying to fix them as
  part of a content change.
- **The build warns about undefined tags** → expected. Tags are inline and
  unregistered by design.

## Examples

**Input:** "Announce the v1.0.0.1 release of whereq-dosbox, English and
Chinese, with the WD logo and the phone screenshot. Make it about why I built
it, not the tech."

**Output:** `blog/WhereQ-DOSBox-Announcement.mdx` and
`blog/WhereQ-DOSBox-Announcement-CN.mdx`; the logo (both variants) and the
screenshot in `static/img/apps/`; two announcement entries on the
`whereq-dosbox` app; a `v1.0.0.1` ledger entry; a clean build with both
posts and the News links verified.

**Input:** "Write a release note for the new FlowDesk version."

**Output:** one post per language under `blog/`, a new announcement entry
dated to the release, and a ledger entry carrying the app's own release-note
title. The post leads with what the release changes for a user; the diff
detail stays in the app's own repo.

## Windows (win32) platform notes

The site builds on any platform with Node ≥ 20, but the conventions here were
established on Linux/WSL2. On Windows (PowerShell):

```powershell
cd C:\path\to\whereq.github.io-docusaurus
node .minimax\skills\whereq-site-post\scripts\check-post.mjs <slug>
npm run build
```

Use `Copy-Item` instead of `cp`, and `Get-ChildItem` instead of `ls`. The
skill's own location never needs to be hardcoded — the checker resolves the
site repo from its own path. There is no WSL-specific behaviour in this
skill's steps — the site repo has no symlinks or path assumptions that break
on Windows.

## Where this skill lives

The version-controlled source of truth is this repo's own
`.minimax/skills/whereq-site-post/`. A copy is installed into the agent's
user skill directory (`~/.minimax/skills/whereq-site-post/`) so it is
available when working from another repository. When the two diverge, the
copy in this repo wins — re-install it from here.
