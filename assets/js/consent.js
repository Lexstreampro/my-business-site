/* ============================================================
   TORQ Cymru — analytics consent controller
   ------------------------------------------------------------
   GA remains off unless a real Measurement ID exists AND the
   visitor grants analytics consent.
   ============================================================ */
(function () {
  "use strict";

  var CONFIG = window.TORQ_ANALYTICS_CONFIG || {};
  var rawId = ((CONFIG && CONFIG.measurementId) || window.TORQ_GA_ID || "").trim();
  var GA_ID = /^G-[A-Z0-9]+$/i.test(rawId) ? rawId : "";
  if (!GA_ID) return;

  var KEY = CONFIG.consentKey || "torq_analytics_consent_v1";
  var BANNER_ID = "torq-consent-panel";

  function ensureGtagStub() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  }

  ensureGtagStub();
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500
  });

  function getStoredChoice() {
    try {
      var value = localStorage.getItem(KEY);
      return value === "granted" || value === "denied" ? value : null;
    } catch (e) {
      return null;
    }
  }

  function setStoredChoice(value) {
    try { localStorage.setItem(KEY, value); } catch (e) {}
  }

  function removeGaCookies() {
    var host = location.hostname;
    var segments = host.split('.');
    var domains = [host];
    if (segments.length >= 2) domains.push('.' + segments.slice(-2).join('.'));
    if (segments.length >= 3) domains.push('.' + segments.slice(-3).join('.'));
    var parts = document.cookie ? document.cookie.split(';') : [];
    parts.forEach(function (part) {
      var name = part.split('=')[0].trim();
      if (!/^_ga(_.*)?$/.test(name)) return;
      domains.forEach(function (domain) {
        document.cookie = name + '=; Max-Age=0; path=/; domain=' + domain + '; SameSite=Lax';
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=' + domain + '; SameSite=Lax';
      });
      document.cookie = name + '=; Max-Age=0; path=/; SameSite=Lax';
      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax';
    });
  }

  function closePanel() {
    var panel = document.getElementById(BANNER_ID);
    if (panel) panel.remove();
  }

  function updateSettingsButtons() {
    var choice = getStoredChoice();
    document.querySelectorAll('[data-cookie-settings]').forEach(function (button) {
      var label = 'Cookie settings';
      if (choice === 'granted') label = 'Cookie settings (analytics on)';
      if (choice === 'denied') label = 'Cookie settings (analytics off)';
      button.setAttribute('aria-label', label);
    });
  }

  function applyGranted() {
    setStoredChoice('granted');
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    if (window.TorqAnalytics && window.TorqAnalytics.load) window.TorqAnalytics.load();
    closePanel();
    updateSettingsButtons();
  }

  function applyDenied() {
    setStoredChoice('denied');
    window.gtag('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    removeGaCookies();
    closePanel();
    updateSettingsButtons();
  }

  function renderPanel(isSettingsOpen) {
    closePanel();
    var panel = document.createElement('section');
    panel.id = BANNER_ID;
    panel.setAttribute('role', isSettingsOpen ? 'dialog' : 'region');
    panel.setAttribute('aria-label', 'Website analytics choices');
    panel.style.cssText = [
      'position:fixed',
      'left:12px',
      'right:12px',
      'bottom:88px',
      'z-index:80',
      'max-width:760px',
      'margin:0 auto',
      'background:#141414',
      'border:1px solid rgba(255,255,255,0.12)',
      'border-radius:10px',
      'box-shadow:0 18px 48px rgba(0,0,0,0.55)',
      'padding:18px',
      'color:#F8F8F8',
      'font-family:Inter,system-ui,sans-serif'
    ].join(';');

    var choice = getStoredChoice();
    var statusCopy = '';
    if (choice === 'granted') statusCopy = '<p style="margin:0 0 12px 0;color:#BFC3C7;font-size:13px;">Analytics is currently on. You can withdraw consent below.</p>';
    if (choice === 'denied') statusCopy = '<p style="margin:0 0 12px 0;color:#BFC3C7;font-size:13px;">Analytics is currently off. You can enable it below.</p>';

    panel.innerHTML = '' +
      '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;">' +
        '<div style="flex:1 1 auto;min-width:240px;">' +
          '<p style="margin:0 0 6px 0;color:#C1121F;font-family:\'Space Grotesk\',sans-serif;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Website analytics</p>' +
          '<h2 style="margin:0 0 8px 0;font-family:\'Space Grotesk\',sans-serif;font-size:20px;line-height:1.15;letter-spacing:-0.02em;">Your analytics choice</h2>' +
          statusCopy +
          '<p style="margin:0;color:#BFC3C7;font-size:14px;line-height:1.55;">We use optional Google Analytics cookies to understand how people use the TORQ Cymru website and improve the service. Analytics will only run if you accept. We do not use analytics cookies for advertising.</p>' +
        '</div>' +
        '<button type="button" id="torq-consent-close" aria-label="Close cookie settings" style="appearance:none;border:1px solid rgba(255,255,255,0.14);background:#111111;color:#F8F8F8;border-radius:999px;width:38px;height:38px;font-size:18px;line-height:1;cursor:pointer;">×</button>' +
      '</div>' +
      '<div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:16px;">' +
        '<button type="button" id="torq-consent-accept" style="cursor:pointer;min-width:170px;font-family:\'Space Grotesk\',sans-serif;font-size:14px;font-weight:700;letter-spacing:-0.01em;padding:12px 16px;border-radius:6px;background:#C1121F;color:#fff;border:1px solid #C1121F;">Accept analytics</button>' +
        '<button type="button" id="torq-consent-reject" style="cursor:pointer;min-width:170px;font-family:\'Space Grotesk\',sans-serif;font-size:14px;font-weight:700;letter-spacing:-0.01em;padding:12px 16px;border-radius:6px;background:#1C1C1C;color:#F8F8F8;border:1px solid rgba(255,255,255,0.22);">Reject analytics</button>' +
        '<a href="/privacy.html" style="display:inline-flex;align-items:center;justify-content:center;min-width:150px;padding:12px 16px;border-radius:6px;border:1px solid rgba(255,255,255,0.16);color:#F8F8F8;text-decoration:none;font-size:14px;">Privacy details</a>' +
      '</div>';

    document.body.appendChild(panel);

    document.getElementById('torq-consent-accept').addEventListener('click', applyGranted);
    document.getElementById('torq-consent-reject').addEventListener('click', applyDenied);
    document.getElementById('torq-consent-close').addEventListener('click', closePanel);
  }

  function attachSettingsButtons() {
    document.querySelectorAll('[data-cookie-settings]').forEach(function (button) {
      if (button.dataset.cookieSettingsBound === '1') return;
      button.dataset.cookieSettingsBound = '1';
      button.addEventListener('click', function (event) {
        event.preventDefault();
        renderPanel(true);
      });
    });
    updateSettingsButtons();
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closePanel();
  });

  function boot() {
    attachSettingsButtons();
    var stored = getStoredChoice();
    if (stored === 'granted') {
      applyGranted();
      return;
    }
    if (stored === 'denied') {
      applyDenied();
      return;
    }
    renderPanel(false);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
