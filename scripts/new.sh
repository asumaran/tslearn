#!/usr/bin/env bash
# Create a new task file, start `dev:watch` on it and open it in nvim.
#
# Usage: npm run new [name]
#
# When running inside a herdr pane, the watcher runs in a sibling pane that is
# closed automatically when the editor exits. Outside herdr, only the editor is
# opened and the watch command is printed.
set -euo pipefail

cd "$(dirname "$0")/.."

name="${1:-}"
if [ -z "$name" ]; then
  read -rp "Task name: " name
fi
name="${name%.ts}"
if [ -z "$name" ]; then
  echo "error: task name is required" >&2
  exit 1
fi

file="tasks/$name.ts"

if [ -e "$file" ]; then
  echo "using existing $file"
else
  mkdir -p tasks
  if [[ "$name" =~ ^[A-Za-z_$][A-Za-z0-9_$]*$ ]]; then
    cat >"$file" <<EOF
export default function $name() {}

console.log($name());
EOF
  else
    cat >"$file" <<EOF
export {};

console.log('$name');
EOF
  fi
  echo "created $file"
fi

watch_pane=""
if [ "${HERDR_ENV:-}" = 1 ] && command -v herdr >/dev/null 2>&1; then
  # Split wide panes to the right and tall panes down (cells are ~2:1).
  direction=$(herdr pane layout --current | jq -r --arg id "${HERDR_PANE_ID:-}" '
    .result.layout.panes[] | select(.pane_id == $id)
    | if .rect.width > (.rect.height * 2.2) then "right" else "down" end')
  direction="${direction:-down}"

  watch_pane=$(herdr pane split --current --direction "$direction" --cwd "$PWD" --no-focus \
    | jq -r '.result.pane.pane_id')
  herdr pane run "$watch_pane" "npm run dev:watch $file" >/dev/null
  # shellcheck disable=SC2064
  trap "herdr pane close '$watch_pane' >/dev/null 2>&1 || true" EXIT
else
  echo "not inside herdr; run in another terminal: npm run dev:watch $file"
fi

nvim "$file"
