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
          <span>
            {moment
              .utc(tide.time)
              .local()
              .format('hh:mma')}
          </span>
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
    moment(time)
      .local()
      .diff(now, 'minutes') < 0
  ) {
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
  }),
)

const TideType = glamorous(Styles.Type.SmallBody)({
  minWidth: 54,
})
