#!/usr/bin/env python3
"""
Export Hugo main-menu tutorial pages to plain text / markdown for PDF editing.
Replaces diagram/challenge/review/freeplay/blackplay shortcodes with figure placeholders.
"""

from __future__ import annotations

import html
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "content"
OUT = ROOT / "tutorial_principal_para_pdf.md"

EXCLUDE_FILES = frozenset({"doacao.md", "privacidade.md"})


def parse_front_matter(raw: str) -> tuple[dict[str, str], str]:
    if not raw.startswith("---"):
        return {}, raw
    end = raw.find("\n---\n", 3)
    if end == -1:
        return {}, raw
    fm_block = raw[3:end]
    body = raw[end + 5 :]
    meta: dict[str, str] = {}
    for line in fm_block.splitlines():
        if ":" not in line:
            continue
        key, _, val = line.partition(":")
        key = key.strip()
        val = val.strip().strip('"').strip("'")
        meta[key] = val
    return meta, body


def normalize_menu(val: str) -> str:
    return val.strip().strip('"').strip("'")


def strip_html_tags(s: str) -> str:
    s = re.sub(r"(?is)<script[^>]*>.*?</script>", "", s)
    s = re.sub(r"(?is)<style[^>]*>.*?</style>", "", s)
    s = re.sub(r"<br\s*/?>", "\n", s, flags=re.I)
    s = re.sub(r"</p>\s*", "\n\n", s, flags=re.I)
    s = re.sub(r"</li>\s*", "\n", s, flags=re.I)
    s = re.sub(r"</h[1-6]>", "\n\n", s, flags=re.I)
    s = re.sub(r"<li[^>]*>", "• ", s, flags=re.I)
    s = re.sub(r"<[^>]+>", "", s)
    s = html.unescape(s)
    s = re.sub(r"[ \t]+\n", "\n", s)
    s = re.sub(r"\n{3,}", "\n\n", s)
    return s.strip()


def extract_description(block: str) -> str:
    m = re.search(r'description="', block)
    if not m:
        return ""
    i = m.end()
    out: list[str] = []
    while i < len(block):
        if block[i] == "\\" and i + 1 < len(block):
            out.append(block[i + 1])
            i += 2
            continue
        if block[i] == '"':
            break
        out.append(block[i])
        i += 1
    return "".join(out)


def shortcode_kind(block: str) -> str:
    m = re.match(r"\{\{<\s*(\w+)", block)
    return m.group(1) if m else "shortcode"


def extract_sgf(block: str) -> str:
    m = re.search(r'sgf="([^"]*)"', block)
    return m.group(1) if m else ""


def replace_shortcodes(body: str, fig_counter: list[int]) -> str:
    parts: list[str] = []
    pos = 0
    while True:
        start = body.find("{{<", pos)
        if start == -1:
            parts.append(body[pos:])
            break
        parts.append(body[pos:start])
        end = body.find(">}}", start)
        if end == -1:
            parts.append(body[start:])
            break
        end += 3
        block = body[start:end]
        fig_counter[0] += 1
        n = fig_counter[0]
        kind = shortcode_kind(block)
        sgf = extract_sgf(block)
        desc = strip_html_tags(extract_description(block))
        parts.append(
            f"\n\n[FIGURA {n} — tipo: {kind} | referência SGF: `{sgf}`]\n"
            f"Legenda sugerida: {desc or '(sem legenda no site)'}\n\n"
        )
        pos = end
    return "".join(parts)


def md_image_placeholder(body: str, fig_counter: list[int]) -> str:
    def repl(m: re.Match[str]) -> str:
        fig_counter[0] += 1
        alt, url = m.group(1), m.group(2)
        return (
            f"\n\n[FIGURA {fig_counter[0]} — imagem | `{url}`]\n"
            f"Legenda sugerida: {alt}\n\n"
        )

    return re.sub(r"!\[([^\]]*)\]\(([^)]+)\)", repl, body)


def clean_body(body: str, fig_counter: list[int]) -> str:
    body = replace_shortcodes(body, fig_counter)
    body = md_image_placeholder(body, fig_counter)
    # Keep markdown structure; unescape HTML entities in remaining text
    lines = body.splitlines()
    out_lines: list[str] = []
    for line in lines:
        if line.strip().startswith("<div") or line.strip().startswith("</div"):
            # Will be handled by strip pass for _index-like pages
            out_lines.append(line)
            continue
        out_lines.append(html.unescape(line))
    body = "\n".join(out_lines)
    return body


def html_page_to_text(body: str) -> str:
    """Heavy HTML landing page -> readable text."""
    return strip_html_tags(body)


def load_main_pages() -> list[tuple[int, str, str]]:
    rows: list[tuple[int, str, str]] = []
    for path in sorted(CONTENT.glob("*.md")):
        if path.name in EXCLUDE_FILES:
            continue
        if path.name.startswith("_") and path.name != "_index.md":
            continue
        raw = path.read_text(encoding="utf-8")
        meta, _ = parse_front_matter(raw)
        if normalize_menu(meta.get("menu", "")) != "main":
            continue
        try:
            w = int(meta.get("weight", "9999"))
        except ValueError:
            w = 9999
        title = meta.get("title", path.stem)
        rows.append((w, title, path.name))
    rows.sort(key=lambda x: (x[0], x[2]))
    return rows


def main() -> None:
    fig_counter = [0]
    chunks: list[str] = []
    chunks.append("# Baduk — Tutorial principal (export para PDF)\n\n")
    chunks.append(
        "_Texto gerado a partir do menu «Tutorial» do site. Figuras: substituir pelos teus desenhos._\n\n"
    )
    chunks.append("---\n\n")

    ordered = load_main_pages()

    for w, title, filename in ordered:
        path = CONTENT / filename
        raw = path.read_text(encoding="utf-8")
        meta, body = parse_front_matter(raw)
        display_title = meta.get("title", title)
        chunks.append(f"## {display_title}\n\n")
        chunks.append(f"_(ordem menu: {w} · ficheiro: `{filename}`)_\n\n")

        if filename == "_index.md":
            body = html_page_to_text(body)
        else:
            body = clean_body(body, fig_counter)

        body = body.strip()
        if body:
            chunks.append(body)
            chunks.append("\n\n")
        chunks.append("---\n\n")

    OUT.write_text("".join(chunks), encoding="utf-8")
    print(f"Wrote {OUT} ({len(ordered)} sections, {fig_counter[0]} figure placeholders)")


if __name__ == "__main__":
    main()
