import axios from 'axios';

export default async function handler(req, res) {
  console.log(`Received ${req.method} request with query:`, req.query);

  if (req.method !== 'GET') {
    console.log('Error: Method Not Allowed');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { userId } = req.query;

  if (!userId) {
    console.log('Error: User ID is required');
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const response = await axios.get(`https://23.22.198.16:4000/api/user/${userId}`);
    const userData = response.data;

    console.log('User data retrieved from external API:', userData); // Log the retrieved data

    // Directly match the user ID
    if (userData && userData.userId === userId) {
      console.log('User data retrieved successfully:', userData);
      return res.status(200).json(userData);
    } else {
      console.log('User ID does not match:', userData.userId, '!==', userId);
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching from external API:', error.message);
    return res.status(500).json({ 
      error: 'Failed to fetch data', 
      details: error.message 
    });
  }
}
