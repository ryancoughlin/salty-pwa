import React from 'react'
import glamorous from 'glamorous'
// import { ReactComponent as Loader } from '../assets/images/loader.svg'

const Loading = (props) => <Container {...props}></Container>

const Container = glamorous.div(
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  (props) => ({
    width: props.inline ? '100%' : '100vw',
    height: props.inline ? '100%' : '100vh',
  }),
)

export default Loading
