---
title: About
description: "Who writes Voice of God, and what it is for."
permalink: /about/
---

# About this blog

Voice of God is a personal blog by **{{ site.author.name }}**. It is a place for
essays and shorter notes about technology, design, and the craft of paying
attention to the things most people scroll past.

There is no editorial calendar and no growth strategy. Articles appear when
there is something worth saying.

## What you'll find here

- **Essays** &mdash; longer arguments about how tools shape the way we think.
- **Technology** &mdash; the web, static publishing, and software that gets out
  of the way.
- **Design** &mdash; restraint, typography, and interfaces that respect the
  reader.
- **Notes** &mdash; short observations, working habits, and things learned in
  public.

## How this site is built

Deliberately boring, on purpose:

| Part | What it is |
| --- | --- |
| Writing | Markdown files in `_posts`, typed in Windows Notepad |
| Design | Hand-written HTML and CSS |
| Generator | Jekyll turns Markdown into static pages |
| Hosting | GitHub Pages, free |
| Database | None |

No CMS, no server, no plugins to update at 2am. You can read the source of every
page you are looking at with `View Source`.

## Colophon

The type is set in your system's serif and sans-serif faces &mdash; nothing is
downloaded from a font CDN, so pages render instantly and text stays readable at
any size. The palette is paper and ink with a single brick accent. The whole
stylesheet is one file of plain CSS.

## Elsewhere

- [All topics](/topics/)
- [Search the archive](/search/)
- [RSS feed](/feed.xml)
{% if site.social.github and site.social.github != "" %}
- [GitHub](https://github.com/{{ site.social.github }})
{% endif %}
- [Contact](/contact/)
