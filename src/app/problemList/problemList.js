import React from 'react';
import GlobalStatusBar from '../appBar/appBar';
import ProblemTabEditor from './problemTabEditor';

class ProblemList extends React.Component {
    render() {
        return(
            <>
                <ProblemTabEditor/>
            </>
        )
    }
}

export default ProblemList;