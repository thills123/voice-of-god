# Voice of God

A personal blog by **Tommy**, built with Jekyll and published for free on GitHub
Pages. Articles are plain Markdown files written in Windows Notepad. There is no
database, no CMS, and no server to maintain.

Live at: `https://thills123.github.io/voice-of-god/`

---

## What's in the folder

| Path | What it does |
| --- | --- |
| `_config.yml` | Site title, author, URL, navigation, comments. The only config file. |
| `_posts/` | **Your articles.** One Markdown file per article. |
| `_layouts/` | Page templates (home, post, page, archive). |
| `_includes/` | Reusable pieces (header, footer, post card, comments, share links). |
| `assets/css/style.css` | The entire design, in one plain CSS file. |
| `assets/js/main.js` | Theme toggle, mobile menu, table of contents, copy-link. |
| `assets/js/search.js` | Client-side search. |
| `assets/images/` | Covers, illustrations, favicon. |
| `index.html` | Homepage (paginated list of articles). |
| `about.md`, `contact.md` | Standalone pages written in Markdown. |
| `topics.html` | Category and tag index. |
| `search.html` | Search page. |
| `404.html` | Not-found page. |
| `scripts/` | Optional helpers for creating and publishing a post. |
| `.github/workflows/pages.yml` | The build-and-deploy pipeline. |

---

## One-time GitHub setup

Do this once. After that, publishing is two clicks.

1. On GitHub, create a **public** repository called `voice-of-god`
   (do not add a README, licence, or .gitignore).

2. Open PowerShell in this folder and run:

   ```powershell
   git init
   git add .
   git commit -m "Initial blog"
   git branch -M main
   git remote add origin https://github.com/thills123/voice-of-god.git
   git push -u origin main
   ```

3. In the repository, go to **Settings → Pages**.
   Under **Build and deployment → Source**, choose **GitHub Actions**.

4. Open the **Actions** tab. The workflow *Build and deploy blog* runs
   automatically. When it turns green, the site is live at
   `https://thills123.github.io/voice-of-god/`.

> **Using a `username.github.io` repository instead?**
> Name the repository `thills123.github.io`, then in `_config.yml` comment out
> the two `url` / `baseurl` lines for project sites and uncomment the two
> `username.github.io` lines. The Actions workflow passes the right base path
> either way — that change only matters for local previews.

---

## Writing an article

### The fast way (recommended)

Double-click **`scripts\new-post.cmd`**, type a title, and press Enter.
A correctly named file opens in Notepad with the header already filled in.

When you have finished writing, double-click **`scripts\publish.cmd`**.
It commits everything and pushes to GitHub. The site updates about a minute
later.

### The manual way

Create a file in `_posts` named with the date and a slug:

```
_posts/2026-11-21-the-future-of-artificial-intelligence.md
```

The file must start with a header between two `---` lines:

```markdown
---
layout: post
title: "The Future of Artificial Intelligence"
date: 2026-11-21 09:00:00 +0000
categories: technology
tags: [ai, business, predictions]
description: "One sentence that search engines and social previews will use."
image: /assets/images/cover-ai.svg
image_alt: "Short description of the image"
---

Your opening paragraph goes here. This is what appears on the homepage card.

<!--more-->

## A section heading

The rest of the article. Normal Markdown works: **bold**, *italic*, [links](https://example.com),
lists, tables, quotes and fenced code blocks.
```

### Header fields

| Field | Required | Notes |
| --- | --- | --- |
| `layout` | Yes | Always `post`. |
| `title` | Yes | Keep it in quotes. |
| `date` | Yes | `YYYY-MM-DD HH:MM:SS +0000`. Also drives the filename and sort order. |
| `categories` | No | One category, e.g. `technology`. Creates `/category/technology/`. |
| `tags` | No | A list: `[ai, business]`. Creates `/tag/ai/`. |
| `description` | Strongly recommended | One sentence used by Google and social cards. |
| `image` | No | Cover image path. Without it, a coloured initial is used. |
| `image_alt` | No | Describe the cover for screen readers. |
| `featured` | No | `true` pins the article to the top of the homepage. |
| `author` | No | Overrides the site author for this article. |

**The date must not be in the future.** Jekyll silently skips future-dated
articles. If a post does not appear, this is almost always why.

The `<!--more-->` marker is optional. Everything above it is used as the summary
on the homepage; everything below it is the article.

### Markdown cheat sheet

