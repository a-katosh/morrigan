import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';

const dynamoDbClient = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default async function handler(req, res) {
  // Log the incoming request method and query parameters
  console.log(`Received ${req.method} request with query:`, req.query);

  // Only allow GET requests
  if (req.method !== 'GET') {
    console.log('Error: Method Not Allowed');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { userId } = req.query;

  // Validate userId presence
  if (!userId) {
    console.log('Error: User ID is required');
    return res.status(400).json({ error: 'User ID is required' });
  }

  // Define the parameters for DynamoDB GetItem command
  const params = {
    TableName: 'AllowedUsers', // Ensure this is the correct table name
    Key: {
      id: { S: userId },
    },
  };

  try {
    console.log(`Fetching user data for userId: ${userId}`);
    const { Item } = await dynamoDbClient.send(new GetItemCommand(params));
    
    // Check if Item exists
    if (!Item) {
      console.log('User not found:', userId);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('User data retrieved successfully:', Item);
    
    // Format the response item as needed before sending it back
    const formattedItem = {
      id: Item.id.S,
      // Include other attributes if necessary
      ...Item, // Spread the other attributes
    };

    // Send the user data as a JSON response
    return res.status(200).json(formattedItem);
  } catch (error) {
    console.error('Error fetching from DynamoDB:', error);
    
    // Return a detailed error message in the response
    return res.status(500).json({ 
      error: 'Failed to fetch data', 
      details: error.message 
    });
  }
}
