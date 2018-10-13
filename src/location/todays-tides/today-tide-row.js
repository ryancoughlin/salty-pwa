import React, { Component } from 'react'
import _ from 'lodash'
import moment from 'moment'
import glamorous from 'glamorous'
import { shortTimeFormat } from '../../utils/helpers'
import UI from '../../assets/ui'

export default class NextTideRow extends Component {
  render() {
    const { tide } = this.props

    return (
      <Container pastTide={isPastTide(tide.time)}>
        <TideType>{_.upperFirst(tide.type)}</TideType>
        <UI.Type.Time>
          {shortTimeFormat(tide.time)} / {formatTideHeight(tide.height)}
        </UI.Type.Time>
      </Container>
    )
  }
}

const formatTideHeight = height => {
  return `${height.toFixed(1)}'`
}

const isPastTide = time => {
  const now = moment()

  if (moment(time).diff(now, 'minutes') < 0) {
    return true
  }
}

const Container = glamorous.div(
  {
    marginLeft: 38,
    flexDirection: 'row',
    display: 'flex',
    marginBottom: 8,
    ':last-of-type': {
      marginBottom: 0,
    },
  },
  props => ({
    textDecoration: props.pastTide ? 'line-through' : 'none',
    opacity: props.pastTide ? '0.3' : '1',
  }),
)

const TideType = glamorous(UI.Type.TextMedium)({
  minWidth: 54,
})
