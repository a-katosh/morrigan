// lib/googleSheets.js
import { google } from 'googleapis';

export async function getUserDataFromSheet(userId) {
  console.log("Initializing Google Sheets API...");

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const range = 'Sheet1!C:C'; // Change this range as needed

  console.log("Spreadsheet ID:", spreadsheetId);
  console.log("Range:", range);
  console.log("User ID being searched:", userId);

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    console.log("Rows retrieved from Google Sheets:", rows);

    if (rows && rows.length) {
      for (const row of rows) {
        if (row[0] === userId) {
          console.log(`Match found for User ID ${userId}:`, row);
          return { userId: row[0] }; // Modify to include additional data as needed
        }
      }
    }

    console.warn(`No match found for User ID ${userId}`);
    return null;
  } catch (error) {
    console.error('Error accessing Google Sheets API:', error.message);
    throw new Error('Error accessing Google Sheets API');
  }
}
