'use strict';

import React from 'react';
import moment from 'moment';
import 'moment/locale/nb';

require('styles/Clock.scss');

class Clock extends React.Component {
  constructor(props) {
    super(props);
    /* FIXME: Pass in initial server time/offset? */
    this.state = {
      time: '00:00'
    }
  }
  render() {
    return <div className="clock">{this.state.time}</div>
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        time: moment().format('HH:mm')
      });
    }, 1000);
  }
}

Clock.displayName = 'Clock';

export default Clock;
