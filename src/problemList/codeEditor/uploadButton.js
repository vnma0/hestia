import React from 'react'
import { Button, Grid } from '@material-ui/core'
import ArrowDownward from '@material-ui/icons/ArrowDownward'

/**
 * @name UploadButton
 * @description The upload button, currently not working
 */

class UploadButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fileUploaderRef: React.createRef(),
            fileValue: null,
        }
        this.handleClick = this.handleClick.bind(this)
        this.sendFile = this.sendFile.bind(this)
    }
    //handeClick
    handleClick() {
        this.state.fileUploaderRef.current.click()
        this.setState({
            fileValue: this.fileUploaderRef.current,
        })
    }
    //send read file to editor
    sendFile() {
        var fileInfo = this.state.fileValue;
        alert(fileInfo);
        this.callBack(fileInfo);
    }
    //render
    render() {
        return (
            <>
                <Grid container spacing={8} alignItems="flex-start">
                    <Grid item>
                        <input
                            type="file"
                            id="upload"
                            ref={this.state.fileUploaderRef}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="upload">
                            <Button onClick={this.handleClick}>
                                {this.props.children}
                            </Button>
                        </label>
                    </Grid>
                    <Grid item>
                        <Button OnClick={this.sendFile}>
                            <ArrowDownward />
                        </Button>
                    </Grid>
                </Grid>
            </>
        )
    }
}

export default UploadButton
