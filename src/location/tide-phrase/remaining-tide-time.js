import React, { Component } from 'react'
import _ from 'lodash'
import moment from 'moment'
import glamorous from 'glamorous'
import Styles from '../../assets/styles'

export default class RemainingTideTime extends Component {
  componentDidMount() {
    this.timer = setInterval(() => {
      this.forceUpdate()
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  get formattedTime() {
    const time = moment.utc(this.props.nextTide.time).local()
    const diff = moment.duration(time.diff(moment()))

    return `${this.padNumbers(diff.hours())}:${this.padNumbers(
      diff.minutes(),
    )}:${this.padNumbers(diff.seconds())} `
  }

  get formattedTideDirection() {
    return `UNTIL ${this.props.nextTide.type.toUpperCase()}`
  }

  padNumbers(number) {
    return _.padStart(number, 2, 0)
  }

  render() {
    return (
      <TimeLeft>
        {this.formattedTime}
        {this.formattedTideDirection}
      </TimeLeft>
    )
  }
}

const TimeLeft = glamorous(Styles.Type.SmallNumericType)({
  marginLeft: 2,
})
