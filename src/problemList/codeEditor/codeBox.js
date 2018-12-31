import React from 'react'
import LangSelection from './langSelection'
import CodeEditor from './codeEditor'
import { Grid } from '@material-ui/core'
import UploadButton from './uploadButton'
import SubmitButton from './submitButton'

class CodeBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentLang: 'cpp',
        }
    }

    langCallback = selectedLang => {
        this.setState({
            currentLang: selectedLang,
        })
    }

    render() {
        return (
            <div
                style={{
                    flexGrow: 1,
                }}
            >
                <Grid container spacing={8} alignItems="flex-start">
                    <Grid item>
                        <LangSelection callbackFromParent={this.langCallback} />
                    </Grid>
                    <Grid item>
                        <UploadButton>Upload file</UploadButton>
                    </Grid>
                </Grid>
                {/*Parent Lang: {this.state.currentLang}*/}
                <CodeEditor lang={this.state.currentLang} />
                <SubmitButton>Submit</SubmitButton>
            </div>
        )
    }
}

export default CodeBox
