import React from 'react'
import { Bar } from 'victory'

class BarSegment extends React.Component {
  render() {
    // console.log(this.props)

    return (
      <g>
        <Bar {...this.props} style={{ fill: this.props.color, width: 1 }} />
        <rect
          x={this.props.x - 8}
          y={this.props.y0}
          width="16"
          height="2"
          fill={this.props.color}
        />

        <g
          rotate={this.props.datum.direction}
          x={this.props.x - 4}
          y={this.props.y}
        >
          <path
            d="M4.464 1.16L8 10H5L4 8l-1 2H0l3.536-8.84c.102-.256.393-.38.65-.278.127.05.227.152.278.28z"
            fill={this.props.color}
            fillRule="evenodd"
            transform={`rotate(${this.props.datum.direction})`}
          />
        </g>
      </g>
    )
  }
}

export default BarSegment
