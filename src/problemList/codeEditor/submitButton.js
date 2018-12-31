import React from 'react'
import { Button } from '@material-ui/core'

/**
 * Button Api: https://material-ui.com/api/button/
 */

class SubmitButton extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    //handeClick
    handleClick() {
        alert('Submit function executed!')
    }
    //render
    render() {
        return (
            <Button
                variant="contained"
                fullWidth="true"
                onClick={this.handleClick}
            >
                {this.props.children}
            </Button>
        )
    }
}

export default SubmitButton
