/**
 * ==========================================================================
 * BLUE WAVE ACADEMY - FORM VALIDATION SKELETON (Phase 1)
 * ==========================================================================
 */

(function() {
  'use strict';

  var FormValidation = {
    // Regex for phone numbers: allow optional leading +, digits, spaces, hyphens
    phoneRegex: /^\+?[0-9\s\-]{7,20}$/,

    /**
     * Shows error message below a form field and flags it as invalid.
     * @param {string} fieldId
     * @param {string} errorKey
     */
    showError: function(fieldId, errorKey) {
      var errEl = document.getElementById('error-' + fieldId);
      if (errEl) {
        var msg = window.LanguageManager ? window.LanguageManager.get(errorKey) : errorKey;
        errEl.textContent = msg;
        errEl.classList.remove('hidden');
      }
      var inputEl = document.getElementById(fieldId);
      if (inputEl) {
        inputEl.setAttribute('aria-invalid', 'true');
      }
    },

    /**
     * Clears error message and invalid flag from a form field.
     * @param {string} fieldId
     */
    clearError: function(fieldId) {
      var errEl = document.getElementById('error-' + fieldId);
      if (errEl) {
        errEl.textContent = '';
        errEl.classList.add('hidden');
      }
      var inputEl = document.getElementById(fieldId);
      if (inputEl) {
        inputEl.removeAttribute('aria-invalid');
      }
    },

    /**
     * Validates a single input element and updates its error display.
     * @param {HTMLElement} inputElement
     * @returns {boolean} - true if valid, false otherwise
     */
    validateField: function(inputElement) {
      if (!inputElement) return true;
      var name = inputElement.getAttribute('name');
      var id = inputElement.getAttribute('id') || name;
      var val = inputElement.value ? inputElement.value.trim() : '';

      // Skip validation for hidden or non-interactive fields
      if (inputElement.type === 'hidden') return true;

      // 1. Full Name
      if (name === 'fullName') {
        if (!val) {
          this.showError('fullName', 'error_name_empty');
          return false;
        }
        if (val.length < 3) {
          this.showError('fullName', 'error_name_invalid');
          return false;
        }
        this.clearError('fullName');
        return true;
      }

      // 2. Age
      if (name === 'age') {
        if (!val) {
          this.showError('age', 'error_age_empty');
          return false;
        }
        var ageNum = parseInt(val, 10);
        if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
          this.showError('age', 'error_age_invalid');
          return false;
        }
        this.clearError('age');
        return true;
      }

      // 3. Mobile Number
      if (name === 'mobileNumber') {
        if (!val) {
          this.showError('mobileNumber', 'error_phone_empty');
          return false;
        }
        if (!this.phoneRegex.test(val)) {
          this.showError('mobileNumber', 'error_phone_invalid');
          return false;
        }
        this.clearError('mobileNumber');
        return true;
      }

      // 4. WhatsApp Number (Optional)
      if (name === 'whatsAppNumber') {
        if (val && !this.phoneRegex.test(val)) {
          this.showError('whatsAppNumber', 'error_phone_invalid');
          return false;
        }
        this.clearError('whatsAppNumber');
        return true;
      }

      // 5. Previous Academy Name (Conditional validation)
      if (name === 'previousAcademyName') {
        this.clearError('previousAcademyName');
        return true;
      }

      // 6. Referral Source
      if (name === 'referralSource') {
        if (!val) {
          this.showError('referralSource', 'error_referral_required');
          return false;
        }
        this.clearError('referralSource');
        return true;
      }

      return true;
    },

    /**
     * Validates group-based fields (like radio option cards).
     * @param {string} groupName
     * @returns {boolean} - true if checked, false otherwise
     */
    validateGroup: function(groupName) {
      var radios = document.querySelectorAll('input[name="' + groupName + '"]');
      if (radios.length === 0) return true;

      var checked = false;
      radios.forEach(function(radio) {
        if (radio.checked) checked = true;
      });

      if (!checked) {
        if (groupName === 'swimmingLevel') {
          this.showError('swimmingLevel', 'error_level_required');
        } else if (groupName === 'trainingGoal') {
          this.showError('trainingGoal', 'error_goal_required');
        }
        // Apply visual invalid border to the option-cards in the group
        var cards = document.querySelectorAll('input[name="' + groupName + '"] + *');
        if (cards.length === 0) {
          cards = document.querySelectorAll('input[name="' + groupName + '"]').forEach(function(input) {
            var label = input.closest('.option-card');
            if (label) label.setAttribute('aria-invalid', 'true');
          });
        } else {
          radios.forEach(function(radio) {
            var label = radio.closest('.option-card');
            if (label) label.setAttribute('aria-invalid', 'true');
          });
        }
        return false;
      }

      // Success: clear errors and invalid border on group
      this.clearError(groupName);
      radios.forEach(function(radio) {
        var label = radio.closest('.option-card');
        if (label) label.removeAttribute('aria-invalid');
      });
      return true;
    },

    /**
     * Validates all inputs inside a form.
     * @param {HTMLFormElement} formElement
     * @returns {boolean} - true if entire form is valid, false otherwise
     */
    validateForm: function(formElement) {
      var self = this;
      var isValid = true;

      // Validate text, select, number, and textarea fields
      var fields = formElement.querySelectorAll('input:not([type="radio"]):not([type="checkbox"]), select, textarea');
      fields.forEach(function(field) {
        if (!self.validateField(field)) {
          isValid = false;
        }
      });

      // Validate radio option groups
      if (!this.validateGroup('swimmingLevel')) isValid = false;
      if (!this.validateGroup('trainingGoal')) isValid = false;

      return isValid;
    },

    /**
     * Binds input/blur event listeners for real-time validation feedback.
     * @param {HTMLFormElement} formElement
     */
    setupRealtimeValidation: function(formElement) {
      var self = this;

      // Listeners for standard fields
      var fields = formElement.querySelectorAll('input:not([type="radio"]):not([type="checkbox"]), select, textarea');
      fields.forEach(function(field) {
        field.addEventListener('blur', function() {
          self.validateField(field);
        });
        field.addEventListener('input', function() {
          self.validateField(field);
        });
      });

      // Listeners for radio options
      var radios = formElement.querySelectorAll('input[type="radio"]');
      radios.forEach(function(radio) {
        radio.addEventListener('change', function() {
          self.validateGroup(radio.name);
        });
      });
    }
  };

  // Assign to global namespace
  window.FormValidation = FormValidation;

})();
