import React from 'react';
import { Bar } from 'victory';

const BarSegment = ({
  ...props
}) => (
  <g>
    <Bar {...props} style={{ fill: props.color, width: 9 }} />
    <g
      style={{ transformOrigin: '4px 6px' }}
      transform={`translate(${props.x - 4}, ${props.y0
            + 8}) rotate(${props.datum.direction})`}
    >
      <path
        d="M4.464 1.16L8 10H5L4 8l-1 2H0l3.536-8.84c.102-.256.393-.38.65-.278.127.05.227.152.278.28z"
        fill={props.color}
        fillRule="evenodd"
      />
    </g>
  </g>
);

export default BarSegment;
