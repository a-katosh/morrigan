import { useState } from 'react';

export default function AdminPage() {
  const [userId, setUserId] = useState('');
  const [userClearance, setUserClearance] = useState('');
  const [userRole, setUserRole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/auth/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: userId, clearance: userClearance, role: userRole }),
    });
    
    if (response.ok) {
      alert('User added successfully');
      setUserId('');
      setUserClearance('');
      setUserRole('');
    } else {
      alert('Failed to add user');
    }
  };

  return (
    <div>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Clearance Level"
          value={userClearance}
          onChange={(e) => setUserClearance(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="User Role"
          value={userRole}
          onChange={(e) => setUserRole(e.target.value)}
          required
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}
