import React from 'react'
import { AppBar, Grid } from '@material-ui/core'

import CodeEditor from './codeEditor'
// import UploadButton from './uploadButton'
import SubmitButton from './submitButton'
// import ConfirmButton from './confirmButton'
import LangSelection from './langSelection'
// import FileDisplay from './fileDisplay'

class CodeBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fileName: undefined,
            fileCode: '',
            code: '',
            currentLangId: 0,
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
            <div style={{ flexGrow: 1 }}>
                <AppBar position="static" color="default">
                    <div id="optionTab" style={{ margin: '1% 1%' }}>
                        <Grid container spacing={8} alignItems="center">
                            <Grid item style={{
                                flexGrow: 1
                            }}>
                                <LangSelection
                                    displayLang={this.props.displayLang || []}
                                    handleChange={this.handleLangChange}>
                                    Language : {' '}
                                    {this.props.displayLang[this.state.currentLangId]}
                                </LangSelection>
                            </Grid>
                            {/* <Grid item>
                                <UploadButton sendFile={this.handleFileChange}>
                                    Upload file
                                </UploadButton>
                            </Grid>
                            <Grid item
                                style={{
                                    flexGrow: 1,
                                }} >
                                <FileDisplay fileName={this.state.fileName}>
                                    No file chosen
                                </FileDisplay>
                            </Grid>
                            <Grid item>
                                <ConfirmButton confirm={this.handleConfirm} />
                            </Grid> */}
                            <Grid item>
                                <SubmitButton
                                    disabled={this.state.code === '' ||
                                        this.state.currentLangId === null}
                                    fileName={this.props.submitFileName} code={this.state.code}
                                    ext={this.props.ext[this.state.currentLangId]}>
                                    Submit
                                </SubmitButton>
                            </Grid>
                        </Grid>
                    </div>
                    <CodeEditor
                        ext={this.props.ext[this.state.currentLangId]}
                        update={this.handleUpdate}
                        code={this.state.code} />
                </AppBar>
            </div>
        )
    }
}

export default CodeBox
