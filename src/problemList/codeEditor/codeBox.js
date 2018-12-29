import React from 'react';
import LangSelection from './langSelection';
import CodeEditor from './codeEditor';
// <CodeEditor/>

class CodeBox extends React.Component {
    render(){
        return(
            <div style={{
                flexGrow: 1
            }}>
                <LangSelection/>
                <CodeEditor />
            </div>
        )
    }
}
export default CodeBox;