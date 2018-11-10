import React from 'react';
import glamorous from 'glamorous';
import Icon from './icon';

const Loading = props => (
  <Container {...props}>
    <Icon.Loader size="40" style={{ top: '-5px', position: 'relative' }} />
  </Container>
);

const Container = glamorous.div(
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  props => ({
    width: props.inline ? '100%' : '100vw',
    height: props.inline ? '100%' : '100vh',
  }),
);

export default Loading;
