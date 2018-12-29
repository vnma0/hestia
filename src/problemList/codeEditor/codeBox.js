import React from 'react'
import LangSelection from './langSelection'
import CodeEditor from './codeEditor'

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
                <LangSelection callbackFromParent={this.langCallback} />
                Parent Lang: {this.state.currentLang}
                <CodeEditor lang={this.state.currentLang}/>
            </div>
        )
    }
}

export default CodeBox
