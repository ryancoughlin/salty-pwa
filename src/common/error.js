import React from 'react'
import glamorous from 'glamorous'
import UI from '../assets/ui'

const Error = props => (
  <Container {...props}>
    <div>
      <UI.Type.SecondaryHeader>Location lookup failed</UI.Type.SecondaryHeader>
      <UI.Type.Text>
        {props.error.message} - Allow location permissions for Salty to find
        tide and swell data near you.
      </UI.Type.Text>
    </div>
  </Container>
)

const Container = glamorous.div({
  padding: UI.Spacing.largeSpacing,
  backgroundColor: 'white',
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
})

export default Error
