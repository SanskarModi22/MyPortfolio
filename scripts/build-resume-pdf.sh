#!/usr/bin/env bash
# Renders public/resume.pdf by printing the site's own /resume/print route
# (the Sheet component, no nav or footer) from a fresh static build with
# headless Chrome. The print CSS in globals.css fits it to one A4 page.
set -euo pipefail
cd "$(dirname "$0")/.."
npm run build >/dev/null
PORT=3999
python3 -m http.server "$PORT" --directory out >/dev/null 2>&1 &
SRV=$!
trap 'kill $SRV 2>/dev/null' EXIT
sleep 1
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=8000 \
  --print-to-pdf="$PWD/public/resume.pdf" "http://127.0.0.1:$PORT/resume/print.html" 2>/dev/null
echo "wrote public/resume.pdf"
