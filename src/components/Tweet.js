'use strict';

import React from 'react';
import moment from 'moment';
import 'moment/locale/nb';  // FIXME: load dynamically?

require('styles/Tweet.scss');

class Tweet extends React.Component {

  static getRelativeTime(time, locale) {
    const DATETIME_FORMAT = 'MMM DD HH:mm:ss Z YYYY';
    moment.locale(locale); // format in locale

    time = time.slice(4); // without weekday
    var when = moment(time, DATETIME_FORMAT);

    var now = moment().utc();
    return when.from(now);
  }

  constructor(props) {
    super(props);

    this.state = {
      createdAtRelative: Tweet.getRelativeTime(props.status.created_at, props.locale)
    }
  }

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
          <a href={'https://twitter.com/' + this.props.status.user.screen_name + '/status/' + this.props.status.id_str} className="when" title={this.props.status.created_at}>{this.state.createdAtRelative}</a>
        </div>
      </div>
  }
}

Tweet.displayName = 'Tweet';
Tweet.defaultProps = {
  status: {},
  locale: 'nb'

};

export default Tweet;
