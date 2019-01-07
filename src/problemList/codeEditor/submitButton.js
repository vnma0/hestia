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
        alert(
            final !== ''
                ? this.props.lang !== null
                    ? 'Submitted: \n' + String(final)
                    : 'No language chosen, please pick a language.'
                : 'Input is empty.'
        )
    }

    render() {
        return (
            <Button
                variant="contained"
                fullWidth={true}
                onClick={this.handleClick}
            >
                {this.props.children}
            </Button>
        )
    }
}

export default SubmitButton
