#!/usr/bin/env bash
# =============================================================================
# whereq.sh — WhereQ Docusaurus Site Lifecycle Manager
# =============================================================================
#
# USAGE:
#   ./bin/whereq.sh <command> [options]
#
# COMMANDS:
#   dev         Start the local development server (hot-reload)
#   build       Build the production static site into ./build/
#   serve       Serve the production build locally (preview before deploy)
#   deploy      Build (if needed) and deploy to GitHub Pages
#   push        Commit and push source changes to whereq.github.io-docusaurus
#   all         Full cycle: build → deploy source (push) → deploy pages
#   clean       Remove build artefacts (.docusaurus/, build/)
#   help        Show this help message
#
# EXAMPLES:
#   ./bin/whereq.sh dev              # Develop locally at http://localhost:3000
#   ./bin/whereq.sh build            # Produce ./build/ for inspection
#   ./bin/whereq.sh serve            # Preview ./build/ at http://localhost:3000
#   ./bin/whereq.sh deploy           # Ship current ./build/ to GitHub Pages
#   ./bin/whereq.sh push "fix: typo" # Commit + push source with a custom message
#   ./bin/whereq.sh all              # Build → push source → deploy pages
#   ./bin/whereq.sh clean            # Wipe build cache
#
# PREREQUISITES:
#   - Node.js ≥ 18 and npm installed
#   - SSH key for the whereq GitHub account configured in ~/.ssh/config
#     (Host alias: github.com-whereq → IdentityFile ~/.ssh/wq_gh)
#   - Remote "origin" on this repo set to:
#     git@github.com-whereq:whereq/whereq.github.io-docusaurus.git
#
# ENVIRONMENT VARIABLES (optional overrides):
#   PAGES_REPO    SSH URL of the GitHub Pages repo
#                 default: git@github.com-whereq:whereq/whereq.github.io.git
#   PAGES_BRANCH  Branch to deploy to (default: master)
#   COMMIT_MSG    Custom commit message used by 'push' and 'deploy'
# =============================================================================

set -euo pipefail

# ── Configuration ─────────────────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

PAGES_REPO="${PAGES_REPO:-git@github.com-whereq:whereq/whereq.github.io.git}"
PAGES_BRANCH="${PAGES_BRANCH:-master}"
BUILD_DIR="$ROOT_DIR/build"
GIT_USER="whereq"
GIT_EMAIL="googol.zhang@gmail.com"

# ── Colours ───────────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
RESET='\033[0m'

log()    { echo -e "${CYAN}[whereq]${RESET} $*"; }
ok()     { echo -e "${GREEN}[whereq] ✓${RESET} $*"; }
warn()   { echo -e "${YELLOW}[whereq] ⚠${RESET} $*"; }
err()    { echo -e "${RED}[whereq] ✗${RESET} $*" >&2; exit 1; }
banner() { echo -e "\n${BOLD}${CYAN}══ $* ══${RESET}\n"; }

# ── Helpers ───────────────────────────────────────────────────────────────────

# Ensure we are always running from the project root
cd "$ROOT_DIR"

# Verify Node/npm are available
check_deps() {
  command -v node >/dev/null 2>&1 || err "node not found — install Node.js ≥ 18"
  command -v npm  >/dev/null 2>&1 || err "npm not found"
}

# Verify the whereq SSH key can reach GitHub before any git operation
check_ssh() {
  log "Checking SSH connectivity for whereq account…"
  local out
  out=$(ssh -T git@github.com-whereq 2>&1) || true
  if ! echo "$out" | grep -q "successfully authenticated"; then
    err "SSH auth failed for github.com-whereq. Check ~/.ssh/config and ~/.ssh/wq_gh."
  fi
  ok "SSH authenticated as whereq"
}

# ── Commands ──────────────────────────────────────────────────────────────────

cmd_dev() {
  banner "Development Server"
  check_deps
  log "Starting Docusaurus dev server at http://localhost:3000 …"
  npm run start
}

cmd_build() {
  banner "Production Build"
  check_deps
  log "Building site into ./build/ …"
  npm run build
  ok "Build complete → $BUILD_DIR"
}

