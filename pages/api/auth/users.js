import allowedUsers from '../../data/allowedUsers.json';
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'allowedUsers.json');

  switch (req.method) {
    case 'GET':
      // Return the list of allowed users
      res.status(200).json(allowedUsers);
      break;

    case 'POST':
      // Add a new user
      const newUser = req.body; // Assuming the user data is sent in the request body
      allowedUsers.allowedUsers.push(newUser);
      fs.writeFileSync(filePath, JSON.stringify(allowedUsers, null, 2));
      res.status(201).json(newUser);
      break;

    case 'DELETE':
      // Remove a user by ID
      const userId = req.body.id; // Assuming the ID is sent in the request body
      allowedUsers.allowedUsers = allowedUsers.allowedUsers.filter(user => user.id !== userId);
      fs.writeFileSync(filePath, JSON.stringify(allowedUsers, null, 2));
      res.status(200).json({ message: 'User removed successfully' });
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
