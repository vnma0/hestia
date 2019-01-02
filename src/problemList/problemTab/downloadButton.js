import React from 'react'
import { Button } from '@material-ui/core'

/**
 * @name DownloadButton
 * @description The Download Button
 * Button Api: https://material-ui.com/api/button/
 */

class DownloadButton extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    //handeClick
    handleClick() {
        alert('Download function excuted!')
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

export default DownloadButton
