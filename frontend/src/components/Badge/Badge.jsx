import React from 'react';
import './Badge.css';

const Badge = ({ children, variant = 'primary', icon: Icon }) => {
  return (
    <span className={`badge badge-${variant}`}>
      {Icon && <Icon className="badge-icon" />}
      {children}
    </span>
  );
};

export default Badge;
