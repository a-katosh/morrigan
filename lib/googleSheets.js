// lib/googleSheets.js
import { google } from 'googleapis';

// Configure Google Sheets API with service account
const auth = new google.auth.GoogleAuth({
  keyFile: '../the-byway-412623-26d8ec3de5dd.json', // replace with the path to your service account JSON
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

export async function getUserDataFromSheet(userId) {
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1KdOrSjyY_o_nclj61OfCBhAcWKSkKcYY8OtCYbBzm_c'; // replace with your Google Sheets ID
  const range = 'Sheet1!C:C'; // assuming data is in column C of the first sheet

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) return null;

    // Search for userId in the retrieved rows
    for (let i = 0; i < rows.length; i++) {
      if (rows[i][0] === userId) {
        return { userId }; // User exists in sheet
      }
    }

    return null; // User not found
  } catch (error) {
    console.error('Error accessing Google Sheets:', error);
    throw new Error('Failed to retrieve data from Google Sheets');
  }
}
