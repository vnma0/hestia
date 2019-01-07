import React from 'react'
import CodeEditor from './codeEditor'
import { Grid, AppBar } from '@material-ui/core'
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
            lang: null,
        }
        this.onFileChange = this.onFileChange.bind(this)
        this.onConfirm = this.onConfirm.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleLangChange = this.handleLangChange.bind(this)
    }
    handleLangChange = newLang => {
        this.setState({ lang: newLang })
    }
    //update editor
    handleUpdate = code => {
        this.setState({ code: code })
        console.log('Change ', this.state.code)
    }
    //after picking a file
    onFileChange = (file, fileName) => {
        console.log(fileName)
        this.setState({ fileCode: file, fileName: fileName })
    }
    //on pressing the ConfirmButton
    onConfirm = () => {
        if (this.state.fileCode !== '')
            if (window.confirm('Confirm?')) {
                this.setState({
                    code: this.state.fileCode,
                })
            }
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
                                <LangSelection onChange={this.handleLangChange}>
                                    Language: {this.state.lang ? this.state.lang : "None"}
                                </LangSelection>
                            </Grid>
                            <Grid item>
                                <UploadButton sendFile={this.onFileChange}>
                                    Upload file
                                </UploadButton>
                            </Grid>
                            <Grid item>
                                <ConfirmButton confirm={this.onConfirm} />
                            </Grid>
                            <Grid
                                item
                                style={{
                                    flexGrow: 1,
                                }}
                            >
                                <FileDisplay fileName={this.state.fileName} />
                            </Grid>
                            <Grid item>
                                <SubmitButton
                                    disabled={
                                        this.state.code === '' ||
                                        this.state.lang === null
                                    }
                                    code={this.state.code}
                                    lang={this.state.lang}
                                >
                                    Submit
                                </SubmitButton>
                            </Grid>
                        </Grid>
                    </div>
                    <CodeEditor
                        lang={this.state.currentLang}
                        update={this.handleUpdate}
                        code={this.state.code}
                    />
                </AppBar>
            </div>
        )
    }
}

export default CodeBox
