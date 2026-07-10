/* ============================================================
   TORQ Cymru — consent-gated GA4 analytics (draft wiring)
   ------------------------------------------------------------
   STATUS: READY FOR A REAL TORQ GA4 MEASUREMENT ID ONLY.
   No ID is hardcoded here. The site remains inert until a real
   GA4 Measurement ID is set at:

     window.TORQ_ANALYTICS_CONFIG.measurementId = "G-..."

   Privacy guardrails:
   - GA never loads unless analytics consent is granted.
   - Only approved non-PII event params are allowed out.
   - No booking/contact field values are ever sent.
   ============================================================ */
(function () {
  "use strict";

  var CONFIG = window.TORQ_ANALYTICS_CONFIG || {};
  var CONSENT_KEY = CONFIG.consentKey || "torq_analytics_consent_v1";
  var rawId = ((CONFIG && CONFIG.measurementId) || window.TORQ_GA_ID || "").trim();
  var MEASUREMENT_ID = /^G-[A-Z0-9]+$/i.test(rawId) ? rawId : "";
  var loaded = false;

  var SAFE_PARAMS = {
    page_path: 1,
    placement: 1,
    service_slug: 1,
    service_count: 1,
    has_addons: 1,
    error_category: 1
  };

  var BANNED = /name|phone|tel|email|mail|reg|registration|plate|postcode|address|vehicle|make|model|message|enquiry|desc|note|dob|vin/i;

  function getPagePath() {
    return location.pathname + (location.hash || "");
  }

  function hasConsent() {
    try {
      return localStorage.getItem(CONSENT_KEY) === "granted";
    } catch (e) {
      return false;
    }
  }

  function scrub(params) {
    var out = {};
    if (!params) return out;
    Object.keys(params).forEach(function (key) {
      if (!SAFE_PARAMS[key]) return;
      if (BANNED.test(key)) return;
      var value = params[key];
      if (typeof value === "string") {
        value = value.trim().slice(0, 80);
        if (!value) return;
      }
      if (typeof value === "boolean" || typeof value === "number" || typeof value === "string") {
        out[key] = value;
      }
    });
    return out;
  }

  function ensureGtagStub() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  }

  function load() {
    if (loaded || !MEASUREMENT_ID || !hasConsent()) return false;
    loaded = true;
    ensureGtagStub();
    if (!document.querySelector('script[data-torq-ga="1"]')) {
      var script = document.createElement("script");
      script.async = true;
      script.setAttribute("data-torq-ga", "1");
      script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(MEASUREMENT_ID);
      document.head.appendChild(script);
    }
    window.gtag("js", new Date());
    window.gtag("config", MEASUREMENT_ID, {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      send_page_view: true,
      page_path: getPagePath()
    });
    return true;
  }

  function track(eventName, params) {
    if (!MEASUREMENT_ID || !hasConsent()) return false;
    if (typeof window.gtag !== "function") return false;
    var payload = scrub(params || {});
    if (!payload.page_path) payload.page_path = getPagePath();
    window.gtag("event", eventName, payload);
    return true;
  }

  function derivePlacement(el) {
    if (!el) return "unknown";
    var explicit = el.getAttribute("data-analytics-placement");
    if (explicit) return explicit;
    if (el.closest("footer")) return "footer";
    if (el.closest("header") || el.closest("nav") || el.closest("#mobile-menu")) return "header";
    if (el.closest(".mobile-cta-bar") || el.closest(".fixed.bottom-0")) return "sticky_bar";
    if (el.closest("#app")) return "portal_section";
    if (el.closest("#booking")) return "booking_section";
    if (el.closest("#hero") || el.closest("section") && el.closest("section").querySelector("h1")) return "hero";
    if (el.closest("section") && /Call Now/.test(el.textContent || "")) return "emergency_cta";
    return "body";
  }

  function serviceSlugFromHref(href) {
    if (!href) return "";
    var hashIndex = href.indexOf("#");
    if (hashIndex === -1) return "";
    return href.slice(hashIndex + 1).trim().toLowerCase();
  }

  function wireClickEvents() {
    document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {
      link.addEventListener("click", function () {
        track("click_call", { page_path: getPagePath(), placement: derivePlacement(link) });
      });
    });

    document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]').forEach(function (link) {
      link.addEventListener("click", function () {
        track("click_whatsapp", { page_path: getPagePath(), placement: derivePlacement(link) });
      });
    });

    document.querySelectorAll('a[href="#booking"], a[href="index.html#booking"], [data-cta="book"]').forEach(function (link) {
      link.addEventListener("click", function () {
        track("click_book", { page_path: getPagePath(), placement: derivePlacement(link) });
      });
    });

    document.querySelectorAll('[data-portal-interest]').forEach(function (button) {
      button.addEventListener("click", function (event) {
        if (button.getAttribute("aria-disabled") === "true") event.preventDefault();
        track("portal_interest", { page_path: getPagePath(), placement: button.getAttribute("data-portal-interest") || derivePlacement(button) });
      });
    });
  }

  function wireBookingStart() {
    var form = document.getElementById("bookingForm");
    if (!form) return;
    var started = false;
    function markStart() {
      if (started) return;
      started = true;
      track("booking_start", { page_path: getPagePath() });
    }
    ["focusin", "input", "change"].forEach(function (eventName) {
      form.addEventListener(eventName, markStart, { passive: true });
    });
  }

  function wireServiceViews() {
    if (!("IntersectionObserver" in window)) return;
    var seen = Object.create(null);
    var targets = [];

    document.querySelectorAll('.service-section[id]').forEach(function (section) {
      targets.push({ node: section, slug: (section.id || "").toLowerCase() });
    });

    document.querySelectorAll('a[href^="services.html#"]').forEach(function (link) {
      var slug = serviceSlugFromHref(link.getAttribute("href"));
      var card = link.closest('.group, .reveal, article, div');
      if (!slug || !card) return;
      targets.push({ node: card, slug: slug });
    });

    if (!targets.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var slug = entry.target.getAttribute("data-analytics-service-slug") || "";
        if (!slug || seen[slug]) return;
        seen[slug] = true;
        track("service_view", { page_path: getPagePath(), service_slug: slug });
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.55 });

    targets.forEach(function (item) {
      if (!item.slug) return;
      item.node.setAttribute("data-analytics-service-slug", item.slug);
      observer.observe(item.node);
    });
  }

  function boot() {
    wireClickEvents();
    wireBookingStart();
    wireServiceViews();
    if (hasConsent()) load();
  }

  window.TorqAnalytics = {
    load: load,
    track: track,
    isConfigured: function () { return !!MEASUREMENT_ID; },
    hasConsent: hasConsent,
    getPagePath: getPagePath
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
