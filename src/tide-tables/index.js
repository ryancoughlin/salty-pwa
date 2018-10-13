import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from './header'
import TideRow from './tide-row'
import ModalHeader from '../common/modal-header'
import Styles from '../assets/styles'

class Tides extends Component {
  render() {
    const { tides } = this.props
    console.log('TCL: Location -> render -> tides', tides)

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

const mapStateToProps = ({ data }) => ({
  tides: data.tides,
})

export default connect(mapStateToProps)(Tides)
