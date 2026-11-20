---
title: Contact
description: "How to get in touch."
permalink: /contact/
---

# Get in touch

The best way to reach me is by email. I read everything, though I'm slow to
reply to anything that looks like a pitch.

{% if site.author.email and site.author.email != "" %}
**Email:** [{{ site.author.email }}](mailto:{{ site.author.email }})
{% else %}
**Email:** add `author.email` to `_config.yml` and this line fills itself in.
{% endif %}

{% if site.social.github and site.social.github != "" %}
**GitHub:** [github.com/{{ site.social.github }}](https://github.com/{{ site.social.github }})
{% endif %}

## What I'd like to hear about

- Corrections &mdash; if something here is wrong, tell me and I'll fix it.
- Follow-up questions on an essay, especially ones I didn't answer well.
- Links to things I should be reading.

## What I probably won't reply to

- Guest post requests, sponsored content, and link insertions.
- Anything asking me to "jump on a quick call" about a product.
{% if site.comments.enabled != true %}
- Article comments &mdash; email works better for now.
{% endif %}

You can also subscribe to the [RSS feed](/feed.xml) if you'd rather just be
notified when something new appears.
