# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hugo static site for **Baduk.com.br**, a Brazilian Portuguese Go (board game) learning platform. It features interactive Go problems, step-by-step tutorials, famous game reviews, and a paid beginner course (individual lessons: daily WhatsApp, PDF “10 Erros Fatais…”, game reviews, video calls; beginner to ~20 kyu).

## Build & Development Commands

No npm or Node.js — pure Hugo. Local binaries (`./hugo` and `./hugo.exe`) are included in the repo root.

```bash
# Local development server
hugo server

# Production build
hugo --gc --minify

# Export tutorial content to Markdown for PDF editing
python3 scripts/export_main_tutorial_text.py
```

Deploy target is **Netlify** (see `netlify.toml`). Hugo version: 0.128.0 extended.

## Architecture

### Content & Menus

Content lives in `content/` as Markdown files. Pages belong to one of four menus (set in front-matter):
- `main` — Tutorial (step-by-step lessons)
- `tsumego` — Go problems (easy/medium/hard)
- `theory` — Advanced concepts
- `matches` — Famous games (AlphaGo etc.)

Subdirectories `content/artigos/`, `content/guias/`, and `content/glossario/` hold articles, guides, and glossary entries respectively.

Front-matter keys unique to this site:
- `weight` — controls menu ordering
- `previous` / `next` — URL slugs for footer prev/next navigation
- `robotsdisallow` — adds `noindex` meta tag

### Layouts

- `layouts/_default/baseof.html` — master template; wraps all pages
- `layouts/partials/sidenavigation.html` — sidebar with 4-section menu + course promo
- `layouts/partials/topnavigation.html` — mobile hamburger menu
- `layouts/partials/footer.html` — prev/next nav + donation card
- `layouts/partials/head.html` — loads WGo.js, goBaduk.js, Google Analytics

### Interactive Go Boards (Shortcodes)

All interactive content uses Hugo shortcodes backed by WGo.js:

| Shortcode | Purpose |
|-----------|---------|
| `{{< challenge sgf="..." description="..." >}}` | Interactive problem (student must find correct move) |
| `{{< diagram sgf="..." description="..." >}}` | Static board display |
| `{{< review sgf="..." description="..." >}}` | Game replay with navigation |
| `{{< freeplay sgf="..." description="..." >}}` | Free-play board |
| `{{< blackplay sgf="..." description="..." >}}` | Black-to-play board |

SGF files live in `content/sgfs/` and are served from `/sgfs/` at runtime.

### JavaScript

- `static/js/wgo.js` — WGo.js library (Go board rendering)
- `static/js/goBaduk.js` — Custom logic: validates moves, handles KO/suicide, tracks correct answers, board tips
- `static/js/mobile-nav.js` — Hamburger menu toggle
- `static/js/go-board.js` — Additional board management

### Key Config Notes

- `markup.goldmark.renderer.unsafe = true` — raw HTML is allowed in Markdown content
- Taxonomies disabled (`disableKinds = ["taxonomy"]`)
- `languageCode = "pt-br"` — all content is in Brazilian Portuguese
