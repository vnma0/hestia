import React from 'react'
import { Typography } from '@material-ui/core'

class FileDisplay extends React.Component {
    render() {
        return (
            <Typography variant="subtitle1">
                {'File: ' +
                    (this.props.fileName !== undefined
                        ? this.props.fileName
                        : 'No file chosen')}
            </Typography>
        )
    }
}
export default FileDisplay
