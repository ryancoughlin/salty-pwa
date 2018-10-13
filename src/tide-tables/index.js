import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from './header'
import TideRow from './tide-row'
import ModalHeader from '../common/modal-header'
import UI from '../assets/ui'

class Tides extends Component {
  render() {
    const { tides } = this.props

    return (
      <div className={'container'}>
        <ModalHeader />
        <UI.Containers.Base>
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
        </UI.Containers.Base>
      </div>
    )
  }
}

const mapStateToProps = ({ data }) => ({
  tides: data.tides,
})

export default connect(mapStateToProps)(Tides)
