require('normalize.css');
require('styles/App.scss');

import React from 'react';

import EmneknaggHeader from './Header';
import TweetList from './TweetList';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <EmneknaggHeader />
        <TweetList statuses={this.props.statuses} />
      </div>
    );
  }
}

export default AppComponent;
