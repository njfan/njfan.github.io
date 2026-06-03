(function () {
  "use strict";

  /* Always open at the top on load/refresh (avoid restored scroll position). */
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  function scrollToTop() {
    window.scrollTo(0, 0);
  }
  scrollToTop();
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) scrollToTop();
  });

  var config = window.SITE_CONFIG || { authorMe: "Ningjing Fan", lastUpdated: "" };
  var pubs = window.PUBLICATIONS || [];

  var themeBtn = document.getElementById("theme-toggle");
  var root = document.documentElement;

  function setTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
      if (themeBtn) themeBtn.textContent = "☀";
    } else {
      root.removeAttribute("data-theme");
      if (themeBtn) themeBtn.textContent = "☾";
    }
    localStorage.setItem("theme", theme);
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      setTheme(next);
    });
  }

  var lastEl = document.getElementById("last-updated");
  if (lastEl && config.lastUpdated) {
    lastEl.textContent = config.lastUpdated;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatAuthors(authors, marks) {
    marks = marks || {};
    return (authors || [])
      .map(function (name, i) {
        var suffix = "";
        if (marks.equal && marks.equal.indexOf(i) >= 0) suffix += "*";
        if (marks.corresponding && marks.corresponding.indexOf(i) >= 0) suffix += "*";
        var cls = name === config.authorMe ? ' class="me"' : "";
        return "<span" + cls + ">" + escapeHtml(name) + suffix + "</span>";
      })
      .join(", ");
  }

  /** <conference>, <year> */
  function formatVenue(pub) {
    if (!pub.venue) return "";
    var line = "<i>" + escapeHtml(pub.venue) + "</i>";
    if (pub.year) {
      line += ", " + escapeHtml(String(pub.year));
    }
    return line;
  }

  var linkOrder = ["project", "paper", "arxiv", "code", "doi", "slides", "poster", "video"];

  function linkLabel(key) {
    var labels = {
      project: "Project",
      paper: "Paper",
      arxiv: "arXiv",
      code: "Code",
      doi: "DOI",
      slides: "Slides",
      poster: "Poster",
      video: "Video",
      pdf: "Paper",
    };
    return labels[key] || key;
  }

  function orderedLinkKeys(links) {
    if (!links) return [];
    return linkOrder.filter(function (k) {
      return links[k];
    }).concat(
      Object.keys(links).filter(function (k) {
        return links[k] && linkOrder.indexOf(k) < 0;
      })
    );
  }

  function renderPub(pub, index) {
    var bibId = "bib-" + index;
    var venueLine = formatVenue(pub);

    var linkParts = [];
    if (pub.links) {
      orderedLinkKeys(pub.links).forEach(function (k) {
        linkParts.push(
          '<a href="' +
            escapeHtml(pub.links[k]) +
            '" target="_blank" rel="noopener noreferrer">' +
            linkLabel(k) +
            "</a>"
        );
      });
    }
    if (pub.bibtex) {
      linkParts.push(
        '<button type="button" class="bib-toggle" data-target="' +
          bibId +
          '" aria-expanded="false">Bib</button>'
      );
    }

    var metaHtml = linkParts.length
      ? '<span class="pub-meta">' + linkParts.join('<span class="sep">|</span>') + "</span>"
      : "";

    return (
      '<li class="pub-item">' +
      '<span class="pub-title">' +
      escapeHtml(pub.title) +
      "</span>" +
      '<span class="pub-authors">' +
      formatAuthors(pub.authors, pub.marks || {}) +
      "</span>" +
      (venueLine ? '<span class="pub-venue">' + venueLine + "</span>" : "") +
      metaHtml +
      (pub.bibtex
        ? '<pre id="' +
          bibId +
          '" class="pub-bib" hidden>' +
          escapeHtml(pub.bibtex.trim()) +
          "</pre>"
        : "") +
      "</li>"
    );
  }

  var listEl = document.getElementById("publications-list");
  if (listEl && pubs.length) {
    var sorted = pubs.slice().sort(function (a, b) {
      return (b.year || 0) - (a.year || 0);
    });
    listEl.innerHTML = sorted.map(renderPub).join("");
  }

  function bindToggles(selector) {
    document.querySelectorAll(selector).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-target");
        var panel = document.getElementById(id);
        if (!panel) return;
        var open = !panel.classList.contains("is-open");
        panel.classList.toggle("is-open", open);
        panel.hidden = !open;
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });
  }

  bindToggles(".bib-toggle");
})();
