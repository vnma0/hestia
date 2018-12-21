import React, { Component } from 'react';

import {validateKey, validateID} from './validate';
import { TextField, Button } from '@material-ui/core';

import SendIcon from '@material-ui/icons/Send';
import RefreshIcon from '@material-ui/icons/Refresh';

import './form.css'

const formTheme = {
    marginBottom : '10px',
    width : '150%'
}

const buttonIconStyle = {
    marginLeft : 12
}

const formContainerTheme = {
    
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id : '',
            validId : true,
            idRef : React.createRef(),

            validPasskey : true,
            passkeyRef : React.createRef()
        }

        // binding stuffs
        this.handleKeyChange = this.handleKeyChange.bind(this);
        this.handleUserIDChange = this.handleUserIDChange.bind(this);
    }

    handleUserIDChange = (event) => {
        this.setState({
            id : event.target.value,
            validId : validateID(event.target.value)
            // the ID must be valid in order to allow authentication
        })
    }

    handleKeyChange = (event) => {
        this.setState({
            validPasskey : validateKey(event.target.value)
            // and so does the authentication key
        })
    }

    render() {
        return (
            <form noValidate={true} onSubmit={(event) => {
                alert('Log in performed'); event.preventDefault();
                }} style={formContainerTheme}>
                {/* TODO : onsubmit=login */}
                <TextField autoFocus={true} onChange={this.handleUserIDChange} variant={"outlined"} 
                name={"username"} error={!this.state.validId} label="ID" ref={this.state.idRef}
                style={formTheme}>
                </TextField>
                <br />
                <TextField  onChange={this.handleKeyChange} type="password" variant={"outlined"}
                error={!this.state.validPasskey} label="Authentication key" name={"pwd"}
                style={formTheme}>
                </TextField>

                <div style={{
                    marginTop : '10px'
                }}>
                    <Button variant="contained" type="submit" color="inherit" id="login-submit-button">
                        Log in <SendIcon style={buttonIconStyle}/>
                    </Button>
                    &nbsp;
                    <Button variant="contained" type="reset" color="inherit"
                    onClick={() => console.log(this.state.idRef.current)} id="login-reset-button">
                        Reset <RefreshIcon style={buttonIconStyle}/>
                    </Button>
                </div>
            </form>
        )
    }
}

export default LoginForm;