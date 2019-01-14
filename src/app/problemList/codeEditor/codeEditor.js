import React from 'react'
import CodeMirror from 'react-codemirror';
require('codemirror/lib/codemirror.css');
require('codemirror/mode/clike/clike');

/**
 * @name CodeEditor
 * @param {String} currentLang - current language to highlight
 */

class CodeEditor extends React.Component {
    render() {
        return <CodeMirror options={{
            mode: 'text/x-c'
        }} value={this.props.code} onChange={this.props.update} />
    }
}

export default CodeEditor;