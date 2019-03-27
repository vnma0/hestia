import React from 'react'
import { AppBar, Grid, Divider } from '@material-ui/core'

import CodeEditor from './codeEditor'
import SubmitButton from './submitButton'
import LangSelection from './langSelection'

import friendlyLang from '../../../strings/lang.json';

class CodeBox extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            fileName: undefined,
            fileCode: '',
            code: '',
            currentLangId: 0,
            submitting: false
        }

        this.handleFileChange = this.handleFileChange.bind(this)
        this.handleConfirm = this.handleConfirm.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleLangChange = this.handleLangChange.bind(this)
    }
    handleLangChange = newLang => {
        this.setState({ currentLangId: newLang })
    }

    handleUpdate = code => {
        this.setState({ code: code })
    }

    handleFileChange = (file, fileName) => {
        this.setState({ fileCode: file, fileName: fileName })
    }

    handleConfirm = () => {
        if (this.state.fileCode !== '')
            // this.setState({
            //     code: this.state.fileCode,
            // })
            this.handleUpdate(this.state.fileCode)
    }
    render() {
        return (
            <>
                <Divider light variant="inset" />
                <AppBar position="static" color="default" elevation={0}>
                    <div id="optionTab" style={{ margin: '1% 1%' }}>
                        <Grid container spacing={8} alignItems="center">
                            <Grid item
                                style={{ flexGrow: 1 }} >
                                <LangSelection
                                    displayLang={this.props.displayLang || []}
                                    handleChange={this.handleLangChange}>
                                    {friendlyLang[
                                        String(this.props.displayLang[this.state.currentLangId])
                                            .replace('.', '')
                                            .toLowerCase()
                                    ]}
                                </LangSelection>
                            </Grid>
                            <Grid item>
                                <SubmitButton
                                    disabled={
                                        this.state.code === '' ||
                                        this.state.currentLangId === null ||
                                        this.props.ext.size === 0
                                    }
                                    fileName={this.props.submitFileName}
                                    code={this.state.code}
                                    ext={this.props.ext[this.state.currentLangId] || ''}
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
                </AppBar>
                <div style={(
                    this.state.submitting ? 
                    { opacity: 0.4, pointerEvents: 'none', height: '100%' } : { height: '100%' }
                )}>
                        <CodeEditor
                            readOnly={this.state.submitting}
                            ext={this.props.ext[this.state.currentLangId]}
                            update={this.handleUpdate}
                            code={this.state.code}
                        />
                </div>
            </>
        )
    }
}

export default CodeBox
