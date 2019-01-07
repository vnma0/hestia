import React from 'react'
import { Button } from '@material-ui/core'

/**
 * @name SubmitButton
 * Button Api: https://material-ui.com/api/button/
 * Input Api: https://material-ui.com/api/input/
 */

class SubmitButton extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        let final = this.props.code
        console.log('see this ', final)
        alert('Submitted: \n' + String(final))
    }

    render() {
        return (
            <Button
                disabled={this.props.disabled}
                variant="contained"
                color="primary"
                style={{
                    // backgroundColor: this.props.disabled ? '' : '#1af46a',
                    // color: this.props.disabled ? '' : 'white',
                }}
                onClick={this.handleClick}
            >
                {this.props.children}
            </Button>
        )
    }
}

export default SubmitButton
