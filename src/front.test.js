import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStatusBar from './appBar/appBar.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GlobalStatusBar />, div);
  ReactDOM.unmountComponentAtNode(div);
});
