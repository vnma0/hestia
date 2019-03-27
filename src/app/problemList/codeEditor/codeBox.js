import React from 'react'
import { AppBar, Grid } from '@material-ui/core'

import CodeEditor from './codeEditor'
import SubmitButton from './submitButton'
import LangSelection from './langSelection'

import friendlyLang from '../../../strings/lang.json';

class CodeBox extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            code: '',
            langId: 0,
            submitting: false
        }
    }

    render() {
        return (
            <div style={{ flexGrow: 1 }}>
                <AppBar position="static" color="default">
                    <div id="optionTab" style={{ margin: '1% 1%' }}>
                        <Grid container spacing={8} alignItems="center">
                            <Grid item style={{ flexGrow: 1 }} >
                                <LangSelection
                                    displayLang={this.props.displayLang || []}
                                    handleChange={(id) => this.setState({ langId: id })}>
                                    {friendlyLang[
                                        String(this.props.displayLang[this.state.langId])
                                            .replace('.', '')
                                            .toLowerCase()
                                    ]}
                                </LangSelection>
                            </Grid>
                            <Grid item>
                                <SubmitButton
                                    disabled={
                                        this.state.code === '' ||
                                        this.state.langId === null ||
                                        this.props.ext.size === 0
                                    }
                                    fileName={this.props.submitFileName}
                                    code={this.state.code}
                                    ext={this.props.ext[this.state.langId] || ''}
                                    onSubmit={() => 
                                        this.setState({
                                            submitting: true
                                    })}
                                    onSubmitDone={() => this.setState({
                                        submitting: false
                                    })}
                                >
                                    Submit
                                </SubmitButton>
                            </Grid>
                        </Grid>
                    </div>
                <div style={(
                    this.state.submitting ? 
                    { opacity: 0.4, pointerEvents: 'none' } : {}
                )}>
                        <CodeEditor
                            readOnly={this.state.submitting}
                            ext={this.props.ext[this.state.langId]}
                            update={(code) => this.setState({ code: code })}
                            code={this.state.code}
                        />
                    </div>
                </AppBar>
            </div>
        )
    }
}

export default CodeBox
