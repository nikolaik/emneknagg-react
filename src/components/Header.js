'use strict';

import React from 'react';
import Clock from './Clock';
import SearchTerm from './SearchTerm';

require('styles/Header.scss');

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <SearchTerm/>
        <Clock/>
      </div>
    );
  }
}

Header.displayName = 'Header';

export default Header;