cmd_serve() {
  banner "Preview Production Build"
  check_deps
  [[ -d "$BUILD_DIR" ]] || err "No build found. Run '$(basename "$0") build' first."
  log "Serving production build at http://localhost:3000 …"
  npm run serve
}

cmd_clean() {
  banner "Clean Artefacts"
  log "Removing .docusaurus/ and build/ …"
  rm -rf "$ROOT_DIR/.docusaurus" "$BUILD_DIR"
  ok "Clean complete"
}

cmd_push() {
  # Push source code changes to the docusaurus source repo
  banner "Push Source Code"
  check_ssh

  local msg="${1:-"chore: update site content — $(date '+%Y-%m-%d %H:%M:%S')"}"

  cd "$ROOT_DIR"
  git config user.name  "$GIT_USER"
  git config user.email "$GIT_EMAIL"

  if [[ -z "$(git status --porcelain)" ]]; then
    warn "Nothing to commit — working tree is clean."
    return 0
  fi

  log "Staging all changes…"
  git add .
  log "Committing: $msg"
  git commit -m "$msg"
  log "Pushing to origin/main…"
  git push origin main
  ok "Source pushed to whereq.github.io-docusaurus (main)"
}

cmd_deploy() {
  # Deploy the built site to the GitHub Pages repo
  banner "Deploy to GitHub Pages"
  check_ssh

  # Build first if build/ is missing or explicitly stale
  if [[ ! -d "$BUILD_DIR" || ! -f "$BUILD_DIR/index.html" ]]; then
    warn "No build found — running build first…"
    cmd_build
  fi

  local msg="${COMMIT_MSG:-"Deploy WhereQ Docusaurus site — $(date '+%Y-%m-%d %H:%M:%S')"}"
  local tmp_dir
  tmp_dir="$(mktemp -d)"

  log "Cloning $PAGES_REPO into temp dir…"
  git clone "$PAGES_REPO" "$tmp_dir"

  log "Replacing old content with new build…"
  # Remove everything except .git
  find "$tmp_dir" -maxdepth 1 ! -name '.git' ! -name '.' -exec rm -rf {} +
  cp -r "$BUILD_DIR/." "$tmp_dir/"

  cd "$tmp_dir"
  git config user.name  "$GIT_USER"
  git config user.email "$GIT_EMAIL"
  git add -A

  if [[ -z "$(git status --porcelain)" ]]; then
    warn "Pages repo is already up to date — nothing to deploy."
    rm -rf "$tmp_dir"
    return 0
  fi

  log "Committing: $msg"
  git commit -m "$msg"
  log "Pushing to $PAGES_BRANCH…"
  git push origin "$PAGES_BRANCH"

  rm -rf "$tmp_dir"
  ok "Deployed to $PAGES_REPO ($PAGES_BRANCH)"
  ok "GitHub Pages will go live at https://whereq.github.io in ~1–2 minutes"
}

cmd_all() {
  # Full lifecycle: build → push source → deploy pages
  banner "Full Lifecycle: build → push → deploy"
  local msg="${COMMIT_MSG:-"release: deploy — $(date '+%Y-%m-%d %H:%M:%S')"}"

  cmd_build
  COMMIT_MSG="$msg" cmd_push "$msg"
  COMMIT_MSG="$msg" cmd_deploy
  ok "All done 🚀"
}

cmd_help() {
  sed -n '/^# USAGE/,/^# ====/p' "$0" | grep -v '^# ====' | sed 's/^# \{0,1\}//'
}

# ── Entry point ───────────────────────────────────────────────────────────────
COMMAND="${1:-help}"
shift || true   # shift off the command; remaining args available as "$@"

case "$COMMAND" in
  dev)    cmd_dev    ;;
  build)  cmd_build  ;;
  serve)  cmd_serve  ;;
  clean)  cmd_clean  ;;
  push)   cmd_push   "${1:-}" ;;
  deploy) cmd_deploy ;;
  all)    cmd_all    ;;
  help|-h|--help) cmd_help ;;
  *) err "Unknown command: '$COMMAND'. Run '$(basename "$0") help' for usage." ;;
esac
