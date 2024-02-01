import React, { useState } from 'react';
import './OverlayCSS.css';

const CalendarOverlay = ({ tooltipText }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="calendar-overlay-container">
      <span
        className="question-mark-icon"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        role="img" aria-label="question-mark" style={{ cursor: 'pointer' }}>❓</span>
      {showTooltip && (
        <div className="tooltip">
          {tooltipText}
        </div>
      )}
    </div>
  );
};

export default CalendarOverlay;