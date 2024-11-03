import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';

// Initialize DynamoDB client
const dynamoDbClient = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

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

  const params = {
    TableName: 'AllowedUsers',
    Key: {
      id: { S: userId },
    },
  };

  try {
    console.log(`Fetching user data for userId: ${userId}`);
    const { Item } = await dynamoDbClient.send(new GetItemCommand(params));

    if (!Item) {
      console.log('User not found:', userId);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('User data retrieved successfully:', Item);
    const formattedItem = {
      id: Item.id.S,
      // Add other attributes as necessary
    };

    return res.status(200).json(formattedItem);
  } catch (error) {
    console.error('Error fetching from DynamoDB:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch data', 
      details: error.message 
    });
  }
}
