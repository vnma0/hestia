import React from 'react'
import MonacoEditor from 'react-monaco-editor'
import * as monaco from 'monaco-editor'; //For syntax highlighting, do not delete

/**
 * @name CodeEditor
 * Monaco Api: https://microsoft.github.io/monaco-editor/api/index.html
 * Put in option: https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html
 * React monaco editor: https://github.com/superRaytin/react-monaco-editor
 */

class CodeEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            code: '',
            lang: null,
            editorComponent: undefined,
        }
        this.editorDidMount = this.editorDidMount.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    editorDidMount(editor, monaco) {
        //console.log('editorDidMount', editor)
        this.setState({
            editorComponent: editor,
        })
        editor.layout()
        editor.focus()
    }
    onChange(newValue, e) {
        console.log('onChange', newValue,"spaced", e);
        this.props.update(newValue);
    }

    render() {
        console.log(this.props.code)
        const options = {
            selectOnLineNumbers: true,
        }
        return (
            <>
                <MonacoEditor
                    height="500"
                    language={this.props.lang}
                    theme="vs-dark"
                    value={this.props.code}
                    options={options}
                    onChange={this.onChange}
                    editorDidMount={this.editorDidMount}
                />
            </>
        )
    }
}

export default CodeEditor
