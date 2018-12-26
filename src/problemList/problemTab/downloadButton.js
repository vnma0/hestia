import React from 'react';
import { Button } from '@material-ui/core'

/**
 * Button Api: https://material-ui.com/api/button/
 */

class downloadButton extends React.Component {
    handleClick() {
        alert("Button pressed");
    }

    render() {
        return (
            <Button
                    size="large"
                    variant="contained"
                    onClick={() => this.handleClick}
                >
                    {this.props.children}
            </Button>
        )
    }
}

export default downloadButton;