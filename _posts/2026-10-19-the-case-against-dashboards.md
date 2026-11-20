---
layout: post
title: "The Case Against Dashboards"
date: 2026-10-19 09:00:00 +0000
categories: technology
tags: [software, measurement, focus]
description: "A dashboard is a promise that the important thing can be seen at a glance. Usually it cannot."
image: /assets/images/cover-dashboards.svg
image_alt: "Abstract quarter circles and bars in slate and cream"
---

Somewhere along the way, "visibility" became a synonym for "understanding". A
dashboard shows you numbers. It does not tell you which of them matter, and it
almost never tells you why they moved.

<!--more-->

The appeal is obvious. A single screen, a few charts, a headline figure in a
large font. It feels like command. But most dashboards are built by asking
"what can we measure?" rather than "what decision does this support?", and the
result is a wall of evidence with no argument.

## A chart is a sentence

Every chart makes a claim. *This went up. This is unusual. These two things move
together.* If you cannot write the claim in a sentence, the chart is decoration,
and decoration in an operations meeting is expensive.

The test I use is simple: what would you do differently if this number were ten
per cent higher? If the honest answer is "nothing", the number belongs in a
report someone reads quarterly, not on a screen someone watches hourly.

## Three questions worth asking

1. **What decision does this page change?** If none, it is not a dashboard, it
   is a screensaver.
2. **What is the baseline?** A number without a comparison is a rumour.
3. **Who is allowed to act on it?** Visibility without authority produces
   anxiety, not improvement.

A useful dashboard is usually smaller than people expect: three or four signals,
each with a threshold that triggers a specific response, and a link to the
underlying detail for the day the threshold is crossed.

## Prefer the query

The alternative to a dashboard is not ignorance. It is a good query, run when
you have a question. It costs thirty seconds and it produces an answer to
something you actually asked, instead of an answer to something you were told
to watch.

The best instrument panel I have seen for a small team was a single page with a
list of saved questions and the date each was last asked. It looked unfinished.
It was more useful than every dashboard we had replaced.
