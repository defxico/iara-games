#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SESSION_STATE_DIR="${COPILOT_SESSION_STATE_DIR:-${HOME}/.copilot/session-state}"

if ! command -v copilot >/dev/null 2>&1; then
  echo "Error: 'copilot' command not found in PATH."
  exit 1
fi

if [[ ! -d "${SESSION_STATE_DIR}" ]]; then
  mkdir -p "${SESSION_STATE_DIR}"
fi

declare -a session_rows=()
while IFS= read -r -d '' dir; do
  workspace_file="${dir}/workspace.yaml"
  [[ -f "${workspace_file}" ]] || continue

  session_id="$(basename "${dir}")"
  session_name="$(awk -F': ' '/^summary:/{print substr($0, index($0,$2)); exit}' "${workspace_file}")"
  updated_at="$(awk -F': ' '/^updated_at:/{print $2; exit}' "${workspace_file}")"

  if [[ -z "${session_name}" || "${session_name}" == "null" ]]; then
    if [[ -n "${updated_at}" ]]; then
      session_name="Untitled session (${updated_at})"
    else
      session_name="Untitled session"
    fi
  fi

  if [[ -z "${updated_at}" ]]; then
    updated_at="1970-01-01T00:00:00Z"
  fi

  session_rows+=("${updated_at}|${session_id}|${session_name}")
done < <(find "${SESSION_STATE_DIR}" -mindepth 1 -maxdepth 1 -type d -print0)

declare -a sorted_rows=()
if (( ${#session_rows[@]} > 0 )); then
  IFS=$'\n' sorted_rows=($(printf "%s\n" "${session_rows[@]}" | sort -r))
  unset IFS
fi

declare -a MENU_OPTIONS=("Start a new session")
declare -a SESSION_IDS=()
for row in "${sorted_rows[@]-}"; do
  [[ -n "${row}" ]] || continue
  IFS='|' read -r updated_at session_id session_name <<<"${row}"
  unset IFS
  MENU_OPTIONS+=("${session_name}")
  SESSION_IDS+=("${session_id}")
done

selected=0
menu_size="${#MENU_OPTIONS[@]}"

cleanup() {
  printf "\033[?25h"
  stty echo 2>/dev/null || true
}
trap cleanup EXIT

draw_menu() {
  clear
  echo "Copilot Session Launcher"
  echo "Use Up/Down arrows and press Enter:"
  echo
  for i in "${!MENU_OPTIONS[@]}"; do
    if [[ "${i}" -eq "${selected}" ]]; then
      printf "> %s\n" "${MENU_OPTIONS[$i]}"
    else
      printf "  %s\n" "${MENU_OPTIONS[$i]}"
    fi
  done
}

printf "\033[?25l"
draw_menu

while true; do
  IFS= read -rsn1 key || true
  case "${key}" in
    "")
      break
      ;;
    $'\x1b')
      key2=""
      IFS= read -rsn2 -t 1 key2 || true
      case "${key2:-}" in
        "[A")
          ((selected--))
          if ((selected < 0)); then
            selected=$((menu_size - 1))
          fi
          draw_menu
          ;;
        "[B")
          ((selected++))
          if ((selected >= menu_size)); then
            selected=0
          fi
          draw_menu
          ;;
      esac
      ;;
  esac
done

cd "${ROOT_DIR}"

if [[ "${selected}" -eq 0 ]]; then
  echo "Starting a new Copilot session (model: auto)..."
  exec copilot --model auto
fi

session_index=$((selected - 1))
session_id="${SESSION_IDS[$session_index]}"
echo "Resuming selected session (model: auto)..."
exec copilot --model auto --resume="${session_id}"
