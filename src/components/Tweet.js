'use strict';

import React from 'react';
import moment from 'moment';
import 'moment/locale/nb';  // FIXME: load dynamically?

require('styles/Tweet.scss');

class Tweet extends React.Component {

  static formatText(text, searchTerm) {
    text = Tweet.anchorUrls(text);
    text = Tweet.highlightTerm(text, searchTerm);
    return text;
  }

  static anchorUrls(text) {
    var _list = text.match( /\b(https?:\/\/|www\.|https?:\/\/www\.)[^ ]{2,100}\b/g );
    if ( _list ) {
      var i;
      for ( i = 0; i < _list.length; i++ ) {
        text = text.replace( _list[i], '<a target="_blank" href="' + _list[i] + '">'+ _list[i] + '</a>' );
      }
    }
    return text;
  }

  static highlightTerm(text, term) {
    var re = new RegExp(term, 'i');
    var _list = re.exec(text);
    if ( _list ) {
      var i ;
      for ( i = 0; i < _list.length; i++ ) {
        text = text.replace( _list[i], '<span class="search-term-highlight">'+ _list[i] + '</span>' );
      }
    }
    return text;
  }

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
      createdAtRelative: Tweet.getRelativeTime(props.status.created_at, props.locale),
      text: ' ' + Tweet.formatText(props.status.text, props.searchTerm)
    }
  }

  // FIXME: How to avoid dangerouslySetInnerHTML?
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
          <span dangerouslySetInnerHTML={{__html: this.state.text}} /><br/>
          <a href={'https://twitter.com/' + this.props.status.user.screen_name + '/status/' + this.props.status.id_str} className="when" title={this.props.status.created_at}>{this.state.createdAtRelative}</a>
        </div>
      </div>
  }
}

Tweet.displayName = 'Tweet';
Tweet.defaultProps = {
  status: {},
  locale: 'nb',
  searchTerm: ''

};

export default Tweet;
