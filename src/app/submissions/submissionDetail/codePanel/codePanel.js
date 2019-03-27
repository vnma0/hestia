import React from "react";
import downloadSubmission from "../../stub/download.js";
import { CardContent, Typography, CircularProgress } from "@material-ui/core";
import AceEditor from "react-ace";

/**
 * @name CodePanel
 * @param {String} id : Submission ID to get
 */

export default class CodePanel extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            code: undefined,
            ref: React.createRef(),
            loading : true
        };
    }

    componentDidMount() {
        if (this.props.id && this.props.id.constructor === String) {
            downloadSubmission(this.props.id).then((code) => {
                this.setState({
                    code: code,
                    loading: false
                });
            });
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return (this.state.code !== nextState.code || this.s)
    // }

    componentDidUpdate() {
        this.componentDidMount();
    }

    render() {
        return (
            <>
                {this.state.code !== undefined ? (
                    <CardContent>
                        <AceEditor
                            value={this.state.code}
                            readOnly
                            ref={this.state.ref}
                            width="100%"
                        />
                    </CardContent>
                ) : (
                    this.state.loading
                        ? <div align="center">
                            <CardContent>
                                <Typography variant="h6">
                                    Loading...
                                </Typography>
                            </CardContent>
                            <CircularProgress size={30} />
                        </div> : <CardContent>
                            <Typography variant="h6">
                                No code is available.
                            </Typography>
                            <Typography component="p">
                                What are you expecting?
                            </Typography>
                        </CardContent>
                )}
            </>
        );
    }
}
