import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';

import ContestantSignature from './signature/contestantSignature.js';
import ProblemSignature from './signature/problemSignature.js';
import LanguageSignature from './signature/languageSignature.js';
import VerdictSignature from './signature/verdictSignature.js';
import ExecTimeSignature from './signature/execTimeSignature.js';
import TimestampSignature from './signature/timestampSignature.js';
import MemorySignature from './signature/memorySignature.js';

/**
 * @name Submission
 * @desc Render a submission table row
 * @param {String} contestant : Contestant identifier
 * @param {String} problem : Problem identifier
 * @param {String} language : Submission language identifier
 * @param {String} verdict : Submission's judged verdict
 * @param {String} executionTime : Submission's execution time
 * @param {String} memory : memory consumption of the submission
 * @param {String} timestamp : The time of submission.
 * @param {Array : Object ({verdict, executionTime, memory, mark})} tests
 *        			- an array with objects satisfying the given schema
 * @returns {React.Component} : A <TableRow> containing all nicely-formatted information.
 */


class Submission extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailsExpanded : false,
            anchorRef : React.createRef()
        }
    }
	render() {
		return (
            <>
                <TableRow style={{
                    backgroundColor: (this.props.verdict==="AC"
                    || this.props.verdict==="Accepted" ? '#A5D6A7' : '')
                    // green color if successful
                }} {...this.props}>
                    <TableCell>
                        <ContestantSignature contestantName={this.props.contestant}/>
                    </TableCell>
                    <TableCell>
                        <ProblemSignature problemName={this.props.problem} />
                    </TableCell>
                    <TableCell>
                        <LanguageSignature languageName={this.props.language} />
                    </TableCell>
                    <TableCell>
                        <VerdictSignature verdict={this.props.verdict}/>
                    </TableCell>
                    <TableCell>
                        <ExecTimeSignature time={this.props.executionTime} />
                    </TableCell>
                    <TableCell>
                        <MemorySignature memory={this.props.memory} />
                    </TableCell>
                    <TableCell>
                        <TimestampSignature time={this.props.timestamp} />
                    </TableCell>
                </TableRow>
            </>
		)
	}
}

export default Submission;