(function () {
  "use strict";

  var config = window.SITE_CONFIG || { authorMe: "Ningjing Fan" };
  var pubs = window.PUBLICATIONS || [];

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
        if (name === config.authorMe) {
          return "<strong>" + escapeHtml(name) + suffix + "</strong>";
        }
        return escapeHtml(name) + suffix;
      })
      .join(", ");
  }

  var linkOrder = ["project", "paper", "arxiv", "code", "doi", "slides", "poster", "video"];

  function linkLabel(key) {
    var labels = {
      project: "project page",
      paper: "paper",
      arxiv: "arxiv",
      code: "code",
      doi: "doi",
      slides: "slides",
      poster: "poster",
      video: "video",
      pdf: "paper",
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

  function formatVenue(pub) {
    if (!pub.venue) return "";
    if (pub.year && pub.venue.indexOf(String(pub.year)) < 0) {
      return escapeHtml(pub.venue) + ", " + escapeHtml(String(pub.year));
    }
    return escapeHtml(pub.venue);
  }

  function renderLinks(pub) {
    if (!pub.links) return "";
    var keys = orderedLinkKeys(pub.links);
    return keys
      .map(function (k, i) {
        var link =
          '<a href="' +
          escapeHtml(pub.links[k]) +
          '" target="_blank" rel="noopener noreferrer">' +
          linkLabel(k) +
          "</a>";
        return i < keys.length - 1 ? link + " /" : link;
      })
      .join("\n              ");
  }

  function renderMedia(pub) {
    if (pub.video) {
      return (
        '<div class="pub-thumbnail">' +
        '<video src="' +
        escapeHtml(pub.video) +
        '" autoplay muted loop playsinline aria-label="' +
        escapeHtml(pub.title) +
        '"></video>' +
        "</div>"
      );
    }
    var imageSrc = pub.image || "images/placeholder.svg";
    return (
      '<div class="pub-thumbnail">' +
      '<img src="' +
      escapeHtml(imageSrc) +
      '" alt="' +
      escapeHtml(pub.title) +
      '">' +
      "</div>"
    );
  }

  function renderPubRow(pub) {
    var venueLine = formatVenue(pub);
    var descLine = pub.description
      ? "<p>" + escapeHtml(pub.description) + "</p>"
      : "";

    return (
      "<tr>\n" +
      '            <td class="pub-thumbnail-cell">\n' +
      "              " +
      renderMedia(pub) +
      "\n" +
      "            </td>\n" +
      '            <td class="pub-content-cell" valign="middle">\n' +
      '              <span class="papertitle">' +
      escapeHtml(pub.title) +
      "</span>\n" +
      "              <br>\n" +
      "              " +
      formatAuthors(pub.authors, pub.marks || {}) +
      "\n" +
      "              <br>\n" +
      "              " +
      venueLine +
      "\n" +
      "              <br>\n" +
      "              " +
      renderLinks(pub) +
      "\n" +
      "              " +
      descLine +
      "\n" +
      "            </td>\n" +
      "          </tr>"
    );
  }

  var tableEl = document.getElementById("publications-table");
  if (tableEl && pubs.length) {
    var sorted = pubs.slice().sort(function (a, b) {
      return (b.year || 0) - (a.year || 0);
    });
    var tbody = tableEl.querySelector("tbody");
    if (tbody) {
      tbody.innerHTML = sorted.map(renderPubRow).join("\n\n          ");
    }
  }
})();
