#!/usr/bin/env node
// check-post.mjs — validate a new post pair in whereq.github.io-docusaurus.
//
//   node check-post.mjs <slug> [<slug-CN>]
//
// Checks the things the Docusaurus build will NOT catch: a slug that does not
// match its filename, an unregistered author, a future date, an image path
// that does not exist under static/, a missing Chinese counterpart, and a
// post that was never registered on the News page.
//
// Exit code 0 = all checks passed. 1 = at least one failure.

import {existsSync, readFileSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));

/**
 * Where the site repo is.
 *
 * This script lives in two places: the version-controlled copy under the site
 * repo's own `.minimax/skills/`, and an installed copy under the agent's user
 * skill directory. Walk up from the script first (that finds the committed
 * copy, so a clone of the site works anywhere), then fall back to the known
 * local path for the installed copy.
 */
const CANDIDATES = [
  resolve(HERE, '..', '..', '..', '..'), // scripts/ -> skill/ -> skills/ -> .minimax/ -> repo root
  '/home/whereq/git/whereq.github.io-docusaurus',
];

const SITE =
  process.env.WHEREQ_SITE_REPO ||
  CANDIDATES.find((dir) => existsSync(join(dir, 'docusaurus.config.ts'))) ||
  CANDIDATES[0];

let failures = 0;
let warnings = 0;

const fail = (msg) => {
  console.error(`[FAIL] ${msg}`);
  failures++;
};
const warn = (msg) => {
  console.error(`[WARN] ${msg}`);
  warnings++;
};
const ok = (msg) => console.log(`[OK]   ${msg}`);

if (!existsSync(SITE)) {
  console.error(`[FAIL] site repo not found: ${SITE}`);
  process.exit(1);
}

/** Parse the leading `---` frontmatter block into a flat key map. */
function parseFrontmatter(text) {
  if (!text.startsWith('---')) return null;
  const end = text.indexOf('\n---', 3);
  if (end === -1) return null;
  const block = text.slice(3, end);
  const fm = {};
  let key = null;
  let buf = [];
  for (const line of block.split('\n')) {
    const m = line.match(/^([a-zA-Z_]+)\s*:\s*(.*)$/);
    if (m && !/^\s/.test(line)) {
      if (key) fm[key] = buf.join(' ').trim();
      key = m[1];
      buf = m[2] ? [m[2]] : [];
    } else if (key) {
      buf.push(line.trim());
    }
  }
  if (key) fm[key] = buf.join(' ').trim();
  return fm;
}

/** Every /img/... reference in the body. */
function imageRefs(text) {
  const refs = new Set();
  for (const m of text.matchAll(/(?:src|srcset)\s*=\s*["']([^"']+)["']/g)) {
    for (const part of m[1].split(',')) {
      const url = part.trim().split(/\s+/)[0];
      if (url.startsWith('/img/')) refs.add(url);
    }
  }
  for (const m of text.matchAll(/!\[[^\]]*\]\((\/img\/[^)\s]+)\)/g)) {
    refs.add(m[1]);
  }
  // <ThemedImage sources={{light: '/img/...', dark: '/img/...'}} />
  for (const m of text.matchAll(/sources\s*=\s*\{\{([\s\S]*?)\}\}/g)) {
    for (const s of m[1].matchAll(/['"](\/img\/[^'"]+)['"]/g)) {
      refs.add(s[1]);
    }
  }
  return [...refs];
}

const authors = new Set(
  readFileSync(join(SITE, 'blog', 'authors.yml'), 'utf8')
    .split('\n')
    .filter((l) => /^[A-Za-z0-9_-]+:\s*$/.test(l))
    .map((l) => l.split(':')[0].trim()),
);

const newsSrc = readFileSync(join(SITE, 'src', 'data', 'news.ts'), 'utf8');
const ledgerSrc = readFileSync(join(SITE, 'src', 'data', 'news-release-ledger.ts'), 'utf8');

