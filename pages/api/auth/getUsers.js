// pages/api/getUser.js
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';

const dynamoDbClient = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default async function handler(req, res) {
  const { userId } = req.query; // Expecting userId to be sent in query params

  const params = {
    TableName: 'AllowedUsers',
    Key: {
      id: { S: userId },
    },
  };

  try {
    const { Item } = await dynamoDbClient.send(new GetItemCommand(params));
    if (!Item) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(Item);
  } catch (error) {
    console.error('Error fetching from DynamoDB:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
