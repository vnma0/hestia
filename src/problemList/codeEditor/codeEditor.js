import React from 'react'
import MonacoEditor from 'react-monaco-editor'

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

    }


    render() {
        const { code } = this.state.code
        const options = {
            selectOnLineNumbers: true,
        }
        return (
            <>
                <MonacoEditor
                    height="500"
                    language={this.state.lang}
                    theme="vs-dark"
                    value={code}
                    options={options}
                    onChange={this.onChange}
                    editorDidMount={this.editorDidMount}
                />
                {/*Editor Language: {this.state.lang}*/}
            </>
        )
    }
}

export default CodeEditor

// this.editorDidMount = this.editorDidMount.bind(this)
// this.onChange = this.onChange.bind(this)

// editorDidMount(editor, monaco) {
//     console.log('editorDidMount', editor)
//     this.setState({
//         editorComponent: editor,
//     })
//     editor.layout()
//     editor.focus()
// }
// onChange(newValue, e) {
//     console.log('onChange', newValue, e)
// }