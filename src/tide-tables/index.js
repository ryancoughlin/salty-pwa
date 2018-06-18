import React, { Component } from 'react'
import Header from './header'
import TideRow from './tide-row'
import ModalHeader from '../common/modal-header'
import Styles from '../assets/styles'

class Location extends Component {
  state = {
    tides: JSON.parse(localStorage.getItem('tides')),
  }

  render() {
    const { tides } = this.state

    return (
      <div className={'container'}>
        <ModalHeader />
        <Styles.Containers.Base>
          {Object.keys(tides).map(date => {
            const dayTides = tides[date]
            return (
              <div>
                <Header date={date} />
                {dayTides.map((dayTide, index) => {
                  return <TideRow tide={dayTide} key={index} />
                })}
              </div>
            )
          })}
        </Styles.Containers.Base>
      </div>
    )
  }
}

export default Location
