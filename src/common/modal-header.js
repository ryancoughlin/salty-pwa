import React from 'react';
import { Link } from 'react-router-dom';
import glamorous from 'glamorous';
import UI from '../assets/ui';

const ModalHeader = () => (
  <Container>
    <Link to="/">
      <Close>×</Close>
    </Link>
  </Container>
);

const Container = glamorous.div({
  display: 'flex',
  height: 64,
  backgroundColor: 'white',
  justifyContent: 'flex-end',
  alignItems: 'center',
  paddingRight: UI.Spacing.Default,
  position: 'relative',
  zIndex: 1,
  borderBottomColor: UI.Colors.Palette.LightGray,
  borderBottomWidth: 1,
  borderBottomStyle: 'solid',
});

const Close = glamorous.span({
  fontSize: 26,
  fontWeight: 'normal',
});

export default ModalHeader;
