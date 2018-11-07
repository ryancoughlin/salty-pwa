import React from 'react';

const circleCSS = {
  filter: '0 1px 4px 0 rgba(17,29,74,0.20)',
};

const arrowCSS = {
  fontFamily: 'InputMonoNarrow-Bold',
  fontSize: 12,
  color: '#0D1B2A',
};

const ArrowDirection = ({ datum, x, y }) => (
  <text id="↑" style={arrowCSS}>
    <tspan x={x - 2} y={y + 2}>{datum.type === 'high' ? '↑' : '↓'}</tspan>
  </text>
);

const Marker = ({
  ...props
}) => (
  <g>
    <defs>
      <filter id="dropshadow" x="-40%" y="-40%" width="180%" height="180%" filterUnits="userSpaceOnUse">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
        <feOffset dx="5" dy="5" result="offsetblur" />
        <feOffset dx="-5" dy="-5" result="offsetblur" />
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g>
      <circle r="12" cx={props.x} cy={props.y} fill="#ffffff" style={circleCSS} />
      <ArrowDirection {...props} />
    </g>
  </g>
);

export default Marker;