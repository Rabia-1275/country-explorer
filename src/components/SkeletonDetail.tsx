import React from 'react';
import './SkeletonDetail.css';

export default function SkeletonDetail() {
  return (
    <div className="detail-view-container">
      <div className="skeleton-box skeleton-back-btn"></div>
      <div className="detail-content skeleton-detail-content">
        <div className="detail-flag-container">
          <div className="skeleton-box skeleton-detail-flag"></div>
        </div>
        <div className="detail-info">
          <div className="skeleton-box skeleton-title-large"></div>
          <div className="skeleton-box skeleton-title-medium"></div>
          
          <div className="info-grid" style={{ marginTop: '2rem' }}>
            <div className="info-column">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="skeleton-box skeleton-text-line"></div>
              ))}
            </div>
            <div className="info-column">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="skeleton-box skeleton-text-line"></div>
              ))}
            </div>
          </div>
          
          <div className="borders-section" style={{ marginTop: '2rem' }}>
            <div className="skeleton-box skeleton-title-small"></div>
            <div className="borders-list" style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="skeleton-box skeleton-border-chip"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
