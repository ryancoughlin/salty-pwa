import React, { Component } from 'react'
import ConditionRow from '../../common/condition-row'
import request from '../../utils/request'

const WaterTemperature = class extends Component {
  state = {
    currentTemp: JSON.parse(localStorage.getItem('currentTemp')) || null,
  }

  componentDidMount() {
    const { latitude, longitude } = this.props.location

    request(
      `/water-temperature?latitude=${latitude}&longitude=${longitude}`,
    ).then(latestReading => {
      if (Object.keys(latestReading).length === 0) {
        console.log('empty water tempature response')
      } else {
        const currentTemp = latestReading.temperature
        this.setState({ currentTemp })
        localStorage.setItem('currentTemp', JSON.stringify(currentTemp))
      }
    })
  }

  render() {
    const { currentTemp } = this.state

    if (!currentTemp) {
      return null
    }

    return <ConditionRow label={'Water Temp'} value={`${currentTemp}°`} />
  }
}

export default WaterTemperature
