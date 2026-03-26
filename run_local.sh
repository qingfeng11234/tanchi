#!/usr/bin/env bash
set -euo pipefail

PORT="${1:-8000}"

echo "[炸金花] 本地服务启动中..."
echo "访问地址: http://127.0.0.1:${PORT}/index.html"
echo "按 Ctrl+C 停止服务"
python3 -m http.server "${PORT}"
