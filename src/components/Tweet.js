'use strict';

import React from 'react';

require('styles/Tweet.scss');

class Tweet extends React.Component {
  render() {
    return <div className="tweet">
        <div className="profile">
          <a href={'https://twitter.com/' + this.props.status.user.screen_name}>
            <img src={this.props.status.user.profile_image_url_https.replace('_normal', '_bigger')} className="profile-image" />
          </a>
        </div>
        <div className="text">
          <span className="screen-name">
          <a href={'https://twitter.com/' + this.props.status.user.screen_name}>{this.props.status.user.screen_name}</a></span>
          {' ' + this.props.status.text}<br/>
          <a href={'https://twitter.com/' + this.props.status.user.screen_name + '/status/' + this.props.status.id_str} className="when" title={this.props.status.created_at}>{this.props.status.created_at}</a>
        </div>
      </div>
  }
}

Tweet.displayName = 'Tweet';
Tweet.defaultProps = {
  status: {}
};

export default Tweet;
