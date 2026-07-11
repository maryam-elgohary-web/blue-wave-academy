/**
 * ==========================================================================
 * BLUE WAVE ACADEMY - LANGUAGE MANAGER (Phase 2/3 Integration)
 * ==========================================================================
 */

(function() {
  'use strict';

  var STORAGE_KEY = 'blue_wave_academy_lang';
  var currentLang = 'ar';

  var LanguageManager = {
    /**
     * Initializes language settings. Checks localStorage, defaulting to Arabic.
     */
    init: function() {
      var savedLang = localStorage.getItem(STORAGE_KEY);
      if (savedLang === 'en' || savedLang === 'ar') {
        currentLang = savedLang;
      } else {
        currentLang = 'ar';
      }
      
      this.setLanguage(currentLang);
    },

    /**
     * Sets the application language, updates HTML attributes, and triggers translation.
     * @param {string} lang - 'en' or 'ar'
     */
    setLanguage: function(lang) {
      if (lang !== 'en' && lang !== 'ar') return;
      currentLang = lang;
      
      // Save user setting
      localStorage.setItem(STORAGE_KEY, currentLang);
      
      // Update HTML tags for language and layout direction (RTL/LTR)
      var html = document.documentElement;
      html.setAttribute('lang', currentLang);
      
      if (currentLang === 'ar') {
        html.setAttribute('dir', 'rtl');
      } else {
        html.setAttribute('dir', 'ltr');
      }
      
      // Translate the page
      this.translateDOM();
      
      // Update active styling class on toggle buttons
      this.updateTogglerUI();
    },

    /**
     * Retrieves current active language code.
     * @returns {string}
     */
    getCurrent: function() {
      return currentLang;
    },

    /**
     * Scans the document for translation attributes and populates text contents.
     */
    translateDOM: function() {
      var dict = window.AppTranslations[currentLang];
      if (!dict) {
        console.error('Translation dictionary not loaded for language: ' + currentLang);
        return;
      }

      // 1. Plain text translations (data-i18n)
      var elements = document.querySelectorAll('[data-i18n]');
      elements.forEach(function(el) {
        var key = el.getAttribute('data-i18n');
        if (dict[key] !== undefined) {
          el.textContent = dict[key];
        }
      });

      // 2. Input/Textarea placeholders (data-i18n-placeholder)
      var placeholders = document.querySelectorAll('[data-i18n-placeholder]');
      placeholders.forEach(function(el) {
        var key = el.getAttribute('data-i18n-placeholder');
        if (dict[key] !== undefined) {
          el.setAttribute('placeholder', dict[key]);
        }
      });

      // 3. Accessible aria-labels (data-i18n-aria-label)
      var ariaLabels = document.querySelectorAll('[data-i18n-aria-label]');
      ariaLabels.forEach(function(el) {
        var key = el.getAttribute('data-i18n-aria-label');
        if (dict[key] !== undefined) {
          el.setAttribute('aria-label', dict[key]);
        }
      });

      // 4. Meta descriptions (data-i18n-meta)
      var metaDesc = document.querySelector('meta[data-i18n-meta]');
      if (metaDesc) {
        var key = metaDesc.getAttribute('data-i18n-meta');
        if (dict[key] !== undefined) {
          metaDesc.setAttribute('content', dict[key]);
        }
      }
    },

    /**
     * Fetches specific translation key string.
     * @param {string} key
     * @returns {string}
     */
    get: function(key) {
      var dict = window.AppTranslations[currentLang];
      return (dict && dict[key] !== undefined) ? dict[key] : key;
    },

    /**
     * Syncs active toggle styling classes on EN / AR elements.
     */
    updateTogglerUI: function() {
      var btnEn = document.getElementById('lang-btn-en');
      var btnAr = document.getElementById('lang-btn-ar');
      
      if (!btnEn || !btnAr) return;

      if (currentLang === 'ar') {
        btnAr.classList.add('active');
        btnEn.classList.remove('active');
      } else {
        btnEn.classList.add('active');
        btnAr.classList.remove('active');
      }
    }
  };

  // Register in global namespace
  window.LanguageManager = LanguageManager;

})();
