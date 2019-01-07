import React from 'react'
import { Button } from '@material-ui/core'
import Done from '@material-ui/icons/Done'

/**
 * @name ConfirmButton
 * @description Confirm button, used to confirm sending file to editor
 */

class ConfirmButton extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick=this.handleClick.bind(this);
    }
    //handeClick
    handleClick() {
        this.props.confirm();
    }
    //render
    render() {
        return (
            <>
                <Button onClick={this.handleClick}>
                    <Done/>
                </Button>
            </>
        )
    }
}

export default ConfirmButton;
