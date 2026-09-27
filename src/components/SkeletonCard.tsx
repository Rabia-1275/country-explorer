import React from 'react';
import './SkeletonCard.css';

export default function SkeletonCard() {
  return (
    <div className="country-card skeleton-card">
      <div className="skeleton-box skeleton-flag"></div>
      <div className="country-details">
        <div className="skeleton-box skeleton-title"></div>
        <div className="country-info-row">
          <div className="skeleton-box skeleton-text-short"></div>
          <div className="skeleton-box skeleton-text-short"></div>
        </div>
        <div className="country-info-row">
          <div className="skeleton-box skeleton-text-short"></div>
          <div className="skeleton-box skeleton-text-short"></div>
        </div>
      </div>
    </div>
  );
}
