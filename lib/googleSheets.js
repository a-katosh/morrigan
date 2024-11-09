// lib/googleSheets.js
import { google } from 'googleapis';

// Configure Google Sheets API with environment variables
const auth = new google.auth.GoogleAuth({
  credentials: {
    type: 'service_account',
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Replace escaped newlines
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    auth_uri: process.env.GOOGLE_AUTH_URI,
    token_uri: process.env.GOOGLE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

export async function getUserDataFromSheet(userId) {
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = process.env.GOOGLE_SHEET_ID; // Store sheet ID as an env variable
  const range = 'Sheet1!C:C'; // Assuming data is in column C

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) return null;

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
