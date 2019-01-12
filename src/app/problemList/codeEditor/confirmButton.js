import React from 'react'
import { Button, Tooltip } from '@material-ui/core'
import Done from '@material-ui/icons/Done'

/**
 * @name ConfirmButton
 * @description Confirm button, used to confirm sending file to editor
 */

class ConfirmButton extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    //handeClick
    handleClick() {
        this.props.confirm()
    }
    //render
    render() {
        return (
            <>
                <Tooltip title="Send file to editor">
                    <Button variant="contained" onClick={this.handleClick}>
                        <Done />
                    </Button>
                </Tooltip>
            </>
        )
    }
}

export default ConfirmButton