| You type | You get |
| --- | --- |
| `## Heading` | A section heading (also appears in "On this page") |
| `**bold**` / `*italic*` | **bold** / *italic* |
| `[text](https://example.com)` | A link |
| `- item` | A bulleted list |
| `1. item` | A numbered list |
| `> quote` | A pull quote |
| `` `code` `` | Inline code |
| `![alt text](path)` | An image |
| `---` | A horizontal rule |

---

## Adding images

1. Copy the image into `assets/images/`, for example `team-photo.jpg`.
2. Reference it inside an article like this:

   ```markdown
   ![The team in the studio]({{ site.baseurl }}/assets/images/team-photo.jpg)
   ```

3. To use it as the article's cover, add it to the header instead:

   ```yaml
   image: /assets/images/team-photo.jpg
   image_alt: "The team in the studio"
   ```

Keep photos under about 300 KB. Cover images look best at 16:10 (for example
1600 × 1000 pixels). SVG illustrations stay crisp at any size and are ideal for
abstract covers.

---

## Changing the site

All in `_config.yml`:

| Setting | Example |
| --- | --- |
| `title` | `"Voice of God"` |
| `tagline` | The large headline on the homepage |
| `description` | Used by search engines and social previews |
| `author.name`, `author.bio` | Your name and one-line description |
| `author.email` | Fills in the contact page |
| `social.github`, `social.x` | Footer and share links |
| `navigation` | The links in the header |
| `paginate` | Articles per homepage page (default 6) |
| `comments` | See below |

---

## Comments (optional, off by default)

Comments use **giscus**, which stores them in GitHub Discussions — free and
without a database.

1. Make sure the repository is public.
2. Enable **Discussions** in the repository's Settings.
3. Install the giscus app: <https://github.com/apps/giscus>
4. Visit <https://giscus.app>, enter the repository, and copy the generated
   `data-repo-id` and `data-category-id` values.
5. In `_config.yml`, set `comments.enabled: true` and paste the two IDs into
   `repo_id` and `category_id`.

Comments load only on article pages. Visitors need a GitHub account to post.

---

## Search

Search is built in and needs no service. `search.json` is generated on every
build and contains the title, category, tags, summary and text of each article.
`assets/js/search.js` scores matches in the browser.

Press <kbd>/</kbd> anywhere on the site to jump to the search page.

To exclude an article from search, set `sitemap: false` and `search: false` in
its front matter — or simply leave the article unpublished.

---

## Previewing locally (optional)

You do not need this to publish. GitHub builds the site for you.

**With Ruby installed:**

```powershell
gem install bundler
bundle install
bundle exec jekyll serve
```

Then open <http://localhost:4000>.

**With Docker:**

```powershell
docker run --rm -v "${PWD}:/srv/jekyll" -p 4000:4000 jekyll/jekyll:4 `
  sh -c "gem install jekyll-archives --no-document && jekyll serve --host 0.0.0.0"
```

If your repository is a project site, local URLs need the base path:
add `--baseurl ""` for previewing, as the live site adds it automatically.

---

## How publishing works

```
Notepad  ->  _posts/*.md  ->  git push  ->  GitHub Actions  ->  Jekyll build  ->  GitHub Pages
```

Every push to `main` rebuilds the whole site: pages, category and tag archives,
the RSS feed (`/feed.xml`), the sitemap (`/sitemap.xml`), and `search.json`.
Deployment almost always finishes in under two minutes.

---

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| A new article does not appear | Date is in the future, the file is not in `_posts`, or the filename is not `YYYY-MM-DD-name.md` |
| The page is unstyled after deploying | `baseurl` in `_config.yml` does not match the repository name |
| The Actions run fails | Open the red run and read the first red step; usually a YAML typo such as an unclosed quote |
| Search returns nothing | `search.json` is missing from the deployed site, or JavaScript is disabled |
| New styles do not show | The browser cache — hard refresh with `Ctrl+F5` |
| Images are missing | Path must start with `/assets/images/…`, and the file name is case-sensitive on the server |
| The homepage is empty | No article has a date in the past |

---

## Custom domain (optional)

1. Create a file named `CNAME` at the root containing only your domain, e.g.
   `blog.example.com`.
2. Add a `CNAME` DNS record pointing at `thills123.github.io`.
3. In **Settings → Pages → Custom domain**, enter the domain and enable HTTPS.

Then set `url` in `_config.yml` to the new domain and `baseurl` to `""`.

---

## Design notes

- No web fonts, no analytics, no tracking scripts, no cookies.
- Light and dark themes, following the operating system by default.
- One stylesheet, about 1,300 lines, readable top to bottom.
- Fully responsive: three-column desktop grid, single column on phones.
- Accessible: skip link, visible focus rings, real heading order, labelled
  controls, and reduced-motion support.
