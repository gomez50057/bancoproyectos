import React from 'react';
import '../projectRegistration/ClientPanel.css';

const TooltipHelp = ({ id, text }) => {
  return (
    <span id={id} className="tooltip-icon">
      <span className="tooltip-text">{text}</span>
    </span>
  );
};

export default TooltipHelp;
