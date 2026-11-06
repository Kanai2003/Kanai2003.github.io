#!/usr/bin/env bash
# Builds public/kanailal-manna-resume.pdf from resume/resume.html with headless Chrome.
# Text stays real, selectable text, which is what ATS parsers need.
set -euo pipefail
cd "$(dirname "$0")/.."
CHROME="${CHROME:-$(command -v google-chrome || command -v chromium || command -v chromium-browser)}"
OUT="public/kanailal-manna-resume.pdf"
"$CHROME" --headless=new --disable-gpu --no-sandbox --no-pdf-header-footer \
  --print-to-pdf="$OUT" "file://$PWD/resume/resume.html" 2>/dev/null
# Keep the old URL working for links already shared.
cp "$OUT" public/Kanai_Resume.pdf
echo "Wrote $OUT ($(pdfinfo "$OUT" 2>/dev/null | awk '/^Pages/{print $2}') page(s))"
