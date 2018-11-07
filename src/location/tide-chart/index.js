import React, { Component } from 'react';
import { connect } from 'react-redux';
import glamorous from 'glamorous';
import Chart from './chart';
import UI from '../../assets/ui';

class TideChart extends Component {
  componentDidCatch(error, info) {
    Raven.captureException(error, {
      extra: info,
      props: this.props,
    });
  }

  render() {
    const { tides } = this.props;

    return (
      <Container>
        {tides ? <Chart tides={tides} /> : <div>Loading...</div>}
      </Container>
    );
  }
}
const Container = glamorous.div({
  marginBottom: UI.Spacing.Default,
});

const mapStateToProps = ({ data }) => ({
  tides: data.tides,
});

export default connect(mapStateToProps)(TideChart);
