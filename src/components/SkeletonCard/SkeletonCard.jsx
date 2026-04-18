import React from 'react';
import './SkeletonCard.css';

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-poster shimmer"></div>
      <div className="skeleton-info">
        <div className="skeleton-line shimmer title"></div>
        <div className="skeleton-line shimmer meta"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
