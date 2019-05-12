import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';

import ContestantSignature from './signature/contestantSignature.js';
import ProblemSignature from './signature/problemSignature.js';
import LanguageSignature from './signature/languageSignature.js';
import VerdictSignature from './signature/verdictSignature.js';
import ExecTimeSignature from './signature/execTimeSignature.js';
// import TimestampSignature from './signature/timestampSignature.js'
import MemorySignature from './signature/memorySignature.js';

import './submission.css';

/**
 * @name Submission
 * @desc Render a submission table row
 * @param {String} contestant : Contestant identifier
 * @param {String} problem : Problem identifier
 * @param {String} language : Submission language identifier
 * @param {String} verdict : Submission's judged verdict
 * @param {String} executionTime : Submission's execution time
 * @param {String} memory : memory consumption of the submission
 * @param {String} timestamp` : The time of submission.
 * @param {String} id` : Submission ID - used to provide download link
 * @param {Array <Object ({verdict : String, executionTime : String, memory : String, mark : String})>} `tests`
 *        			- an array with objects satisfying the given schema
 * @returns {React.Component} : A `<TableRow>` containing all nicely-formatted information.
 */

class Submission extends React.PureComponent {
    render() {
        const {
            verdict,
            contestant,
            problem,
            language,
            executionTime,
            memory,
            timestamp,
            score,
            ...passed
        } = this.props;
        return (
            <>
                <TableRow {...passed} className={`submission_${verdict}`}>
                    <TableCell>
                        <ContestantSignature contestantName={contestant || 'N/A'} />
                    </TableCell>
                    <TableCell>
                        <ProblemSignature problemName={problem || 'N/A'} />
                    </TableCell>
                    <TableCell>
                        <LanguageSignature languageName={language || 'N/A'} />
                    </TableCell>
                    <TableCell>
                        <VerdictSignature verdict={verdict || 'N/A'} />
                    </TableCell>
                    <TableCell>
                        <ExecTimeSignature time={executionTime || 'N/A'} />
                    </TableCell>
                    <TableCell>
                        <MemorySignature memory={memory || 'N/A'} />
                    </TableCell>
                    <TableCell>{score || 'N/A'}</TableCell>
                    <TableCell>
                        {/* <TimestampSignature time={timestamp || "N/A"} /> */}
                        {/* table overflow; will fix later, I guess */}
                        {new Date(timestamp).toLocaleString() || 'N/A'}
                    </TableCell>
                </TableRow>
            </>
        );
    }
}

export default Submission;
