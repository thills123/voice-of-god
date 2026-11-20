---
layout: post
title: "What Static Sites Get Right"
date: 2026-11-12 09:00:00 +0000
categories: technology
tags: [web, jekyll, publishing]
description: "A blog does not need a database. It needs files, a generator, and a willingness to press commit."
image: /assets/images/cover-static.svg
image_alt: "Abstract grid of thin lines with a single solid square"
---

Every few years the web rediscovers the same idea: a page is just a file. The
frameworks change, the hosting changes, but the underlying bargain stays the
same, and it is a good one.

<!--more-->

A static site is built once, ahead of time, and then served as-is. There is no
application server deciding what to render, no database to query, no session to
look up. The visitor asks for a page and gets a page.

That sounds primitive. It is actually the reason these sites are so pleasant.

## Three things that follow

**Nothing can break at 2am.** There is no runtime to crash, no connection pool
to exhaust, no upgrade that quietly changes a default. If the site worked when
you deployed it, it will work later, untouched.

**The content outlives the tooling.** A folder of Markdown files is readable by
everything and dependent on nothing. If Jekyll disappears tomorrow, the words
are still there, and any other generator can pick them up in an afternoon.

**Speed is a design constraint you get for free.** No cold starts, no cache
warming, no render-blocking API calls. A static page is usually the fastest
thing on the network, and fast pages are easier to make accessible and easier
to read.

## The trade you are making

Static sites are not magic. You give up a few things, and it is worth being
honest about which:

| You give up | You get back |
| --- | --- |
| Server-side logic | Nothing to patch, nothing to probe |
| Built-in comments | A choice of third parties, or none |
| Instant publishing | A reviewable history of every change |
| Dynamic personalisation | The same page for everyone, cheaply |

For a personal blog, that trade is almost entirely in your favour. For an
application with accounts and permissions, it is not. The mistake is choosing
the architecture by fashion rather than by shape of the problem.

## What the files look like

The whole publishing interface is a text file with a small block of metadata at
the top. This is an actual article header, typed in Notepad:

```yaml
---
layout: post
title: "What Static Sites Get Right"
date: 2026-11-12
categories: technology
tags: [web, jekyll, publishing]
---
```

Save it in `_posts`, name it with the date, commit, push. A minute later the
page exists, with a URL, a feed entry, and an entry in the sitemap. No admin
panel was involved.

## The part people underestimate

The real benefit is not the hosting bill, although that is zero. It is that the
entire site is one repository you can read from top to bottom. When something
looks wrong, you open the file that made it. There is no layer between your
intent and the output except a template you can edit.

That is a rare thing in modern software, and it is worth protecting.
