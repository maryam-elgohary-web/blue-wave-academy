/**
 * ==========================================================================
 * BLUE WAVE ACADEMY - MAIN APPLICATION CONTROLLER (Design Integrated)
 * ==========================================================================
 */

(function() {
  'use strict';

  var App = {
    /**
     * Initializes components, applies initial settings, and registers event bindings.
     */
    init: function() {
      // 1. Initialize Theme & Language
      if (window.ThemeManager) {
        window.ThemeManager.init();
      }
      if (window.LanguageManager) {
        window.LanguageManager.init();
      }

      // 2. Set Up UI Event Listeners
      this.bindThemeToggler();
      this.bindLanguageSelectors();
      this.bindDynamicFieldToggles();
      this.bindMobileDrawer();
      this.bindHeaderScrollEffect();

      // 3. Form Validation, Submission, and Draft Caching
      var form = document.getElementById('registration-form');
      if (form && window.FormValidation) {
        window.FormValidation.setupRealtimeValidation(form);
      }
      this.bindFormSubmission();
      this.setupFormDraftPersistence();
    },

    /**
     * Binds click events to the theme toggle button.
     */
    bindThemeToggler: function() {
      var toggleBtn = document.getElementById('theme-toggle');
      if (!toggleBtn) return;

      toggleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (window.ThemeManager) {
          window.ThemeManager.toggle();
        }
      });
    },

    /**
     * Binds click events to English and Arabic language switcher buttons.
     */
    bindLanguageSelectors: function() {
      var btnEn = document.getElementById('lang-btn-en');
      var btnAr = document.getElementById('lang-btn-ar');

      if (btnEn) {
        btnEn.addEventListener('click', function(e) {
          e.preventDefault();
          if (window.LanguageManager) {
            window.LanguageManager.setLanguage('en');
          }
        });
      }

      if (btnAr) {
        btnAr.addEventListener('click', function(e) {
          e.preventDefault();
          if (window.LanguageManager) {
            window.LanguageManager.setLanguage('ar');
          }
        });
      }
    },

    /**
     * Watches "Joined before" toggle checkbox to dynamically display previous academy name field.
     */
    bindDynamicFieldToggles: function() {
      var toggle = document.getElementById('joined-toggle');
      var container = document.getElementById('previous-academy-field');
      var prevInput = document.getElementById('previousAcademyName');

      if (!toggle || !container) return;

      var toggleField = function() {
        if (toggle.checked) {
          toggle.value = 'Yes';
          container.classList.remove('hidden');
          container.classList.add('block');
        } else {
          toggle.value = 'No';
          container.classList.add('hidden');
          container.classList.remove('block');
          if (prevInput) {
            prevInput.value = ''; // Reset on hide
            prevInput.removeAttribute('aria-invalid');
            var errBox = document.getElementById('error-previousAcademyName');
            if (errBox) errBox.textContent = '';
          }
        }
      };

      // Listen to choices
      toggle.addEventListener('change', toggleField);
      
      // Initialize on load
      toggleField();
    },

    /**
     * Binds click events to mobile menu button and drawer overlay.
     */
    bindMobileDrawer: function() {
      var menuBtn = document.getElementById('mobile-menu-btn');
      var drawer = document.getElementById('mobile-drawer');
      var overlay = document.getElementById('drawer-overlay');

      if (!menuBtn || !drawer || !overlay) return;

      var toggleMenu = function() {
        var isClosed = drawer.classList.contains('translate-x-full');
        if (!isClosed) {
          drawer.classList.add('translate-x-full');
          overlay.classList.add('opacity-0');
          setTimeout(function() {
            overlay.classList.add('hidden');
          }, 300);
        } else {
          overlay.classList.remove('hidden');
          // Force reflow
          void overlay.offsetWidth;
          overlay.classList.remove('opacity-0');
          drawer.classList.remove('translate-x-full');
        }
      };

      menuBtn.addEventListener('click', toggleMenu);
      overlay.addEventListener('click', toggleMenu);

      // Close drawer on link click
      var drawerLinks = drawer.querySelectorAll('a');
      drawerLinks.forEach(function(link) {
        link.addEventListener('click', function() {
          drawer.classList.add('translate-x-full');
          overlay.classList.add('opacity-0');
          setTimeout(function() {
            overlay.classList.add('hidden');
          }, 300);
        });
      });
    },

    /**
     * Appends shadows to the header elements as user scrolls down the page.
     */
    bindHeaderScrollEffect: function() {
      var header = document.getElementById('main-header');
      if (!header) return;

      window.addEventListener('scroll', function() {
        if (window.scrollY > 20) {
          header.classList.add('shadow-md', 'py-1');
          header.classList.remove('shadow-sm', 'py-0');
        } else {
          header.classList.remove('shadow-md', 'py-1');
          header.classList.add('shadow-sm', 'py-0');
        }
      });
    },

    /**
     * Handles form submission: validation and Apps Script routing
     */
    bindFormSubmission: function() {
      var self = this;
      var form = document.getElementById('registration-form');
      if (!form) return;

      var warningBox = document.getElementById('dev-warning-box');
      var statusModal = document.getElementById('status-modal');
      var modalLoader = document.getElementById('modal-loader');
      var modalSuccess = document.getElementById('modal-success');
      var modalError = document.getElementById('modal-error');
      var modalErrorText = document.getElementById('modal-error-text');

      // 1. Show developer warning banner if not configured
      if (warningBox && window.GoogleSheetsIntegration) {
        if (!window.GoogleSheetsIntegration.isConfigured()) {
          warningBox.classList.remove('hidden');
        } else {
          warningBox.classList.add('hidden');
        }
      }

      // 2. Setup Close Buttons click handler inside modal overlay cards
      if (statusModal) {
        var closeBtns = statusModal.querySelectorAll('.modal-close-btn');
        closeBtns.forEach(function(btn) {
          btn.addEventListener('click', function(e) {
            e.preventDefault();
            statusModal.classList.add('hidden');
            statusModal.classList.remove('visible');
          });
        });
      }

      // 3. Form submit handler
      form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Perform validation check
        if (window.FormValidation && !window.FormValidation.validateForm(form)) {
          // Scroll first validation error field into view smoothly
          var firstError = form.querySelector('[aria-invalid="true"]');
          if (firstError) {
            var field = firstError.closest('.form-field, .form-radio-group');
            if (field) {
              field.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }
          return;
        }

        // Collect Form Data
        var formData = {
          fullName: document.getElementById('fullName').value.trim(),
          age: document.getElementById('age').value.trim(),
          mobileNumber: document.getElementById('mobileNumber').value.trim(),
          whatsAppNumber: document.getElementById('whatsAppNumber') ? document.getElementById('whatsAppNumber').value.trim() : '',
          swimmingLevel: form.querySelector('input[name="swimmingLevel"]:checked') ? form.querySelector('input[name="swimmingLevel"]:checked').value : '',
          trainingGoal: form.querySelector('input[name="trainingGoal"]:checked') ? form.querySelector('input[name="trainingGoal"]:checked').value : '',
          previousAcademy: document.getElementById('joined-toggle').checked ? 'Yes' : 'No',
          previousAcademyName: document.getElementById('previousAcademyName') ? document.getElementById('previousAcademyName').value.trim() : '',
          healthIssues: document.getElementById('healthIssues') ? document.getElementById('healthIssues').value.trim() : '',
          referralSource: document.getElementById('referralSource') ? document.getElementById('referralSource').value : '',
          notes: document.getElementById('notes') ? document.getElementById('notes').value.trim() : ''
        };

        // Show status-modal overlay
        if (statusModal) {
          statusModal.classList.remove('hidden');
          statusModal.classList.add('visible');
          if (modalLoader) modalLoader.classList.remove('hidden');
          if (modalSuccess) modalSuccess.classList.add('hidden');
          if (modalError) modalError.classList.add('hidden');
        }

        // Send data
        if (window.GoogleSheetsIntegration && window.GoogleSheetsIntegration.isConfigured()) {
          window.GoogleSheetsIntegration.submitData(formData, function(success, response) {
            if (modalLoader) modalLoader.classList.add('hidden');
            
            if (success) {
              // Success modal display
              if (modalSuccess) modalSuccess.classList.remove('hidden');
              form.reset();
              // Remove active states on radio option cards
              form.querySelectorAll('.option-card').forEach(function(card) {
                card.classList.remove('active');
              });
              // Hide previous academy block
              var prevField = document.getElementById('previous-academy-field');
              if (prevField) {
                prevField.classList.add('hidden');
                prevField.classList.remove('block');
              }
              // Clear cached drafts
              if (self.clearFormDraft) {
                self.clearFormDraft();
              }
            } else {
              // API submit failed: show error state inside status modal
              if (modalLoader) modalLoader.classList.add('hidden');
              if (modalError) {
                if (modalErrorText) {
                  modalErrorText.textContent = response.message || response || 'Submission failed.';
                }
                modalError.classList.remove('hidden');
              }
            }
          });
        } else {
          // STRICT REQUIREMENT: No mock submission. Display configuration error immediately.
          setTimeout(function() {
            if (modalLoader) modalLoader.classList.add('hidden');
            if (modalError) {
              if (modalErrorText) {
                var errStr = window.LanguageManager ? window.LanguageManager.get('msg_dev_warning_body') : 'Configuration Required: SCRIPT_URL is empty.';
                modalErrorText.textContent = errStr;
              }
              modalError.classList.remove('hidden');
            }
          }, 600);
        }
      });
    },

    /**
     * LocalStorage auto-saving for form drafts
     */
    setupFormDraftPersistence: function() {
      var form = document.getElementById('registration-form');
      if (!form) return;

      var DRAFT_KEY = 'blue_wave_registration_draft';

      // Save form state to localStorage
      var saveDraft = function() {
        var data = {};
        
        // Text / select / textarea inputs
        var inputs = form.querySelectorAll('input:not([type="radio"]):not([type="checkbox"]), select, textarea');
        inputs.forEach(function(input) {
          if (input.name) {
            data[input.name] = input.value;
          }
        });

        // Radios
        var radios = form.querySelectorAll('input[type="radio"]:checked');
        radios.forEach(function(radio) {
          data[radio.name] = radio.value;
        });

        // Joined Before toggle
        var joinedToggle = document.getElementById('joined-toggle');
        if (joinedToggle) {
          data['previousAcademy'] = joinedToggle.checked ? 'Yes' : 'No';
        }

        localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
      };

      // Load form state from localStorage
      var loadDraft = function() {
        var draftStr = localStorage.getItem(DRAFT_KEY);
        if (!draftStr) return;

        try {
          var data = JSON.parse(draftStr);
          if (!data) return;

          // Restore standard inputs
          var inputs = form.querySelectorAll('input:not([type="radio"]):not([type="checkbox"]), select, textarea');
          inputs.forEach(function(input) {
            if (input.name && data[input.name] !== undefined) {
              input.value = data[input.name];
            }
          });

          // Restore Joined Before checkbox toggle
          var joinedToggle = document.getElementById('joined-toggle');
          if (joinedToggle && data['previousAcademy'] !== undefined) {
            joinedToggle.checked = (data['previousAcademy'] === 'Yes');
            // Trigger change event to toggle previous academy visibility
            joinedToggle.dispatchEvent(new Event('change'));
          }

          // Restore checked states on radio choice cards
          var radios = form.querySelectorAll('input[type="radio"]');
          radios.forEach(function(radio) {
            if (data[radio.name] === radio.value) {
              radio.checked = true;
              
              // Set visual active state style
              var card = radio.closest('.option-card');
              if (card) {
                card.classList.add('active');
              }
            }
          });

        } catch (e) {
          console.error('Error loading form draft:', e);
        }
      };

      // Listen for field updates to cache progress
      form.addEventListener('input', saveDraft);
      form.addEventListener('change', saveDraft);

      // Populate saved progress immediately
      loadDraft();

      // Clear function
      this.clearFormDraft = function() {
        localStorage.removeItem(DRAFT_KEY);
      };
    }
  };

  // Bind to DOM ready event
  document.addEventListener('DOMContentLoaded', function() {
    App.init();
  });

  // Assign to global namespace
  window.App = App;

})();
