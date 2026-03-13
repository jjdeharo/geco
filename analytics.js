(function () {
  const ANALYTICS_FALLBACK_ENDPOINT = 'https://bilateria.org/app/estadistica/geco/track.php';
  const ANALYTICS_FALLBACK_STATS_URL = 'https://bilateria.org/app/estadistica/geco/admin-stats.php';
  const ANALYTICS_FALLBACK_SITE_ID = 'geco';
  const ANALYTICS_COOLDOWN_MS = 30 * 60 * 1000;
  const ANALYTICS_TIMEOUT_MS = 4000;

  function getMetaContent(name) {
    const node = document.querySelector(`meta[name="${name}"]`);
    return node ? String(node.getAttribute('content') || '').trim() : '';
  }

  function getAnalyticsConfig() {
    return {
      endpoint: getMetaContent('analytics-endpoint') || ANALYTICS_FALLBACK_ENDPOINT,
      statsUrl: getMetaContent('analytics-stats-url') || ANALYTICS_FALLBACK_STATS_URL,
      siteId: getMetaContent('analytics-site-id') || ANALYTICS_FALLBACK_SITE_ID
    };
  }

  function getStorageKey(siteId) {
    return `analytics:last-visit:${siteId}`;
  }

  function shouldTrackAnalytics() {
    const protocol = String(window.location.protocol || '');
    const hostname = String(window.location.hostname || '').toLowerCase();
    if (protocol !== 'http:' && protocol !== 'https:') {
      return false;
    }
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1') {
      return false;
    }
    return !hostname.endsWith('.local');
  }

  function shouldCountVisit(siteId) {
    try {
      const rawValue = window.localStorage.getItem(getStorageKey(siteId));
      const lastVisit = Number.parseInt(rawValue || '', 10);
      if (!Number.isFinite(lastVisit)) {
        return true;
      }
      return (Date.now() - lastVisit) > ANALYTICS_COOLDOWN_MS;
    } catch (error) {
      return true;
    }
  }

  function rememberVisit(siteId) {
    try {
      window.localStorage.setItem(getStorageKey(siteId), String(Date.now()));
    } catch (error) {
      // Ignore storage failures: analytics must never block the app.
    }
  }

  function updateAnalyticsSummary(payload, config) {
    const summary = document.querySelector('[data-analytics-summary]');
    const totalNode = document.querySelector('[data-analytics-total]');
    const todayNode = document.querySelector('[data-analytics-today]');
    const linkNode = document.querySelector('[data-analytics-link]');
    const total = Number.parseInt(String(payload && payload.total !== undefined ? payload.total : ''), 10);
    const today = Number.parseInt(String(payload && payload.today !== undefined ? payload.today : ''), 10);

    if (!summary || !totalNode || !todayNode) {
      return;
    }
    if (!Number.isFinite(total) || !Number.isFinite(today)) {
      return;
    }

    totalNode.textContent = String(total);
    todayNode.textContent = String(today);
    if (linkNode && config.statsUrl) {
      linkNode.href = config.statsUrl;
    }
    summary.hidden = false;
  }

  function requestAnalytics() {
    if (!shouldTrackAnalytics()) {
      return;
    }

    const config = getAnalyticsConfig();
    if (!config.endpoint) {
      return;
    }

    const callbackName = `__gecoAnalytics_${Date.now().toString(36)}_${Math.random().toString(36).slice(2)}`;
    const pageParams = new URLSearchParams(window.location.search || '');
    const query = new URLSearchParams();
    const script = document.createElement('script');
    const countVisit = shouldCountVisit(config.siteId);
    let settled = false;
    let timeoutId = 0;

    function cleanup() {
      if (settled) {
        return;
      }
      settled = true;
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      try {
        delete window[callbackName];
      } catch (error) {
        window[callbackName] = undefined;
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    }

    query.set('site', config.siteId);
    query.set('callback', callbackName);
    query.set('page_url', window.location.href);
    query.set('referrer', document.referrer || '');
    if (!countVisit) {
      query.set('summary_only', '1');
    }

    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(key => {
      const value = String(pageParams.get(key) || '').trim();
      if (value) {
        query.set(key, value);
      }
    });

    window[callbackName] = function (payload) {
      try {
        updateAnalyticsSummary(payload || {}, config);
        if (countVisit && payload && payload.ok) {
          rememberVisit(config.siteId);
        }
      } finally {
        cleanup();
      }
    };

    script.async = true;
    script.src = `${config.endpoint}${config.endpoint.includes('?') ? '&' : '?'}${query.toString()}`;
    script.onerror = cleanup;
    timeoutId = window.setTimeout(cleanup, ANALYTICS_TIMEOUT_MS);
    document.head.appendChild(script);
  }

  function initAnalytics() {
    const run = function () {
      window.setTimeout(requestAnalytics, 0);
    };

    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(run, { timeout: 2500 });
      return;
    }
    if (document.readyState === 'complete') {
      run();
      return;
    }
    window.addEventListener('load', run, { once: true });
  }

  initAnalytics();
})();
