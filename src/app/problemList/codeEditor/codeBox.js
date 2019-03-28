import React from 'react'
import { AppBar, Grid } from '@material-ui/core'

import CodeEditor from './codeEditor.js'
import SubmitButton from './submitButton.js'
import LangSelection from './langSelection.js'
import UploadButton from './uploadButton.js';

import { pushNotification } from '../../notifier/notify.js';

import friendlyLang from '../../../strings/lang.json';

var reader = new FileReader();

class CodeBox extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            code: '',
            langId: 0,
            submitting: false,
            fileLoading: false
        }

        this.catcherRef = React.createRef();

        this.processFile = this.processFile.bind(this);
        this.inputEventFire = this.inputEventFire.bind(this);
    }

    inputEventFire() {
        this.catcherRef.current.click();
    }

    processFile(file) {
        if (!file instanceof Blob && !file instanceof File)
            // non-File input, hmm...
            if (typeof pushNotification === 'function')
                return pushNotification('Invalid file supplied');
        reader.onload = () => {
            this.setState({
                code : reader.result,
                fileLoading: false
            })
        };
        reader.onloadstart = () => this.setState({ fileLoading: true });
        reader.readAsText(file);
    }

    render() {
        return (
            <div style={{ flexGrow: 1 }}>
                <AppBar position="static" color="default">
                    <div id="optionTab" style={{ margin: '1% 1%' }}>
                        <Grid container spacing={8} alignItems="center">
                            <Grid item>
                                <UploadButton
                                    onClick={this.inputEventFire}
                                    disabled={this.state.fileLoading}
                                    variant="contained"/>
                            </Grid>
                            <Grid item style={{ flexGrow: 1 }} >
                                <LangSelection
                                    displayLang={this.props.displayLang || []}
                                    handleChange={(id) => this.setState({ langId: id })}>
                                    {friendlyLang[
                                        String(this.props.displayLang[this.state.langId])
                                            .replace('.', '')
                                            .toLowerCase()
                                    ]}
                                </LangSelection>
                            </Grid>
                            <Grid item>
                                <SubmitButton
                                    disabled={
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
                                    })}
                                    onSubmitDone={() => this.setState({
                                        submitting: false
                                    })}
                                >
                                    Submit
                                </SubmitButton>
                            </Grid>
                        </Grid>
                    </div>
                <div style={(
                    (this.state.submitting || this.state.fileLoading) ? 
                    { opacity: 0.4, pointerEvents: 'none' } : {}
                )}>
                        <CodeEditor
                            readOnly={this.state.submitting || this.state.fileLoading}
                            ext={this.props.ext[this.state.langId]}
                            update={(code) => this.setState({ code: code })}
                            code={this.state.code}
                        />
                    </div>
                </AppBar>
                <input type="file" onChange={(event) => this.processFile(event.target.files[0])}
                    ref={this.catcherRef} style={{ display: 'none' }}/>
            </div>
        )
    }
}

export default CodeBox
