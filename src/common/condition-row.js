import React, { Component } from 'react'
import glamorous from 'glamorous'
import UI from '../assets/ui'

export default class ConditionRow extends Component {
  render() {
    const { label, value } = this.props

    return (
      <Container {...this.props}>
        <Label {...this.props}>{label}</Label>
        <Value {...this.props}>{value}</Value>
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
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
  },
  props => ({
    textDecoration: props.pastTide ? 'line-through' : 'none',
    borderBottomColor: props.color,
  }),
)

const Label = glamorous(UI.Type.TextMedium)(
  {
    color: 'white',
  },
  props => ({
    color: props.color,
  }),
)

const Value = glamorous(UI.Type.SmallNumericType)(
  {
    color: 'white',
  },
  props => ({
    color: props.color,
  }),
)
