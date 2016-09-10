'use strict';

import React from 'react';

require('styles/Clock.scss');

class Clock extends React.Component {
  render() {
    return <div className="clock">{this.props.time}</div>
  }
}

Clock.displayName = 'Clock';
Clock.defaultProps = {
  time: '00:00'
};

export default Clock;
