import React, { Component } from 'react'
import _ from 'lodash'
import moment from 'moment'
import glamorous from 'glamorous'
import { shortTimeFormat } from '../../utils/helpers'
import Styles from '../../assets/styles'

export default class NextTideRow extends Component {
  render() {
    const { tide } = this.props

    return (
      <Container pastTide={isPastTide(tide.time)}>
        <TideType>{_.upperFirst(tide.type)}</TideType>
        <Styles.Type.Time>
          {shortTimeFormat(tide.time)} / {formatTideHeight(tide.height)}
        </Styles.Type.Time>
      </Container>
    )
  }
}

const formatTideHeight = height => {
  return `${height.toFixed(1)}'`
}

const isPastTide = time => {
  const now = moment()

  if (
    moment
      .utc(time)
      .local()
      .diff(now, 'minutes') < 0
  ) {
    return true
  }
}

const Container = glamorous.div(
  {
    marginLeft: 47,
    flexDirection: 'row',
    display: 'flex',
    marginBottom: 8,
  },
  props => ({
    textDecoration: props.pastTide ? 'line-through' : 'none',
  }),
)

const TideType = glamorous(Styles.Type.SmallBody)({
  minWidth: 50,
})