function checkPost(slug, {expectCnPartner = false} = {}) {
  console.log(`\n── ${slug} ─────────────────────────────`);
  const enStem = slug.replace(/-CN$/, '');
  const isCn = slug.endsWith('-CN');

  // The post's own file is named after the full slug; the English
  // counterpart (for a -CN slug) is the one without the suffix.
  const candidates = ['.mdx', '.md'].map((ext) => join(SITE, 'blog', slug + ext));
  const file = candidates.find((f) => existsSync(f));
  if (!file) {
    fail(`no post file for "${slug}" (looked for blog/${slug}.mdx and .md)`);
    return;
  }
  ok(`file ${file.replace(SITE + '/', '')}`);

  const raw = readFileSync(file, 'utf8');
  const fm = parseFrontmatter(raw);
  if (!fm) {
    fail('frontmatter missing or unclosed');
    return;
  }

  for (const field of ['title', 'slug', 'date', 'tags', 'authors']) {
    if (!fm[field]) fail(`frontmatter.${field} is missing`);
  }
  if (fm.title && !fm.title.startsWith('"')) {
    warn(`title is not quoted: ${fm.title}`);
  }

  if (fm.slug && fm.slug !== slug) {
    fail(`slug "${fm.slug}" does not match filename stem "${slug}"`);
  } else if (fm.slug) {
    ok(`slug matches filename (${slug})`);
  }

  if (fm.date) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fm.date)) {
      fail(`date "${fm.date}" is not YYYY-MM-DD`);
    } else {
      const d = new Date(`${fm.date}T00:00:00Z`);
      if (Number.isNaN(d.getTime())) {
        fail(`date "${fm.date}" is not a real date`);
      } else if (d.getTime() > Date.now()) {
        fail(`date "${fm.date}" is in the future`);
      } else {
        ok(`date ${fm.date}`);
      }
    }
  }

  if (fm.authors) {
    for (const a of fm.authors.split(',').map((s) => s.trim()).filter(Boolean)) {
      if (!authors.has(a)) fail(`author "${a}" is not defined in blog/authors.yml`);
    }
    ok(`author(s) ${fm.authors} registered`);
  }

  const refs = imageRefs(raw);
  if (refs.length === 0) {
    warn('no /img/ references found');
  }
  for (const ref of refs) {
    const onDisk = join(SITE, 'static', ref.replace(/^\//, ''));
    if (!existsSync(onDisk)) {
      fail(`image not found: ${ref} → expected ${onDisk}`);
    }
  }
  if (refs.length) ok(`${refs.length} image reference(s) resolve under static/`);

  const hasThemed = raw.includes('@theme/ThemedImage');
  if (hasThemed && !file.endsWith('.mdx')) {
    fail('uses @theme/ThemedImage but the file is not .mdx');
  }

  if (!/\n---\n/.test(raw) || !raw.includes('<!-- truncate -->')) {
    warn('no <!-- truncate --> marker — the blog index excerpt will be the whole post');
  }

  // News page registration.
  if (!newsSrc.includes(`/${slug}`)) {
    fail(`not registered on the News page (src/data/news.ts has no "/${slug}")`);
  } else {
    ok('registered in src/data/news.ts');
  }

  // Release ledger: the app that carries this announcement should also have
  // a ledger entry, so the release history behind the story is traceable.
  const appIds = [...newsSrc.matchAll(/^\s*id:\s*'([^']+)',/gm)].map((m) => m[1]);
  const appId = appIds.find((id) => {
    const block = newsSrc.split(`id: '${id}'`)[1] || '';
    const section = block.split(/\n  \},/)[0];
    return section.includes(`/${slug}`);
  });
  if (appId) {
    if (ledgerSrc.includes(`'${appId}':`)) {
      ok(`release ledger has an entry for '${appId}'`);
    } else {
      warn(`no release-ledger entry for '${appId}' — add one if this post is release-scoped`);
    }
  }

  // Chinese pairing.
  if (isCn) {
    const en = ['.mdx', '.md'].map((ext) => join(SITE, 'blog', enStem + ext)).find((f) => existsSync(f));
    if (!en) fail(`the English counterpart blog/${enStem}.mdx is missing`);
    else ok(`English counterpart blog/${enStem}.mdx exists`);
  } else if (expectCnPartner) {
    const cn = ['.mdx', '.md'].map((ext) => join(SITE, 'blog', `${enStem}-CN` + ext)).find((f) => existsSync(f));
    if (!cn) fail(`the Chinese counterpart blog/${enStem}-CN.mdx is missing`);
    else ok('Chinese counterpart exists');
  }

  return enStem;
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: node check-post.mjs <slug> [<slug-CN>]');
  process.exit(2);
}

for (const slug of args) {
  checkPost(slug, {expectCnPartner: args.length === 1});
}

console.log('\n────────────────────────────────────────');
if (failures > 0) {
  console.error(`✗ ${failures} failure(s), ${warnings} warning(s)`);
  process.exit(1);
}
console.log(`✓ all checks passed (${warnings} warning(s))`);
