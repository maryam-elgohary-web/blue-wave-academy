/**
 * ==========================================================================
 * BLUE WAVE ACADEMY - GOOGLE APPS SCRIPT SKELETON (Phase 1)
 * ==========================================================================
 */

/**
 * Handles POST requests from the registration website.
 * @param {Object} e - Event parameter containing postData contents
 * @returns {TextOutput} JSON response with CORS headers
 */
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse incoming post data contents
    var data = JSON.parse(e.postData.contents);
    
    // Auto-create headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Full Name",
        "Age",
        "Mobile Number",
        "WhatsApp Number",
        "Swimming Level",
        "Training Goal",
        "Previous Academy",
        "Previous Academy Name",
        "Health Issues",
        "Referral Source",
        "Notes"
      ]);
    }
    
    // Append row
    sheet.appendRow([
      new Date(),
      data.fullName || "",
      data.age || "",
      data.mobileNumber || "",
      data.whatsAppNumber || "",
      data.swimmingLevel || "",
      data.trainingGoal || "",
      data.previousAcademy || "",
      data.previousAcademyName || "",
      data.healthIssues || "",
      data.referralSource || "",
      data.notes || ""
    ]);
    
    // Return standard success response
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error message on failures
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
