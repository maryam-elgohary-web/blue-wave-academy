/**
 * ==========================================================================
 * BLUE WAVE ACADEMY - GOOGLE SHEETS INTEGRATION SKELETON (Phase 1)
 * ==========================================================================
 */

(function() {
  'use strict';

  // DEVELOPER CONFIGURATION: Place the Google Apps Script Web App URL here
  var SCRIPT_URL = '';

  var GoogleSheetsIntegration = {
    /**
     * Sends form data object to Google Sheets Web App.
     * @param {Object} formData
     * @param {Function} callback - function(success, responseDataOrError)
     */
    submitData: function(formData, callback) {
      var url = this.getUrl();
      if (!url) {
        callback(false, 'Not configured');
        return;
      }

      fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(formData)
      })
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(function(data) {
        if (data && data.status === 'success') {
          callback(true, data);
        } else {
          callback(false, data || 'Server error');
        }
      })
      .catch(function(error) {
        console.error('Google Sheets Submission Error:', error);
        callback(false, error);
      });
    },

    /**
     * Checks if the Google Apps Script Web App URL is configured.
     * @returns {boolean}
     */
    isConfigured: function() {
      return !!SCRIPT_URL && SCRIPT_URL.trim() !== '';
    },

    /**
     * Returns the target URL.
     * @returns {string}
     */
    getUrl: function() {
      return SCRIPT_URL;
    }
  };

  // Assign to global namespace
  window.GoogleSheetsIntegration = GoogleSheetsIntegration;

})();
