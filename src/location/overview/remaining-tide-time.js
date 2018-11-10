import React, { Component } from 'react';
import moment from 'moment';
import UI from '../../assets/ui';

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
    // console.log('TCL: RemainingTideTime -> getformattedTime -> this.props.nextTide', this.props.nextTide);
    // console.log('TCL: RemainingTideTime -> getformattedTime -> time', time);
    // console.log('TCL: RemainingTideTime -> getformattedTime -> diff.minutes()', diff.minutes());
    // console.log('TCL: RemainingTideTime -> getformattedTime -> diff.hours()', diff.hours());

    return `${this.padNumbers(diff.hours())}:${this.padNumbers(diff.minutes())}:${this.padNumbers(diff.seconds())} `;
  }

  get formattedTideDirection() {
    return `UNTIL ${this.props.nextTide.type.toUpperCase()}`;
  }

  padNumbers(number) {
    return number;
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
