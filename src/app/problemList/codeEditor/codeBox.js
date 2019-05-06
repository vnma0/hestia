import React, { Suspense } from 'react';
import { AppBar, Grid, Divider } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { withGlobalState } from 'react-globally';

import SubmitButton from './submitButton.js';
import LangSelection from './langSelection.js';
import ThemeSelector from './themeSelector.js';
import UploadButton from './uploadButton.js';

import { LoadingIndicator } from '../problemLazyAssistance.js';
import { withNamespaces } from 'react-i18next';

const CodeEditor = React.lazy(() => import('./codeEditor.js'));

var reader = new FileReader();

const byte_limit = 15 * 1024;

class CodeBox extends React.PureComponent {
    constructor(props) {
        super(props);

        let code = '';
        // check for username
        if (localStorage.getItem('username') === this.props.globalState.username)
            // if match, restore
            code = localStorage.getItem('code');
        else {
            // else, clear everything and start as new
            localStorage.setItem('username', this.props.globalState.username);
            localStorage.setItem('code', '');
        }

        this.state = {
            code: code,
            // reload code from localStorage
            langId: 0,
            submitting: false,
            fileLoading: false,
            editorHeight: window.innerHeight - 180,

            themeId: 3,
            theme: localStorage.getItem('ace_lang') || 'monokai'
            // Monokai, as declared from './themeSelector.js'
        };

        this.catcherRef = React.createRef();
        this.updateEditorHeight = this.updateEditorHeight.bind(this);
        this.processFile = this.processFile.bind(this);
        this.inputEventFire = this.inputEventFire.bind(this);
    }
    //Add listener to window resize
    componentDidMount() {
        this.updateEditorHeight();
        window.addEventListener('resize', this.updateEditorHeight);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateEditorHeight);
    }

    //update editor height when resize window
    updateEditorHeight() {
        this.setState({
            editorHeight:
                window.innerHeight -
                this.refs.optionTab.clientHeight -
                document.getElementById('appBar').offsetHeight -
                77.5
        });
    }

    inputEventFire() {
        this.setState({ fileLoading: true });
        this.catcherRef.current.click();
    }

    enable = () => this.setState({ fileLoading: false });

    processFile(file) {
        const { t } = this.props;
        if (!(file instanceof Blob) && !(file instanceof File))
            // non-File input, hmm..
            return this.enable();
        if (file.size >= byte_limit) {
            // 15 KiB limit
            this.enable();
            return this.props.enqueueSnackbar(t('problems.codeEditor.error.tooLarge'), { variant: 'error' });
        }
        reader.onload = () => {
            this.setState({
                code: reader.result,
                fileLoading: false
            });
        };
        this.setState({ fileLoading: true });
        reader.readAsText(file);
    }

    render() {
        const { t } = this.props;
        return (
            <>
                <Divider light variant='inset' />
                <AppBar id='appBar' position='static' color='default'>
                    <div ref='optionTab' style={{ margin: '10px 10px', maxHeight: '100%' }}>
                        <Grid container spacing={8} alignItems='center'>
                            <Grid item>
                                <UploadButton
                                    onClick={this.inputEventFire}
                                    disabled={this.state.fileLoading}
                                    variant='contained'
                                />
                            </Grid>
                            <Grid item>
                                <ThemeSelector
                                    theme={this.state.theme}
                                    choice={this.state.themeId}
                                    onChange={(id, theme) => this.setState({ themeId: id, theme: theme })}
                                />
                            </Grid>
                            <Grid item style={{ flexGrow: 1 }}>
                                <LangSelection
                                    ext={this.props.ext}
                                    choice={this.state.langId}
                                    handleChange={id => this.setState({ langId: id })}
                                />
                            </Grid>
                            <Grid item>
                                <SubmitButton
                                    disabled={
                                        this.state.submitting ||
                                        this.state.fileLoading ||
                                        this.state.code === '' ||
                                        this.state.langId === null ||
                                        this.props.ext.size === 0
                                    }
                                    fileName={this.props.submitFileName}
                                    code={this.state.code}
                                    ext={this.props.ext[this.state.langId] || ''}
                                    onSubmit={() =>
                                        this.setState({
                                            submitting: true
                                        })
                                    }
                                    onSubmitDone={() =>
                                        this.setState({
                                            submitting: false
                                        })
                                    }>
                                    {t('problems.codeEditor.control.submitButton')}
                                </SubmitButton>
                            </Grid>
                        </Grid>
                    </div>
                </AppBar>
                <div
                    style={
                        this.state.submitting || this.state.fileLoading ? { opacity: 0.4, pointerEvents: 'none' } : {}
                    }>
                    <Suspense fallback={<LoadingIndicator />}>
                        {/* no need to catch, we already have an error boundary above */}
                        <CodeEditor
                            theme={this.state.theme}
                            readOnly={this.state.submitting || this.state.fileLoading}
                            ext={this.props.ext[this.state.langId]}
                            update={code => {
                                if (code.length <= byte_limit) {
                                    this.setState({ code: code });
                                    // enforce source limit even for editor

                                    localStorage.setItem('code', code);
                                    // save code in localStorage in
                                    // case of any failure
                                }
                            }}
                            code={this.state.code}
                            editorHeight={this.state.editorHeight}
                        />
                    </Suspense>
                </div>
                <input
                    type='file'
                    onChange={event => this.processFile(event.target.files[0])}
                    ref={this.catcherRef}
                    style={{ display: 'none' }}
                    onClick={event => {
                        event.target.value = null;
                        if (event.target.files.length < 1) this.enable();
                    }}
                />
            </>
        );
    }
}

export default withNamespaces()(withGlobalState(withSnackbar(CodeBox)));
