#!/usr/bin/env bash

set -euo pipefail

SESSION_STATE_DIR="${COPILOT_SESSION_STATE_DIR:-${HOME}/.copilot/session-state}"
DAYS=7
AUTO_YES=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --days)
      DAYS="${2:-}"
      shift 2
      ;;
    --yes|-y)
      AUTO_YES=1
      shift
      ;;
    -h|--help)
      echo "Usage: ./clean-copilot.sh [--days N] [--yes]"
      echo "Delete Copilot session folders older than N days by updated_at (default: 7)."
      exit 0
      ;;
    *)
      echo "Unknown argument: $1"
      echo "Use --help for usage."
      exit 1
      ;;
  esac
done

if [[ ! "${DAYS}" =~ ^[0-9]+$ ]]; then
  echo "Error: --days must be a non-negative integer."
  exit 1
fi

if [[ ! -d "${SESSION_STATE_DIR}" ]]; then
  echo "Error: session directory not found: ${SESSION_STATE_DIR}"
  exit 1
fi

parse_iso_epoch() {
  local raw="$1"
  local normalized
  local epoch

  normalized="${raw%Z}"
  normalized="${normalized%%.*}"

  if epoch="$(date -j -u -f "%Y-%m-%dT%H:%M:%S" "${normalized}" +%s 2>/dev/null)"; then
    printf "%s" "${epoch}"
    return 0
  fi

  if epoch="$(date -u -d "${normalized}" +%s 2>/dev/null)"; then
    printf "%s" "${epoch}"
    return 0
  fi

  return 1
}

if cutoff_epoch="$(date -u -v-"${DAYS}"d +%s 2>/dev/null)"; then
  :
else
  cutoff_epoch="$(date -u -d "${DAYS} days ago" +%s)"
fi

declare -a DELETE_DIRS=()
declare -a DELETE_LABELS=()

while IFS= read -r -d '' dir; do
  workspace_file="${dir}/workspace.yaml"
  [[ -f "${workspace_file}" ]] || continue

  updated_at="$(awk -F': ' '/^updated_at:/{print $2; exit}' "${workspace_file}")"
  summary="$(awk -F': ' '/^summary:/{print substr($0, index($0,$2)); exit}' "${workspace_file}")"
  [[ -n "${summary}" ]] || summary="Untitled session"

  [[ -n "${updated_at}" ]] || continue

  if ! updated_epoch="$(parse_iso_epoch "${updated_at}")"; then
    continue
  fi

  if (( updated_epoch <= cutoff_epoch )); then
    DELETE_DIRS+=("${dir}")
    DELETE_LABELS+=("${summary} | updated_at=${updated_at}")
  fi
done < <(find "${SESSION_STATE_DIR}" -mindepth 1 -maxdepth 1 -type d -print0)

if [[ "${#DELETE_DIRS[@]}" -eq 0 ]]; then
  echo "No sessions older than ${DAYS} days were found."
  exit 0
fi

echo "Sessions older than ${DAYS} days (${#DELETE_DIRS[@]} found):"
for i in "${!DELETE_DIRS[@]}"; do
  printf "%3d. %s\n" "$((i + 1))" "${DELETE_LABELS[$i]}"
done
echo

if [[ "${AUTO_YES}" -ne 1 ]]; then
  read -r -p "Delete these sessions now? [y/N] " confirm
  if [[ "${confirm:-}" != "y" && "${confirm:-}" != "Y" ]]; then
    echo "Canceled. No sessions were deleted."
    exit 0
  fi
fi

for dir in "${DELETE_DIRS[@]}"; do
  rm -rf "${dir}"
done

echo "Deleted ${#DELETE_DIRS[@]} session(s)."
