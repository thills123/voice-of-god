---
layout: post
title: "Notes on Writing in Notepad"
date: 2026-10-27 09:00:00 +0000
categories: notes
tags: [writing, workflow, tools]
description: "The least interesting editor is sometimes the most useful one. A short field guide to publishing from a text file."
image: /assets/images/cover-notepad.svg
image_alt: "Abstract page of ruled lines with a few filled bars"
---

Notepad has no plugins, no sidebar, no AI assistant, and no opinion about your
prose. That is the entire feature list, and it turns out to be enough.

<!--more-->

I write in Notepad because it starts before I have finished deciding to write.
There is no splash screen, no workspace to restore, no update prompt. The
cursor is blinking in an empty file and the only thing left to do is type.

## The discipline of plain text

A Markdown file is legible in any editor, on any machine, in twenty years. You
can read it in a terminal, diff it in Git, or print it and mark it up with a
pen. Nothing about the file depends on the program that made it.

The constraint is useful in another way: without formatting buttons, you learn
the handful of marks that actually matter.

- `#` for a heading, `##` for a section
- `**bold**` for the one phrase worth stressing
- `>` for a quotation
- `-` for a list, and not much else

If a sentence needs three kinds of emphasis, the sentence needs rewriting.

## The file is the article

The filename carries the publication date, which means the folder sorts itself:

```
_posts/
  2026-11-20-the-quiet-case-for-slowness.md
  2026-11-12-what-static-sites-get-right.md
  2026-11-04-designing-with-less.md
```

The block between the two `---` lines at the top is the article's paperwork:
title, date, category, tags, and a one-sentence description that search engines
and social previews will use. Everything below it is the article.

## A practice that survives

Write the title first, even badly. Write the ending second, so you know what
you are walking towards. Then fill the middle, and stop when the argument is
finished rather than when the word count is.

Save the file. Close the laptop. Read it once more in the morning before you
commit. The delay costs nothing and catches almost everything.

The tool is not the point. The tool is just quiet enough that the point can be
the writing.
