import React from "react";
import PropTypes from "prop-types";
import AceEditor from "react-ace";

import parseExt from "./extParser.js";

import "brace/mode/ada";
import "brace/mode/c_cpp";
import "brace/mode/clojure";
import "brace/mode/cobol";
import "brace/mode/coffee";
import "brace/mode/coldfusion";
import "brace/mode/csharp";
import "brace/mode/d";
import "brace/mode/dart";
import "brace/mode/eiffel";
import "brace/mode/ejs";
import "brace/mode/erlang";
import "brace/mode/fortran";
import "brace/mode/golang";
import "brace/mode/groovy";
import "brace/mode/haskell";
import "brace/mode/haxe";
import "brace/mode/java";
import "brace/mode/javascript";
import "brace/mode/jsx";
import "brace/mode/julia";
import "brace/mode/kotlin";
import "brace/mode/lisp";
import "brace/mode/livescript";
import "brace/mode/lua";
import "brace/mode/matlab";
import "brace/mode/objectivec";
import "brace/mode/pascal";
import "brace/mode/php";
import "brace/mode/powershell";
import "brace/mode/python";
import "brace/mode/r";
import "brace/mode/ruby";
import "brace/mode/rust";
import "brace/mode/scala";
import "brace/mode/swift";
import "brace/mode/typescript";

/**
 * @name CodeEditor
 * @param {String} ext: current language's source file extension
 * @param {String} update: function to execute when content is changed.
 *                            Signature : `function (newValue : String)`
 * @param {Boolean} readOnly: Whether the editor's value should be locked to read-only.
 * @param {String} code: Editor's value.
 * @returns {React.Component} - a `<AceEditor />` component
 * @author minhducsun2002
 */

class CodeEditor extends React.PureComponent {
    render() {
        return (
            <AceEditor
                defaultValue="Your code here"
                mode={parseExt(this.props.ext.replace(".", "").toLowerCase())}
                value={this.props.code}
                onChange={this.props.update}
                width="100%"
                height={`${this.props.editorHeight}px`}
                // set height to overwhelming large, so no problems even if screens get big
                readOnly={this.props.readOnly}
            />
        );
    }
}

CodeEditor.propTypes = {
    ext: PropTypes.string,
    readOnly: PropTypes.bool.isRequired,
    update: PropTypes.func,
    code: PropTypes.string
};

export default CodeEditor;
