#!/usr/bin/env bash
# Renders public/resume.pdf from src/content/resume.ts via a print HTML and headless Chrome.
set -euo pipefail
cd "$(dirname "$0")/.."
node --experimental-strip-types scripts/resume-html.ts > /tmp/resume-print.html
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$PWD/public/resume.pdf" "file:///tmp/resume-print.html" 2>/dev/null
echo "wrote public/resume.pdf"
