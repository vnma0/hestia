import React from 'react'
import { Grid } from '@material-ui/core'
import ProblemTab from './problemTab/problemTab'
import CodeBox from './codeEditor/codeBox'

import publicParse from '../globalStatusBar/staticStub/public.js'

/**
 * @author Dat Ngo
 * @description Combine code editor and problem viewer
 * @param {Array : Object {id, name, statement, link} } problem problem ID, problem name, statement, download link
 */

class ProblemTabEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: 0,
            ext: [],
            problem: [],
            displayLang : undefined
        }
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    componentDidMount() {
        if (window.hestia.contest.ext !== undefined && window.hestia.contest.problemList !== undefined) {
            this.setState({ 
                displayLang : 
                    window.hestia.contest.ext.map(string => {
                        return parseEXT(string)
                    }),
                problem: window.hestia.contest.problemList,
                ext : window.hestia.contest.ext
            });
            this.forceUpdate()
        }
        else 
            publicParse(() => this.setState({
                displayLang : 
                    window.hestia.contest.ext.map(string => {
                        return parseEXT(string)
                    }),
                problem: window.hestia.contest.problemList,
                ext : window.hestia.contest.ext
            }) || this.forceUpdate())
    }

    handleTabChange(value) {
        this.setState({
            currentTab: value
        })
    }
    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <Grid container spacing={8} alignItems="stretch" style={{
                    width: '100%'
                }}>
                    <Grid item style={{
                        width: '50%',
                    }}>
                        <ProblemTab problem={this.state.problem} handleTabChange={this.handleTabChange} value={this.state.currentTab} />
                    </Grid>
                    <Grid item style={{
                        width: '50%',
                    }}>
                        <CodeBox 
                            submitFileName={this.state.problem[this.state.currentTab] || ''}
                            ext={this.state.ext} 
                            displayLang={this.state.displayLang
                                || this.state.ext.map(parseEXT)}/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

function parseEXT(string)
{
    switch(string) {
        case "cpp" : return 'C++';
        case "java" : return 'OpenJDK 1.7.0-internal (developer build)'
        case "py" : return 'Python 3.3.2'
        default : return string
    }
}

export default ProblemTabEditor
