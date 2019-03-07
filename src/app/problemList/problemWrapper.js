import React from 'react';

import ProblemTabEditor from './problemTabEditor.js'
import publicParse from '../globalStatusBar/staticStub/public.js';

class ProblemWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            problems: [''],
            ext: ['']
        }
    }

    componentDidMount() {
        publicParse().then((data) => {
            this.setState({
                problems: data.problems,
                ext: data.ext
            })
            this.forceUpdate()
        })
    }

    render() {
        return (
            <ProblemTabEditor ext={this.state.ext} problems={this.state.problems}/>
        )
    }
}

export default ProblemWrapper;