/* ==========================================================================
   Voice of God — main.js
   Theme switching, mobile navigation, sticky header, table of contents,
   copy-link buttons, and a few reading conveniences.
   ========================================================================== */

(function () {
  "use strict";

  var root = document.documentElement;
  var header = document.querySelector("[data-header]");
  var navToggle = document.querySelector("[data-nav-toggle]");
  var themeToggle = document.querySelector("[data-theme-toggle]");
  var systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  /* --- Theme ------------------------------------------------------------ */

  function storedTheme() {
    try {
      return localStorage.getItem("theme");
    } catch (error) {
      return null;
    }
  }

  function applyTheme(mode) {
    root.setAttribute("data-theme", mode);
    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        mode === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
    }
  }

  if (themeToggle) {
    applyTheme(root.getAttribute("data-theme") || "light");

    themeToggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem("theme", next);
      } catch (error) {
        /* Private mode: theme simply won't persist. */
      }
    });

    systemDark.addEventListener("change", function (event) {
      if (!storedTheme()) {
        applyTheme(event.matches ? "dark" : "light");
      }
    });
  }

  /* --- Mobile navigation ------------------------------------------------ */

  function closeNav() {
    if (!header || !navToggle) return;
    header.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("nav-open");
  }

  if (header && navToggle) {
    navToggle.addEventListener("click", function () {
      var open = !header.classList.contains("is-open");
      header.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.classList.toggle("nav-open", open);
    });

    header.querySelectorAll(".nav a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });

    document.addEventListener("click", function (event) {
      if (!header.classList.contains("is-open")) return;
      if (!header.contains(event.target)) closeNav();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) closeNav();
    });
  }

  /* --- Sticky header state --------------------------------------------- */

  if (header) {
    var updateHeader = function () {
      header.classList.toggle("is-stuck", window.scrollY > 6);
    };
    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();
  }

  /* --- Table of contents ------------------------------------------------ */

  var prose = document.querySelector("[data-prose]");
  var toc = document.querySelector("[data-toc]");

  function slugify(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  }

  if (prose && toc) {
    var headings = prose.querySelectorAll("h2, h3");

    if (headings.length >= 3) {
      var list = document.createElement("ol");
      var nav = toc.querySelector("[data-toc-nav]");

      headings.forEach(function (heading, position) {
        if (!heading.id) {
          heading.id = slugify(heading.textContent) || "section-" + (position + 1);
        }

        var item = document.createElement("li");
        if (heading.tagName === "H3") {
          item.className = "is-sub";
        }

        var link = document.createElement("a");
        link.href = "#" + heading.id;
        link.textContent = heading.textContent;

        item.appendChild(link);
        list.appendChild(item);
      });

      if (nav) nav.appendChild(list);
      toc.hidden = false;
    }
  }

  /* --- Copy link buttons ------------------------------------------------ */

  function legacyCopy(text) {
    var area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();

    try {
      document.execCommand("copy");
    } catch (error) {
      /* Nothing else we can do. */
    }

    document.body.removeChild(area);
  }

  document.addEventListener("click", function (event) {
    var button = event.target.closest("[data-copy]");
    if (!button) return;

    var text = button.getAttribute("data-copy");
    var original = button.textContent;

    var done = function () {
      button.textContent = "Copied";
      window.setTimeout(function () {
        button.textContent = original;
      }, 1800);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () {
        legacyCopy(text);
        done();
      });
    } else {
      legacyCopy(text);
      done();
    }
  });

  /* --- Reading conveniences -------------------------------------------- */

  // Open external links in a new tab, and keep referrer information minimal.
  if (prose) {
    prose.querySelectorAll('a[href^="http"]').forEach(function (link) {
      if (link.hostname !== window.location.hostname) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
    });
  }

  // Press "/" anywhere to search.
  document.addEventListener("keydown", function (event) {
    if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) {
      return;
    }

    var target = event.target;
    var typing =
      target &&
      (target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable);

    if (typing) return;

    var localInput = document.querySelector("[data-search-input]");
    if (localInput) {
      event.preventDefault();
      localInput.focus();
      return;
    }

    var searchLink = document.querySelector("[data-search-link]");
    if (searchLink) {
      event.preventDefault();
      window.location.href = searchLink.href;
    }
  });
})();
