import React from 'react';
import downloadSubmission from '../stub/download.js';
import { CardContent, Typography } from '@material-ui/core';
import AceEditor from 'react-ace';

export default class CodePanel extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            code : ''
        }
    }

    componentDidMount() {
        if (this.props.id && this.props.id.constructor === String) {
            downloadSubmission(this.props.id).then((code) => {
                this.setState({
                    code : code
                })
            })
        }
    }

    render() {
        return (
            <>
                {this.state.code.length > 0
                    ? <CardContent>
                        <AceEditor value={this.state.code} readOnly/>
                    </CardContent>
                    : <CardContent>
                        <Typography variant="h6">
                            No code is available.
                        </Typography>
                        <Typography component="p">
                            What are you expecting?
                        </Typography>
                    </CardContent>}
            </>
        )
    }
}