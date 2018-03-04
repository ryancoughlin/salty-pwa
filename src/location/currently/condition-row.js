import React, { Component } from 'react'
import glamorous from 'glamorous'
import Styles from '../../assets/styles'

export default class ConditionRow extends Component {
  render() {
    const { label, value } = this.props

    return (
      <Container>
        <Label>{label}</Label>
        <Value>{value}</Value>
      </Container>
    )
  }
}

const Container = glamorous.div(
  {
    flexDirection: 'row',
    display: 'flex',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.04)',
  },
  props => ({
    textDecoration: props.pastTide ? 'line-through' : 'none',
  }),
)

const Label = glamorous(Styles.Type.SmallBody)({
  color: 'white',
})

const Value = glamorous(Styles.Type.SmallNumericType)({
  color: 'white',
})
