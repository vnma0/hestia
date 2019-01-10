import React from 'react'
import CodeEditor from './codeEditor'
import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import UploadButton from './uploadButton'
import SubmitButton from './submitButton'
import ConfirmButton from './confirmButton'
import LangSelection from './langSelection'
import FileDisplay from './fileDisplay'

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
        console.log(fileName)
        this.setState({ fileCode: file, fileName: fileName })
    }

    handleConfirm = () => {
        if (this.state.fileCode !== '')
            this.setState({
                code: this.state.fileCode,
            })
    }
    render() {
        return (
            <div
                style={{
                    flexGrow: 1,
                }}
            >
                <AppBar position="static" color="default">
                    <div id="optionTab" style={{ margin: '1% 1%' }}>
                        <Grid container spacing={8} alignItems="center">
                            <Grid item>
                                <LangSelection
                                    lang={this.props.lang}
                                    handleChange={this.handleLangChange}
                                >
                                    Language:{' '}
                                    {
                                        this.props.lang[
                                            this.state.currentLangId
                                        ].display
                                    }
                                </LangSelection>
                            </Grid>
                            <Grid item>
                                <UploadButton sendFile={this.handleFileChange}>
                                    Upload file
                                </UploadButton>
                            </Grid>
                            <Grid
                                item
                                style={{
                                    flexGrow: 1,
                                }}
                            >
                                    <FileDisplay fileName={this.state.fileName}>
                                        No file chosen
                                    </FileDisplay>
                            </Grid>
                            <Grid item>
                                <ConfirmButton confirm={this.handleConfirm} />
                            </Grid>
                            <Grid item>
                                <SubmitButton
                                    disabled={
                                        this.state.code === '' ||
                                        this.state.currentLangId === null
                                    }
                                    submitFileName={this.props.submitFileName}
                                    extension={
                                        this.props.lang[
                                            this.state.currentLangId
                                        ].extension
                                    }
                                    code={this.state.code}
                                    currentLangId={this.state.currentLangId}
                                >
                                    Submit
                                </SubmitButton>
                            </Grid>
                        </Grid>
                    </div>
                    <CodeEditor
                        currentLang={
                            this.props.lang[this.state.currentLangId].name
                        }
                        update={this.handleUpdate}
                        code={this.state.code}
                    />
                </AppBar>
            </div>
        )
    }
}

CodeBox.defaultProps = {
    lang: [
        { display: 'C++', name: 'cpp', extension: ['cpp'] },
        { display: 'JavaScript', name: 'javascript', extension: ['js'] },
        { display: 'Python', name: 'python', extension: ['py'] },
        { display: 'Java', name: 'java', extension: ['java'] },
        { display: 'Typescript', name: 'typescript', extension: ['ts'] },
    ],
}

export default CodeBox
