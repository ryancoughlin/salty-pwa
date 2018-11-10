import React from 'react';
import { connect } from 'react-redux';
import Header from './header';
import TideRow from './tide-row';
import ModalHeader from '../common/modal-header';
import UI from '../assets/ui';

const Tides = ({ tides }) => (
  <div className="container">
    <ModalHeader />
    <UI.Container.Base>
      {Object.keys(tides).map((date) => {
        const dayTides = tides[date];
        return (
          <div>
            <Header date={date} />
            {dayTides.map((dayTide, index) => (
              <TideRow tide={dayTide} key={index} />
            ))}
          </div>
        );
      })}
    </UI.Container.Base>
  </div>
);

const mapStateToProps = ({ data }) => ({
  tides: data.tides,
});

export default connect(mapStateToProps)(Tides);
