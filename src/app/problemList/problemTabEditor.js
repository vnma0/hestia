import React from 'react'
import ProblemTab from './problemTab/problemTab'
import CodeBox from './codeEditor/codeBox'

/**
 * @author Dat Ngo
 * @description Combine code editor and problem viewer
 * @param {Array : Object {id, name, statement, link} } problem problem ID, problem name, statement, download link
 * @param {Array<String>} `ext` - List of allowed source file extensions
 * @param {Array<String>} `problemList` - List of problems' ID
 */

class ProblemTabEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTab: 0,
            displayLang: []
        }
        this.handleTabChange = this.handleTabChange.bind(this)
    }

    handleTabChange(value) {
        this.setState({
            currentTab: value,
        })
    }
    render() {
        return (
            <div>
                <ProblemTab
                    problems={this.props.problems}
                    handleTabChange={this.handleTabChange}
                    value={this.state.currentTab} />
                <CodeBox
                    submitFileName={this.props.problems[this.state.currentTab] || ''}
                    ext={this.props.ext}
                    displayLang={this.props.ext.map(string => parseEXT(string))}
                />
            </div>
        )
    }
}

function parseEXT(string) {
    switch (string) {
        case 'cpp':
            return 'C++'
        case 'java':
            return 'OpenJDK 1.7.0-internal (developer build)'
        case 'py':
            return 'Python 3.3.2'
        default:
            return string
    }
}

export default ProblemTabEditor
