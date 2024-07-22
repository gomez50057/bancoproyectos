import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import './ClientPanel.css';

const CustomTooltip = ({ id, text }) => (
  <Tooltip.Provider>
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <span className="tooltip-icon" data-tip={text}>🔴</span>
      </Tooltip.Trigger>
      <Tooltip.Content className="tooltip-content" side="right" align="center">
        {text}
        <Tooltip.Arrow className="tooltip-arrow" />
      </Tooltip.Content>
    </Tooltip.Root>
  </Tooltip.Provider>
);

export default CustomTooltip;
