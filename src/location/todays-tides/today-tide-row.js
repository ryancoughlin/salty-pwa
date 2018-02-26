import React, { Component } from 'react'
import _ from 'lodash'
import moment from 'moment'
import glamorous from 'glamorous'
import Styles from '../../assets/styles'

export default class NextTideRow extends Component {
  formatTideTime(time) {
    return moment
      .utc(time)
      .local()
      .format('hh:mma')
  }

  formatTideHeight(height) {
    return `${height.toFixed(1)}'`
  }

  get pastTideStyle() {
    const time = this.props.tide.time
    const now = moment()

    if (
      moment
        .utc(time)
        .local()
        .diff(now, 'minutes') < 0
    ) {
      return 'foo'
    }
  }

  render() {
    const { tide } = this.props

    return (
      <Container>
        <TideType>{_.upperFirst(tide.type)}</TideType>
        <Styles.Type.Time>
          {this.formatTideTime(tide.time)} /{' '}
          {this.formatTideHeight(tide.height)}
        </Styles.Type.Time>
      </Container>
    )
  }
}

const Container = glamorous.div({
  marginLeft: 61,
  flexDirection: 'row',
  display: 'flex',
  marginBottom: 8,
})

const TideType = glamorous(Styles.Type.SmallBody)({
  minWidth: 50,
})
