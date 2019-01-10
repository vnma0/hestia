import React from 'react'
import Typography from '@material-ui/core/Typography'

class FileDisplay extends React.Component {
    render() {
        return (
            <Typography style={{ flexGrow: 1 }} variant="subtitle1">
                {'File: ' +
                    (this.props.fileName !== undefined
                        ? this.props.fileName
                        : this.props.children)}
            </Typography>
        )
    }
}
export default FileDisplay
