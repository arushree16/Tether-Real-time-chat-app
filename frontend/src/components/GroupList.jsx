// src/components/GroupList.jsx
import React from 'react';

const GroupList = ({ groups, onSelectGroup }) => {
  const groupListStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '1rem',
    background: '#f7f7f7',
    borderRadius: '10px',
  };

  const groupItemStyles = {
    background: '#fff',
    borderRadius: '10px',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  };

  const groupItemHoverStyles = {
    transform: 'translateY(-5px)',
  };

  const groupInfoStyles = {
    display: 'flex',
    alignItems: 'center',
  };

  const groupIconStyles = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: '1rem',
  };

  const groupNameStyles = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#333',
  };

  return (
    <div style={groupListStyles}>
      {groups.map((group) => (
        <div
          key={group.id}
          style={groupItemStyles}
          onClick={() => onSelectGroup(group.id)}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
        >
          <div style={groupInfoStyles}>
            <img
              src={group.icon}
              alt={group.name}
              style={groupIconStyles}
            />
            <div style={groupNameStyles}>{group.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupList;
