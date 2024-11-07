// pages/api/get-user.js
import axios from 'axios';
import https from 'https';

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
    const response = await axios.get(`https://23.22.198.16:4000/api/user/${userId}`, {
      httpsAgent: new https.Agent({ rejectUnauthorized: false }), // Disable SSL verification for testing
    });
    const userData = response.data;

    if (userData && userData.userId === userId) {
      return res.status(200).json(userData);
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching from external API:', error.message);
    return res.status(500).json({ error: 'Failed to fetch data', details: error.message });
  }
}
