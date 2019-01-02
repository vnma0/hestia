import React from 'react'
import { Button } from '@material-ui/core'

/**
 * @name UploadButton
 * @description The upload button, currently not working
 * Button Api: https://material-ui.com/api/button/
 */

class UploadButton extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    //handeClick
    handleClick() {
        alert('Upload function executed!')
    }
    //render
    render() {
        return (
            <Button variant="flat" onClick={this.handleClick}>
                {this.props.children}
            </Button>
        )
    }
}

export default UploadButton
