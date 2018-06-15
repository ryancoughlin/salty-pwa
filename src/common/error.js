import React from 'react'
import glamorous from 'glamorous'
import Styles from '../assets/styles'

const Error = props => (
  <Container {...props}>
    <div>
      <Styles.Type.SecondaryHeader>
        Location lookup failed
      </Styles.Type.SecondaryHeader>
      <Styles.Type.Text>
        {props.error.message} - Allow location permissions for Salty to find
        tide and swell data near you.
      </Styles.Type.Text>
    </div>
  </Container>
)

const Container = glamorous.div({
  padding: Styles.Spacing.largeSpacing,
  backgroundColor: 'white',
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
})

export default Error
