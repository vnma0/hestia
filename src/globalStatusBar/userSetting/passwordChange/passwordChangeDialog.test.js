import React from 'react';
import ReactDOM from 'react-dom';
import PasswordChangeDialog from './passwordChangeDialog.js'

it('UserSettingDialog rendered - no crash', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PasswordChangeDialog open={true} user="Test user" slideDirection="right"/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  