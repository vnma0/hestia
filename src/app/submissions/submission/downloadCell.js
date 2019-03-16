import React from 'react'; import PropTypes from 'prop-types'
import { saveAs } from 'file-saver';
import { IconButton, CircularProgress } from '@material-ui/core';
import CloudDownload from '@material-ui/icons/CloudDownload'
import Warning from '@material-ui/icons/Warning'

import downloadSubmission from '../stub/download.js'

export default class SubmissionDownloadButton extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            inProgress : false,
            error : false
        }
    }

    static propTypes = {
        id: PropTypes.string.isRequired
    }

    loadFile(id) {
        this.setState({ inProgress : true });
        downloadSubmission(id)
            .then(sourceCode => {
                if (sourceCode.length > 0)
                    saveAs(new Blob([String(sourceCode)], {type: "text/plain;charset=utf-8"}), String(id))
                else
                    throw new Error('Failed to fetch source code properly')
                this.setState({ inProgress : false })
            })
            .catch(() => {
                this.setState({ inProgress : false, error: true });
                setTimeout(() => this.setState({ error: false }), 1000)
            })
    }

    render() {
        return (
            <IconButton disabled={this.state.inProgress || this.state.error}
                onClick={() => this.loadFile(this.props.id)}>
                {this.state.inProgress
                    ? <CircularProgress size={20}/>
                    : (this.state.error ? <Warning nativeColor="red" /> : <CloudDownload />)}
            </IconButton>
        )
    }
}