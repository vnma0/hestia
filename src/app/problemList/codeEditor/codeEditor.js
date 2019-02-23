import React from 'react'
import CodeMirror from 'react-codemirror'
import PropTypes from 'prop-types'
const mime = require('mime')
require('codemirror/lib/codemirror.css')
require('codemirror/mode/clike/clike')

/**
 * @name CodeEditor
 * @param {String} `ext` - current language's source file extension
 * @param {String} `update` - function to execute when content is changed.
 *                            Signature : `function (newValue : String)`
 * @param {Boolean} `readOnly` - Whether the editor's value should be locked to read-only.
 * @param {String} `code` - Editor's value.
 * @returns {React.Component} - a `<CodeMirror />` component
 * @author minhducsun2002
 */

class CodeEditor extends React.Component {
    render() {
        return (
            <CodeMirror
                options={{
                    mode: mime.getType(this.props.ext),
                    tabSize: 4,
                    lineNumbers: true,
                    autofocus: true,
                    undoDepth: 200,
                    scrollbarStyle: null,
                    readOnly: this.props.readOnly
                }}
                value={this.props.code}
                onChange={this.props.update}
            />
        )
    }
}

CodeEditor.propTypes = {
    ext: PropTypes.string,
    readOnly: PropTypes.bool.isRequired,
    update: PropTypes.func,
    code: PropTypes.string
}

export default CodeEditor
