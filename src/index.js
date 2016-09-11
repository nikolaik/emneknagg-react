import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';


var emneknaggTestData = require('json!./emneknagg.json');

// Render the main component into the dom
ReactDOM.render(<App {...emneknaggTestData} />, document.getElementById('app'));
