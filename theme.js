(function (root) {
  'use strict';

  const STORAGE_KEY = 'preferredTheme';
  const darkQuery = typeof root.matchMedia === 'function' ? root.matchMedia('(prefers-color-scheme: dark)') : null;
  let toggleButton = null;
  let labels = { toDark: 'Dark theme', toLight: 'Light theme' };
  let chosenTheme = null;

  function readStoredTheme() {
    try {
      const value = root.localStorage.getItem(STORAGE_KEY);
      return value === 'dark' || value === 'light' ? value : null;
    } catch (e) {
      return null;
    }
  }

  chosenTheme = readStoredTheme();

  function currentTheme() {
    return chosenTheme || (darkQuery && darkQuery.matches ? 'dark' : 'light');
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    updateToggle();
  }

  const ICON_MOON = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  const ICON_SUN = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';

  function updateToggle() {
    if (!toggleButton) return;
    const isDark = currentTheme() === 'dark';
    // El icono muestra el tema al que se cambia al pulsar.
    toggleButton.innerHTML = isDark ? ICON_SUN : ICON_MOON;
    const label = isDark ? labels.toLight : labels.toDark;
    toggleButton.setAttribute('aria-label', label);
    toggleButton.setAttribute('title', label);
  }

  function toggleTheme() {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    chosenTheme = next;
    try {
      root.localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      // Sin almacenamiento el cambio dura hasta cerrar la página.
    }
    applyTheme(next);
  }

  function mountToggle(button) {
    toggleButton = button;
    if (!toggleButton) return;
    toggleButton.addEventListener('click', toggleTheme);
    updateToggle();
  }

  function setLabels(newLabels) {
    if (newLabels) {
      labels = newLabels;
      updateToggle();
    }
  }

  if (darkQuery) {
    const onSystemChange = () => {
      if (!chosenTheme) {
        applyTheme(currentTheme());
      }
    };
    if (typeof darkQuery.addEventListener === 'function') {
      darkQuery.addEventListener('change', onSystemChange);
    } else if (typeof darkQuery.addListener === 'function') {
      darkQuery.addListener(onSystemChange);
    }
  }

  applyTheme(currentTheme());

  root.GecoTheme = { mountToggle, setLabels };
}(window));
