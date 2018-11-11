import React from 'react';
import { Point } from 'victory';
import moment from 'moment';

const pointStyle = {
  fill: '#ffffff',
  filter: 'drop-shadow(3px 2px 2px rgba(0,96,128,0.1))',
};

const arrowCSS = {
  fontFamily: 'InputMonoNarrow-Bold',
  fontSize: 12,
  color: '#0D1B2A',
};

const timeCSS = {
  fontSize: 16,
  fontWeight: 500,
  fill: '#20A4FC',
};

const heightCSS = {
  fontSize: 13,
  fontWeight: 500,
  fill: '#0D1B2A',
};


const Time = ({ datum, x, y }) => (
  <text x={x} y={y - 32} id="tideTime" textAnchor="middle" style={timeCSS}>
    {moment(datum.time).format('h:mm a')}
  </text>
);

const Height = ({ datum, x, y }) => (
  <text x={x} y={y - 16} id="tideHeight" textAnchor="middle" style={heightCSS}>
    {datum.height}
  </text>
);

const ArrowDirection = ({ datum, x, y }) => (
  <text x={x - 2} y={y + 2} id="↑" style={arrowCSS}>
    {datum.type === 'high' ? '↑' : '↓'}
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
    <Time {...props} />
    <Height {...props} />
    <Point cx={props.x} cy={props.y} {...props} style={pointStyle} filter="url(#f2)" />
    <ArrowDirection {...props} />
  </g>
);

export default Marker;
