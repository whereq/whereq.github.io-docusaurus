# Release flow — from a written post to a live whereq.github.io

This covers the second half of the announcement flow: the posts already exist
in `blog/`, and they need to be registered on the News page and shipped to
production.

The authoring half — writing the post pair itself — is in `SKILL.md` and
`references/announcement-craft.md`.

## The shape of the flow

```
post written (blog/<stem>.mdx + blog/<stem>-CN.mdx)
   ↓  register in src/data/news.ts  → {title, url, date} in the app's announcements[]
   ↓  ledger (src/data/news-release-ledger.ts) if the post is release-scoped
   ↓  build                              → ./build/
   ↓  push source                       → origin/main of whereq.github.io-docusaurus
   ↓  push build                        → master of whereq.github.io (the Pages repo)
live at https://whereq.github.io
```

Steps 1–2 are content changes and belong to a normal commit. Steps 3–5 are
the release, and they only happen when the user asks for it.

## Registering the announcement

Every application on the News page carries an `announcements` array in
`src/data/news.ts`. One entry per language:

```ts
announcements: [
  {
    title: 'whereq.com is open source — the map, the crawler, and everything it reads',
    url: '/blog/WhereQ-com-Open-Source-Announcement',
    date: '2026-11-12',
  },
  {
    title: 'whereq.com 开源了：地图、爬虫，以及它读到的所有数据',
    url: '/blog/WhereQ-com-Open-Source-Announcement-CN',
    date: '2026-11-12',
  },
],
```

Rules:

- **`url` is site-relative** — `/blog/<slug>`, where `<slug>` is the post's
  `slug` frontmatter value, not the filename stem. The page renders these
  through Docusaurus `Link`; absolute URLs are also allowed and render as
  plain external links.
- **`date` is the post's own `date` frontmatter**, `YYYY-MM-DD`. Do not use
  "today" — use the date the post was published. The timestamp on the News
  page must match the timestamp on the article, or the page lies.
- **`title` is the post's `title` frontmatter**, verbatim. Do not rewrite it
  for the table; the two must be recognisably the same headline.
- **Do not pre-sort.** The page sorts newest first itself (`byNewest`).
- The Chinese post gets its own entry with the Chinese title. The table is
  read by both audiences, so a half-registered post is a visible defect.

Which array to edit: the app's own entry, inside `OPEN_SOURCE_APPS` or
`PROPRIETARY_APPS`. Both are in `src/data/news.ts`.

## The release command

```sh
cd /home/whereq/git/whereq.github.io-docusaurus
COMMIT_MSG="feat(news): announce <app>" ./bin/whereq.sh all
```

`all` = build → push source → deploy pages, in that order.

| Command | What it does |
| --- | --- |
| `./bin/whereq.sh dev` | dev server with hot reload, `:3000` |
| `./bin/whereq.sh build` | production build into `./build/` |
| `./bin/whereq.sh serve` | preview the production build locally |
| `./bin/whereq.sh push "msg"` | commit + push source to `origin/main` |
| `./bin/whereq.sh deploy` | push `./build/` to the Pages repo |
| `./bin/whereq.sh all` | build → push source → deploy pages |

**Never use `yarn deploy`.** The Docusaurus default deploys to a `gh-pages`
branch of this repo. This project deploys to a *separate* repository —
`whereq/whereq.github.io`, branch `master` — reached over the
`github.com-whereq` SSH host alias.

## Timing

A full build of this site takes **10–15 minutes** (208 blog posts plus offline
search indexing). A foreground command with the default 60-second cap, or a
900-second cap, will kill the build mid-flight and leave `build/` half
written. Run the release in the **background with a timeout of at least 2400
seconds**, and wait for it to finish before verifying.

```sh
cd /home/whereq/git/whereq.github.io-docusaurus
COMMIT_MSG="..." ./bin/whereq.sh all   # background, timeout ≥ 2400s
```

## The `rm` shim and the temp directory

`rm` on this machine is a shim (`~/.minimax/shims/rm`) that moves files to a
trash instead of unlinking them, and it **refuses to delete the directory the
shell is currently inside**. `cmd_deploy` clones the Pages repo into a
`mktemp -d` directory and `cd`s into it, so the cleanup `rm -rf "$tmp_dir"`
failed with the shell's cwd inside the directory it was deleting — after a
*successful* push, so the script exited non-zero and looked like a failed
deploy.

The script now `cd`s back to the repo root before removing the temp directory.
If you see a failure at the very end of a deploy, check the temp dir before
assuming the push failed — verify with `git ls-remote`:

```sh
git ls-remote git@github.com-whereq:whereq/whereq.github.io.git refs/heads/master
```

If the Pages commit is there, the deploy succeeded and only the cleanup
failed. Clean up the leftover directory from **outside** it, using the
runtime's trash tool rather than a bare `rm`.

## Verifying the release

Local, against the built output — before trusting the live site:

```sh
# the post exists
test -f build/blog/<slug>/index.html && echo ok
# the announcement is on the News page
grep -o '/blog/<slug>' build/news/index.html | head
# the assets resolved
ls build/img/apps/<asset>.jpg
```

Live, after the Pages push — GitHub Pages takes 1–2 minutes to publish:

```sh
curl -sS -o /dev/null -w '%{http_code}\n' https://whereq.github.io/news/
curl -sS https://whereq.github.io/news/ | grep -o '/blog/<slug>' | sort -u
```

Both the English and the Chinese post must appear in the News page's live
HTML. If only one does, the Chinese post was never registered.

## Verifying it renders

The build passing is not proof — broken images and broken links only warn.
To see the page, serve the build locally and screenshot it with Playwright:

```sh
cd /home/whereq/git/whereq.github.io-docusaurus
(python3 -m http.server 8899 --directory build >/tmp/serve.log 2>&1 &)
```

Playwright lives at `/home/whereq/git/ccbus.cc/node_modules/playwright`, with
the Chromium build cached under `~/.cache/ms-playwright/`.

Check both themes: the site is dark-first, and the News page has broken once
already by hardcoding dark colours into the light theme.

## Commit discipline

- One commit for the content change (the posts, the assets, the
  `news.ts` registration), one for the release — or a single combined commit
  when the user asks for the whole flow in one go.
- `build/` and `.docusaurus/` are gitignored, so `git add .` inside
  `cmd_push` stages only source files.
- The release is not reversible by a later commit — the Pages repo's history
  is the published site. Do not deploy unless the user asked in this turn.
