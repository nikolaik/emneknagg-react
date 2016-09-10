'use strict';

import React from 'react';

require('styles/SearchTerm.scss');

class SearchTerm extends React.Component {
  render() {
    return <div className="search-term">{this.props.term}</div>
  }
}

SearchTerm.displayName = 'SearchTerm';
SearchTerm.defaultProps = {
  term: '#dnsgf'
};

export default SearchTerm;
