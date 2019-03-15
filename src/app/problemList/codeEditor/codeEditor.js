import React from 'react'
import PropTypes from 'prop-types'
import AceEditor from 'react-ace';

import parseExt from './extParser.js';

require('brace/mode/c_cpp'); require('brace/mode/java');
require('brace/mode/javascript'); require('brace/mode/python');
require('brace/mode/csharp'); require('brace/mode/css');
require('brace/mode/sass')

/**
 * @name CodeEditor
 * @param {String} `ext` - current language's source file extension
 * @param {String} `update` - function to execute when content is changed.
 *                            Signature : `function (newValue : String)`
 * @param {Boolean} `readOnly` - Whether the editor's value should be locked to read-only.
 * @param {String} `code` - Editor's value.
 * @returns {React.Component} - a `<AceEditor />` component
 * @author minhducsun2002
 */

class CodeEditor extends React.PureComponent {
    render() {
        return (
            <AceEditor
                defaultValue="Your code here"
                mode={parseExt(this.props.ext.replace('.', '').toLowerCase())}
                value={this.props.code}
                onChange={this.props.update}
                width='100%'
                readOnly={this.props.readOnly}
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
