// pages/api/get-user.js
import { getUserDataFromSheet } from '../../lib/googleSheets';

export default async function handler(req, res) {
  console.log(`Received ${req.method} request with query:`, req.query);

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    // Get user data from Google Sheets instead of external API
    const userData = await getUserDataFromSheet(userId);

    if (userData) {
      return res.status(200).json(userData);
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error.message);
    return res.status(500).json({ error: 'Failed to fetch data', details: error.message });
  }
}
