import React from 'react';
import ReactDOM from 'react-dom';
import FrontPage from './front';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FrontPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
