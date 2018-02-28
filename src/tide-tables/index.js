import React, { Component } from 'react'
import Header from './header'
import TideRow from './tide-row'
import ModalHeader from '../common/modal-header'

class Location extends Component {
  state = {
    tides: JSON.parse(localStorage.getItem('tides')),
  }

  render() {
    const { tides } = this.state

    return (
      <div>
        <ModalHeader />
        {Object.keys(tides).map(date => {
          const dayTides = tides[date]
          return (
            <div>
              <Header date={date} />
              {dayTides.map(dayTide => {
                return <TideRow tide={dayTide} />
              })}
            </div>
          )
        })}
      </div>
    )
  }
}

export default Location
