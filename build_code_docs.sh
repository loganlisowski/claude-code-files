#!/bin/bash

generate_doc() {
    local app_name="$1"
    local app_dir="$2"
    local github_url="$3"
    local output_file="$4"

    echo "========================================" > "$output_file"
    echo "  $app_name - Full Source Code" >> "$output_file"
    echo "========================================" >> "$output_file"
    echo "" >> "$output_file"
    echo "Submitted by: Logan Lisowski" >> "$output_file"
    echo "Date: March 14, 2026" >> "$output_file"
    echo "" >> "$output_file"
    echo "========================================" >> "$output_file"
    echo "" >> "$output_file"

    find "$app_dir" -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.css" -o -name "*.html" -o -name "*.js" -o -name "*.json" \) -not -path "*/node_modules/*" -not -path "*/.next/*" -not -path "*/dist/*" -not -path "*/.vercel/*" -not -name "package-lock.json" -not -name "tsconfig.json" -not -name "next-env.d.ts" | sort | while read -r filepath; do
        relpath="${filepath#$app_dir/}"
        echo "// ============================================" >> "$output_file"
        echo "// FILE: $relpath" >> "$output_file"
        echo "// ============================================" >> "$output_file"
        echo "" >> "$output_file"
        cat "$filepath" >> "$output_file"
        echo "" >> "$output_file"
        echo "" >> "$output_file"
    done

    echo "========================================" >> "$output_file"
    echo "  GitHub Repository" >> "$output_file"
    echo "  $github_url" >> "$output_file"
    echo "========================================" >> "$output_file"
}

echo "Generating OrlandoCRE..."
generate_doc "OrlandoCRE Intelligence Platform" \
    "/Users/sfino/Desktop/Claude Code/orlando-cre" \
    "https://github.com/serdtfryguhhash/orlando-cre" \
    "/Users/sfino/Desktop/Claude Code/OrlandoCRE_Source_Code.txt"

echo "Generating History AI..."
generate_doc "History AI" \
    "/Users/sfino/Desktop/Claude Code/apps/history-ai" \
    "https://github.com/serdtfryguhhash/history-ai" \
    "/Users/sfino/Desktop/Claude Code/HistoryAI_Source_Code.txt"

echo "Generating HIP M&A Analyzer..."
generate_doc "HIP M&A Analyzer" \
    "/Users/sfino/Desktop/Claude Code/apps/hip-ma-analyzer" \
    "https://github.com/serdtfryguhhash/hip-ma-analyzer" \
    "/Users/sfino/Desktop/Claude Code/HIP_MA_Analyzer_Source_Code.txt"

echo "Done!"
