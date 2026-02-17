# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal academic website for Jerry Han, deployed as a GitHub Pages site at https://jerryhan60.github.io/. Based on [Jon Barron's website template](https://github.com/jonbarron/jonbarron_website).

## Development

This is a static site with no build system, bundler, or package manager. To preview locally, open `index.html` in a browser or run a local server:

```
python3 -m http.server 8000
```

Deployment happens automatically via GitHub Pages when pushing to the `master` branch.

## Architecture

- `index.html` — Main portfolio page (bio, experience, projects, awards, courses). Uses table-based layout inherited from the Barron template.
- `stylesheet.css` — Global styles. Uses the Lato font loaded from Google Fonts via `@font-face` declarations. Link color is `#1772d0`, hover is `#f09228`.
- `zipnerf/` — Standalone project page for Zip-NeRF with its own `index.html`, Bootstrap CSS, and JS (video comparison widget). This is a separate self-contained page, not part of the main site layout.
- `images/` — Profile photo, logos, project thumbnails, and favicons (in `images/favicon/`).
- `data/` — PDFs (resume, paper).

## Content Structure in index.html

The main page is organized into four sections, each as a `<table>` block:
1. **Header** — Name, bio, profile photo, contact links
2. **Professional Experience** — Two-column rows (image left, description right)
3. **Projects** — Same two-column layout
4. **Others** — Awards and courses lists

To add a new experience or project entry, copy an existing `<tr>` block with the 25%/75% column width pattern and modify the content.
