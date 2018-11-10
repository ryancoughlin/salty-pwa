import React, { Component } from 'react';
import moment from 'moment';
import UI from '../../assets/ui';
import addLeadingZero from '../../utils/add-leading-zero';

export default class RemainingTideTime extends Component {
  componentDidMount() {
    this.timer = setInterval(() => {
      this.forceUpdate();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  get formattedTime() {
    const time = moment(this.props.nextTide.time);
    const diff = moment.duration(time.diff(moment()));
    return `${addLeadingZero(diff.hours(), 0)}:${addLeadingZero(diff.minutes(), 0)}:${addLeadingZero(diff.seconds(), 0)} `;
  }

  get formattedTideDirection() {
    return `UNTIL ${this.props.nextTide.type.toUpperCase()}`;
  }

  render() {
    return (
      <UI.Type.SmallNumericType>
        {this.formattedTime}
        {this.formattedTideDirection}
      </UI.Type.SmallNumericType>
    );
  }
}
