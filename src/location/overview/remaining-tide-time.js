import React, { Component } from 'react'
import moment from 'moment'
import UI from '../../assets/ui'
import addLeadingZero from '../../utils/add-leading-zero'

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
    if (this.props.nextTide === null) {
      const time = moment(this.props.nextTide.time)
      const diff = moment.duration(time.diff(moment()))
      return `${addLeadingZero(diff.hours(), 0)}:${addLeadingZero(
        diff.minutes(),
        0,
      )}:${addLeadingZero(diff.seconds(), 0)} `
    } else {
      return null
    }
  }

  get formattedTideDirection() {
    if (this.props.nextTide === null) {
      return `UNTIL ${this.props.nextTide.type.toUpperCase()}`
    } else {
      return null
    }
  }

  render() {
    return (
      this.props.nextTide && (
        <UI.Type.SmallNumericType>
          {this.formattedTime}
          {this.formattedTideDirection}
        </UI.Type.SmallNumericType>
      )
    )
  }
}
