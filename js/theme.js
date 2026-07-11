/**
 * ==========================================================================
 * BLUE WAVE ACADEMY - THEME MANAGER (Phase 2/3 Integration)
 * ==========================================================================
 */

(function() {
  'use strict';

  var STORAGE_KEY = 'blue_wave_academy_theme';
  var currentTheme = 'light';

  var ThemeManager = {
    /**
     * Initializes the theme. Checks localStorage, then fallback to device settings.
     */
    init: function() {
      var savedTheme = localStorage.getItem(STORAGE_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        currentTheme = savedTheme;
      } else {
        // Fallback to system preference (OS Light/Dark settings)
        var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        currentTheme = prefersDark ? 'dark' : 'light';
      }
      
      this.applyTheme();
    },

    /**
     * Toggles theme between Light and Dark mode.
     */
    toggle: function() {
      currentTheme = (currentTheme === 'light') ? 'dark' : 'light';
      localStorage.setItem(STORAGE_KEY, currentTheme);
      this.applyTheme();
    },

    /**
     * Returns the active theme name ('light' or 'dark').
     * @returns {string}
     */
    getCurrent: function() {
      return currentTheme;
    },

    /**
     * Adds/Removes the dark-theme class on the documentElement and updates the toggle button state.
     */
    applyTheme: function() {
      var html = document.documentElement;
      var btn = document.getElementById('theme-toggle');
      var icon = btn ? btn.querySelector('.material-symbols-outlined') : null;
      
      if (currentTheme === 'dark') {
        html.classList.add('dark-theme');
        html.classList.add('dark');
        if (btn) {
          btn.setAttribute('aria-checked', 'true');
        }
        if (icon) {
          icon.textContent = 'light_mode';
        }
      } else {
        html.classList.remove('dark-theme');
        html.classList.remove('dark');
        if (btn) {
          btn.setAttribute('aria-checked', 'false');
        }
        if (icon) {
          icon.textContent = 'dark_mode';
        }
      }
    }
  };

  // Assign to global namespace
  window.ThemeManager = ThemeManager;

})();
