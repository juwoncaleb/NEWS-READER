var Port = process.env.Port || 3000;
import React from 'react';
import ReactDom from 'react-dom';

import '../src/index.css';

import App from '../src/App';
ReactDom.render(<App />, document.getElementById('root'));
