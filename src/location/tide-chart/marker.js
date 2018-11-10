import React from 'react';
import { Point } from 'victory';

const pointStyle = {
  fill: '#ffffff',
  filter: 'drop-shadow(3px 2px 2px rgba(0,96,128,0.1))',
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
      <filter id="f2" x="0" y="0" width="200%" height="200%">
        <feOffset result="offOut" in="SourceGraphic" dx="20" dy="20" />
        <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
        <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
      </filter>
    </defs>
    <Point cx={props.x} cy={props.y} {...props} style={pointStyle} filter="url(#f2)" />
    <ArrowDirection {...props} />
  </g>
);

export default Marker;
