import React, { Suspense } from 'react';
import publicParse from '../globalStatusBar/staticStub/public.js';
import { LoadingIndicator, ProblemError } from './problemLazyAssistance.js';

const ProblemTabEditor = React.lazy(() =>
    import('./problemTabEditor.js').then(component => {
        console.log('Hestia : %cProblems %capplet has been successfully loaded!', 'color: green', 'color: none');
        return component;
    })
);

class ProblemWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            problems: [''],
            ext: ['']
        };
    }

    componentDidMount() {
        this.componentDidUpdate();
        publicParse().then(data => {
            this.setState({
                problems: data.problems,
                ext: data.ext
            });
            this.forceUpdate();
        });
    }

    componentDidUpdate() {
        if (this.props.title) {
            document.title = String(this.props.title);
        }
    }

    render() {
        return (
            <Suspense fallback={<LoadingIndicator />}>
                <ProblemTabEditor ext={this.state.ext} problems={this.state.problems} />
            </Suspense>
        );
    }
}

export default props => (
    <ProblemError>
        <ProblemWrapper {...props} />
    </ProblemError>
);
