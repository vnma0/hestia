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
    }
    //render
    render() {
        return (
            <Button {...this.props}
                size="large"
                variant="contained"
                fullWidth={true}
                href={this.props.link}
                target="_blank"
                onClick={this.handleClick}
            >
                {this.props.children}
            </Button>
        )
    }
}

export default DownloadButton;
