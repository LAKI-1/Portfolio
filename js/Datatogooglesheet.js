// This code goes in Google Apps Script
// 1. Create a new Google Sheet
// 2. Go to Extensions > Apps Script
// 3. Paste this code and deploy as a web app

function doPost(e) {
    try {
        // Parse the JSON data from the request
        const data = JSON.parse(e.postData.contents);

        // Get the active spreadsheet and sheet
        const ss = SpreadsheetApp.getActiveSpreadsheet();
        const sheet = ss.getSheetByName('Form Submissions') || ss.insertSheet('Form Submissions');

        // If the sheet is new, add headers
        if (sheet.getLastRow() === 0) {
            sheet.appendRow(['Timestamp', 'Name', 'Email', 'Subject', 'Message']);
            sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
        }

        // Add the form submission data
        sheet.appendRow([
            new Date().toISOString(),
            data.name,
            data.email,
            data.subject,
            data.message
        ]);

        // Return success response
        return ContentService.createTextOutput(JSON.stringify({
            success: true,
            message: 'Submission saved to Google Sheets'
        })).setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        // Return error response
        return ContentService.createTextOutput(JSON.stringify({
            success: false,
            message: error.toString()
        })).setMimeType(ContentService.MimeType.JSON);
    }
}

// Add this to allow cross-origin requests
function doGet(e) {
    return HtmlService.createHtmlOutput('The Google Apps Script is working!');
}