import React from 'react'
import { Button, CircularProgress } from '@material-ui/core'

import submit from './stub/submit.js'

/**
 * @name SubmitButton 
 * @desc Button to submit source code; all props will be passed down to `<Button />`
 * @param {String} code - source code
 * @param {String} ext - file extension of source code
 * @param {String} fileName - file name WITHOUT extension. Concat with `ext`.
 * @return {React.Component} - a `<Button />` element that submits `onClick`
 */

class SubmitButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitting : false
        }
    }
    render() {
        return (
            <Button {...this.props}
                disabled={this.props.disabled || this.state.submitting}
                variant="contained"
                color="primary"
                onClick={() => {
                    this.setState({ submitting : true })
                    submit(this.props.code, this.props.fileName, this.props.ext,
                        (ok) => {
                            this.setState({
                                submitting : false
                            });
                            window.hestia.pushNotification(ok 
                                ? 'Successfully submitted'
                                : 'Error submitting solution.')
                        })
                }}>
                {this.state.submitting 
                    ? <CircularProgress size={20}/>
                    : this.props.children}
            </Button>
        )
    }
}

export default SubmitButton