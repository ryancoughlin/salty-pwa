import React, { Component } from 'react'
import glamorous from 'glamorous'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions'
import UI from '../../assets/styles'
import RemainingTideTime from './remaining-tide-time'
import TideArrow from '../../common/tide-arrow'

const TidePhrase = class extends Component {
  componentDidCatch(error, info) {
    // eslint-disable-next-line
    Raven.captureException(error, {
      extra: info,
      state: this.state,
      props: { ...this.props },
    })
  }

  render() {
    const { nextTide } = this.props

    // eslint-disable-next-line
    Raven.setExtraContext({ nextTide })

    return (
      <Container>
        <TideArrow direction={nextTide.type} tidePhrase />
        <InnerContainer>
          <UI.Type.TidePhrase>
            {nextTide.type === 'high' ? 'Incoming' : 'Outgoing'}{' '}
            <FadedText>
              Tide
              <br />in <a>{this.props.locationName}</a>
            </FadedText>
          </UI.Type.TidePhrase>
          <RemainingTideTime nextTide={nextTide} />
        </InnerContainer>
      </Container>
    )
  }
}

const FadedText = glamorous.span({
  color: UI.Colors.SubtleTextColor,
})

const Container = glamorous.div({
  display: 'flex',
  flexDirection: 'row',
  marginTop: 60,
})

const InnerContainer = glamorous.div({
  marginLeft: 16,
})

const mapStateToProps = ({ data }) => ({
  locationName: data.locationName,
  location: data.location,
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(TidePhrase)
