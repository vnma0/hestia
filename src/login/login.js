import React, { Component } from 'react';

import LoginForm from './form.js';

class LoginPage extends Component {
    render() {
        return (
            <div>
                <div style={{
                    marginBottom : '10px'
                }}>
                    Logging in allows submissions.
                </div>
                <div><LoginForm /></div>
            </div>
        )
    }
}

export default LoginPage;