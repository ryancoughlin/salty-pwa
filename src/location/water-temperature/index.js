import React, { Component } from 'react'
import { connect } from 'react-redux'

import ConditionRow from '../../common/condition-row'

const WaterTemperature = class extends Component {
  render() {
    const currentTemp = this.props.waterTemperature.temperature

    if (!currentTemp) {
      return null
    }

    return <ConditionRow dark label="Temperature" value={`${currentTemp}°`} />
  }
}

const mapStateToProps = ({ data }) => ({
  waterTemperature: data.waterTemperature,
})
export default connect(mapStateToProps)(WaterTemperature)
