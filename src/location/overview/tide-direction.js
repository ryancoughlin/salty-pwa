import React from 'react'
import glamorous from 'glamorous'
import UI from '../../assets/ui'
import TideArrow from '../../common/tide-arrow'

const TideDirection = ({ nextTide }) => (
  <Container>
    <UI.Type.TideDirection>
      {nextTide.type === 'high' ? 'Incoming' : 'Outgoing'}{' '}
    </UI.Type.TideDirection>
    <TideArrow direction={nextTide.type} tideDirection />
  </Container>
)

const Container = glamorous.div({
  display: 'flex',
  marginTop: 24,
})

export default TideDirection
