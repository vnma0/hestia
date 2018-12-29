import React from 'react';
import { Button } from '@material-ui/core'

/**
 * Button Api: https://material-ui.com/api/button/
 */

class downloadButton extends React.Component {
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
    }
    //handeClick
    handleClick() {
        alert("Button pressed");
    }
    //render
    render() {
        return (
            <Button
                    size="large"
                    variant="contained"
                    fullWidth="true" //enable fullwidth
                    onClick={this.handleClick}
                >
                    {this.props.children}
            </Button>
        )
    }
}

export default downloadButton;