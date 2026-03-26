#!/usr/bin/env bash
set -euo pipefail

SRC_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET_DIR="${1:-$HOME/zhajinhua-web}"

mkdir -p "$TARGET_DIR"
cp "$SRC_DIR/index.html" "$TARGET_DIR/index.html"
cp "$SRC_DIR/README.md" "$TARGET_DIR/README.md"
cp "$SRC_DIR/run_local.sh" "$TARGET_DIR/run_local.sh"
chmod +x "$TARGET_DIR/run_local.sh"

echo "已安装到: $TARGET_DIR"
echo "下一步运行:"
echo "  cd $TARGET_DIR"
echo "  ./run_local.sh"
