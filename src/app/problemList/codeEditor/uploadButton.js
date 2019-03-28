import React from 'react';
import { Button, Tooltip } from '@material-ui/core';
import CloudUpload from '@material-ui/icons/CloudUpload';

export default class UploadButton extends React.PureComponent {
    render() {
        return (
            <Tooltip title="Load a file into the editor. Overwrite existing content.">
                <Button {...this.props}>
                    <CloudUpload />
                </Button>
            </Tooltip>
        )   
    }
}