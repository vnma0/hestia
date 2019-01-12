import React from 'react';
import ProblemTabEditor from './problemTabEditor';

class ProblemList extends React.Component {
    render() {
        return(
            <>
                <ProblemTabEditor {...this.props}/>
            </>
        )
    }
}

export default ProblemList;