import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';

import submit from './stub/submit.js';

/**
 * @name SubmitButton
 * @desc Button to submit source code; all props will be passed down to `<Button />`
 * @param {String} `code` - source code
 * @param {String} `ext` - file extension of source code
 * @param {String} `fileName` - file name WITHOUT extension. Concat with `ext`.
 * @param {Function} `onSubmit` - function to execute when submit button has been clicked
 * @param {Function} `onSubmitDone` - function to execute when submission has finished.
 *                                    Will fire regardless of whether the submission succeeded.
 * @return {React.Component} - a `<Button />` element that submits `onClick`
 * @author Dat Ngo, minhducsun2002
 */

class SubmitButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitting: false
        };
    }
    render() {
        return (
            <Button
                disabled={this.props.disabled || this.state.submitting}
                variant='contained'
                color='primary'
                onClick={() => {
                    this.setState({ submitting: true });
                    this.props.onSubmit();
                    submit(this.props.code, this.props.fileName, this.props.ext).then(() => {
                        this.props.onSubmitDone();
                        this.setState({
                            submitting: false
                        });
                    });
                }}>
                {this.state.submitting ? <CircularProgress size={20} /> : this.props.children}
            </Button>
        );
    }
}

export default SubmitButton;
