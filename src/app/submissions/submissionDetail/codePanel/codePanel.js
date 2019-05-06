import React from 'react';
import downloadSubmission from '../../stub/download.js';
import { CardContent, Typography, CircularProgress } from '@material-ui/core';
import AceEditor from 'react-ace';
import { withGlobalState } from 'react-globally';
import { withSnackbar } from 'notistack';
import { withNamespaces } from 'react-i18next';

/**
 * @name CodePanel
 * @param {String} id : Submission ID to get
 */

class CodePanel extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            code: undefined,
            ref: React.createRef(),
            loading: true
        };
    }

    componentDidMount() {
        const { t } = this.props;
        if (this.props.id && this.props.id.constructor === String) {
            downloadSubmission(this.props.id)
                .then(code => {
                    this.setState({
                        code: code,
                        loading: false
                    });
                })
                .catch(() => {
                    this.props.enqueueSnackbar(t('submissions.error.source'));
                    this.setState({ loading: false });
                });
        }
    }

    componentDidUpdate() {
        this.componentDidMount();
    }

    render() {
        const { t } = this.props;
        return (
            <>
                {this.state.code !== undefined ? (
                    <CardContent>
                        <AceEditor value={this.state.code} readOnly ref={this.state.ref} width='100%' />
                    </CardContent>
                ) : this.state.loading ? (
                    <div align='center'>
                        <CardContent>
                            <Typography variant='h6'>{t('submissions.details.code.panel.loading')}</Typography>
                        </CardContent>
                        <CircularProgress size={30} />
                    </div>
                ) : (
                    <CardContent>
                        <Typography variant='h6'>
                            {
                                t('submissions.details.code.panel.noCode', {
                                    returnObjects: true
                                })[0]
                            }
                        </Typography>
                        <Typography component='p'>
                            {
                                t('submissions.details.code.panel.noCode', {
                                    returnObjects: true
                                })[1]
                            }
                        </Typography>
                    </CardContent>
                )}
            </>
        );
    }
}

export default withNamespaces()(withGlobalState(withSnackbar(CodePanel)));
