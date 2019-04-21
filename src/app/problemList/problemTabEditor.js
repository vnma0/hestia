import React, { Suspense } from 'react';
import ProblemTab from './problemTab/problemTab';
import { LoadingIndicator } from './problemLazyAssistance.js';

const CodeBox = React.lazy(() => import('./codeEditor/codeBox.js'));

/**
 * @author Dat Ngo
 * @description Combine code editor and problem viewer
 * @param {Array : Object {id, name, statement, link} } problem problem ID, problem name, statement, download link
 * @param {Array<String>} `ext` - List of allowed source file extensions
 * @param {Array<String>} `problemList` - List of problems' ID
 */

class ProblemTabEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: 0,
            displayLang: []
        };
    }
    render() {
        return (
            <div>
                <ProblemTab
                    problems={this.props.problems}
                    handleTabChange={value => this.setState({ currentTab: value })}
                    value={this.state.currentTab}
                />
                <Suspense fallback={<LoadingIndicator />}>
                    <CodeBox submitFileName={this.props.problems[this.state.currentTab] || ''} ext={this.props.ext} />
                </Suspense>
            </div>
        );
    }
}

export default ProblemTabEditor;
