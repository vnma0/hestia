import React from 'react';
import { Button, Tooltip, CircularProgress } from '@material-ui/core';
import CloudUpload from '@material-ui/icons/CloudUpload';

export default class UploadButton extends React.PureComponent {
    render() {
        return (
            <Tooltip title="Load a file into the editor. Overwrite existing content.">
                <Button {...this.props}>
                    {this.props.disabled
                        ? <CircularProgress size={20} />
                        : <CloudUpload style={{ width: 20, height: 20 }}/>}
                    {/* if disabled, it means a file is being loaded */}
                </Button>
            </Tooltip>
        )   
    }
}