import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/signup', userData);
      console.log(response.data);
    } catch (err) {
      console.error('Error signing up', err);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
        <input type="email" placeholder="Email" onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
