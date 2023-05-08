import React, { useState } from 'react';
import './profile.css';

const Profile = (props) => {
  const [user, setUser] = useState(props.user);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  return (
    <div className="profile-container">
      <h1>Welcome, {user.name}!</h1>
      <img src={user.avatarUrl} alt={user.name} />
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={handleNameChange} />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input type="tel" id="phone" name="phone" value={phone} onChange={handlePhoneChange} />
      </div>
      <button>Update Profile</button>
    </div>
  );
};

export default Profile;
