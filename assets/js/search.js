/* ==========================================================================
   Voice of God — search.js
   A tiny client-side search over /search.json. No dependencies, no backend.
   Results are built with DOM nodes (never innerHTML) so article text can
   never inject markup into the page.
   ========================================================================== */

(function () {
  "use strict";

  var root = document.querySelector("[data-search]");
  if (!root) return;

  var input = root.querySelector("[data-search-input]");
  var resultsBox = root.querySelector("[data-search-results]");
  var statusBox = root.querySelector("[data-search-status]");
  var emptyBox = root.querySelector("[data-search-empty]");
  var form = root.querySelector(".search__form");
  var indexUrl = root.getAttribute("data-index") || "/search.json";

  var documents = null;
  var loadPromise = null;
  var timer = null;

  var WEIGHTS = {
    title: 12,
    tags: 8,
    category: 6,
    excerpt: 3,
    content: 1
  };

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function tokensFor(query) {
    return normalize(query)
      .split(/\s+/)
      .map(function (token) {
        return token.replace(/[^\w'-]/g, "");
      })
      .filter(function (token) {
        return token.length > 0;
      });
  }

  function loadIndex() {
    if (!loadPromise) {
      loadPromise = fetch(indexUrl, { credentials: "same-origin" })
        .then(function (response) {
          if (!response.ok) throw new Error("HTTP " + response.status);
          return response.json();
        })
        .then(function (data) {
          documents = Array.isArray(data) ? data : [];
          return documents;
        });
    }
    return loadPromise;
  }

  function scoreDocument(doc, tokens, phrase) {
    var fields = {
      title: normalize(doc.title),
      tags: normalize((doc.tags || []).join(" ")),
      category: normalize(doc.category),
      excerpt: normalize(doc.excerpt),
      content: normalize(doc.content)
    };

    var haystack = [
      fields.title,
      fields.tags,
      fields.category,
      fields.excerpt,
      fields.content
    ].join(" ");

    for (var i = 0; i < tokens.length; i += 1) {
      if (haystack.indexOf(tokens[i]) === -1) return -1;
    }

    var score = 0;
    tokens.forEach(function (token) {
      Object.keys(WEIGHTS).forEach(function (field) {
        if (fields[field].indexOf(token) !== -1) {
          score += WEIGHTS[field];
        }
      });
    });

    if (phrase && fields.title.indexOf(phrase) !== -1) score += 20;
    if (phrase && fields.title === phrase) score += 30;
    if (fields.title.indexOf(tokens[0]) === 0) score += 8;

    return score;
  }

  function buildSnippet(doc, tokens) {
    var excerpt = String(doc.excerpt || "").trim();
    var content = String(doc.content || "").trim();
    var haystack = normalize(excerpt);

    var found = tokens.some(function (token) {
      return haystack.indexOf(token) !== -1;
    });

    if (excerpt && (found || tokens.length === 0)) {
      return excerpt.length > 210 ? excerpt.slice(0, 207).trimEnd() + "…" : excerpt;
    }

    var body = normalize(content);
    var position = -1;
    tokens.forEach(function (token) {
      var at = body.indexOf(token);
      if (at !== -1 && (position === -1 || at < position)) position = at;
    });

    if (position === -1) {
      return excerpt || content.slice(0, 200) + (content.length > 200 ? "…" : "");
    }

    var start = Math.max(0, position - 70);
    var end = Math.min(content.length, start + 210);
    var snippet = content.slice(start, end).trim();

    if (start > 0) snippet = "…" + snippet;
    if (end < content.length) snippet = snippet + "…";

    return snippet;
  }

  function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function highlight(element, text, tokens) {
    if (!tokens.length) {
      element.textContent = text;
      return;
    }

    var pattern = new RegExp("(" + tokens.map(escapeRegExp).join("|") + ")", "gi");
    var parts = String(text).split(pattern);
    var lowered = tokens.map(function (token) {
      return token.toLowerCase();
    });

    parts.forEach(function (part) {
      if (!part) return;
      if (lowered.indexOf(part.toLowerCase()) !== -1) {
        var mark = document.createElement("mark");
        mark.textContent = part;
        element.appendChild(mark);
      } else {
        element.appendChild(document.createTextNode(part));
      }
    });
  }

  function render(matches, tokens) {
    resultsBox.textContent = "";

    if (!matches.length) return;

    var fragment = document.createDocumentFragment();

    matches.slice(0, 25).forEach(function (match) {
      var doc = match.doc;

      var link = document.createElement("a");
      link.className = "search-result";
      link.href = doc.url;

      var kicker = document.createElement("p");
      kicker.className = "search-result__kicker";
      kicker.textContent = [doc.category, doc.date]
        .filter(Boolean)
        .join("  ·  ");

      var title = document.createElement("h2");
      title.className = "search-result__title";
      highlight(title, doc.title, tokens);

      var excerpt = document.createElement("p");
      excerpt.className = "search-result__excerpt";
      highlight(excerpt, buildSnippet(doc, tokens), tokens);

      link.appendChild(kicker);
      link.appendChild(title);
      link.appendChild(excerpt);
      fragment.appendChild(link);
    });

    resultsBox.appendChild(fragment);
  }

  function runSearch(rawQuery) {
    var query = String(rawQuery || "").trim();
    var tokens = tokensFor(query);

    if (!query || !tokens.length) {
      render([], []);
      statusBox.textContent = "";
      emptyBox.hidden = true;
      return;
    }

    loadIndex()
      .then(function (docs) {
        var phrase = normalize(query);
        var matches = docs
          .map(function (doc) {
            return { doc: doc, score: scoreDocument(doc, tokens, phrase) };
          })
          .filter(function (match) {
            return match.score > -1;
          })
          .sort(function (a, b) {
            return b.score - a.score;
          });

        render(matches, tokens);

        var count = Math.min(matches.length, 25);
        statusBox.textContent =
          matches.length === 0
            ? ""
            : count +
              (count === 1 ? " result" : " results") +
              (matches.length > count ? " (showing the first " + count + ")" : "") +
              " for “" + query + "”";

        emptyBox.hidden = matches.length !== 0;
      })
      .catch(function () {
        statusBox.textContent =
          "Search is unavailable right now. Please try again.";
      });
  }

  function scheduleSearch() {
    window.clearTimeout(timer);
    timer = window.setTimeout(function () {
      runSearch(input.value);
    }, 140);
  }

  input.addEventListener("input", scheduleSearch);

  input.addEventListener("focus", function () {
    loadIndex().catch(function () {
      /* Failure is reported when a search actually runs. */
    });
  });

  if (form) {
    form.addEventListener("submit", function (event) {
      if (!window.fetch) return;
      event.preventDefault();
      var url = new URL(window.location.href);
      url.searchParams.set("q", input.value);
      window.history.replaceState({}, "", url);
      runSearch(input.value);
      input.blur();
    });
  }

  var initial = new URLSearchParams(window.location.search).get("q") || "";
  if (initial) {
    input.value = initial;
    runSearch(initial);
  }
})();
