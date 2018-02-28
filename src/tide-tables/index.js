import React, { Component } from 'react'
import glamorous from 'glamorous'
import Header from './header'
import TideRow from './tide-row'

class Location extends Component {
  state = {
    tides: JSON.parse(localStorage.getItem('tides')),
  }

  render() {
    if (!this.state.tides) {
      return null
    }

    const { tides } = this.state

    return (
      <div>
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
