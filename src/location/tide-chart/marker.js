import React from 'react';
import moment from 'moment';

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
      <filter id="markerShadow" y="0" height="40" x="0" width="150">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0C1B2B" floodOpacity="0.2" />
      </filter>
    </defs>
    <Time {...props} />
    <Height {...props} />
    <g filter="url(#markerShadow)">
      <circle cx={props.x + 1} cy={props.y - 2} r="12" fill="white" />
    </g>
    <ArrowDirection {...props} />
  </g>
);

export default Marker;
