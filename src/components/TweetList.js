'use strict';

import React from 'react';
import Tweet from './Tweet';

require('styles/TweetList.scss');

class TweetList extends React.Component {
  render() {
    return (
      <div className="tweet-list">
        {
          this.props.statuses.map((status) => {
            return <Tweet key={status.id} status={status} searchTerm={this.props.searchTerm} />
          })
        }
      </div>
    );
  }
}

TweetList.displayName = 'TweetList';
TweetList.defaultProps = {
  statuses: []
};

export default TweetList;
