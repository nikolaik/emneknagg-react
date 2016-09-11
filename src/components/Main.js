require('normalize.css');
require('styles/App.scss');

import React from 'react';

import Header from './Header';
import TweetList from './TweetList';

class App extends React.Component {
  render() {
    return (
      <div className="index">
        <Header />
        <TweetList statuses={this.props.statuses} searchTerm={decodeURIComponent(this.props.search_metadata.query)} />
      </div>
    );
  }
}

export default App;
