import React from 'react';

interface UserHeaderProps {
  name: string;
  avatar?: string;
}

const UserHeader: React.FC<UserHeaderProps> = ({ name, avatar }) => (
  <div className="mb-4 d-flex align-items-center gap-3">
    {avatar && (
      <img src={avatar} alt="avatar" style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: '2px solid #ccc' }} />
    )}
    <h2 className="mb-0">Welcome, {name || 'User'}</h2>
  </div>
);

export default UserHeader;
