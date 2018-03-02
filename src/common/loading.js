import React from 'react'
import glamorous from 'glamorous'
import SVG from 'react-inlinesvg'

const Loading = () => (
  <Container>
    <SVG src="/wave-loader.svg" style={{ top: '-5px', position: 'relative' }} />
  </Container>
)

const Container = glamorous.div({
  display: 'flex',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
})

export default Loading
