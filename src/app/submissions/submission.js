import React from 'react'
import { TableRow, TableCell } from '@material-ui/core'

import ContestantSignature from './signature/contestantSignature.js'
import ProblemSignature from './signature/problemSignature.js'
import LanguageSignature from './signature/languageSignature.js'
import VerdictSignature from './signature/verdictSignature.js'
import ExecTimeSignature from './signature/execTimeSignature.js'
// import TimestampSignature from './signature/timestampSignature.js'
import MemorySignature from './signature/memorySignature.js'

import SubmissionDownloadButton from './submission/downloadCell.js'

/**
 * @name Submission
 * @desc Render a submission table row
 * @param {String} `contestant` : Contestant identifier
 * @param {String} `problem` : Problem identifier
 * @param {String} `language` : Submission language identifier
 * @param {String} `verdict` : Submission's judged verdict
 * @param {String} `executionTime` : Submission's execution time
 * @param {String} `memory` : memory consumption of the submission
 * @param {String} `timestamp` : The time of submission.
 * @param {String} `id` : Submission ID - used to provide download link
 * @param {Array <Object ({verdict : String, executionTime : String, memory : String, mark : String})>} `tests`
 *        			- an array with objects satisfying the given schema
 * @returns {React.Component} : A `<TableRow>` containing all nicely-formatted information.
 */

class Submission extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            detailsExpanded: false,
        }
    }
    render() {
        return (
            <>
                <TableRow {...this.props} >
                    <TableCell>
                        <ContestantSignature
                            contestantName={this.props.contestant || 'N/A'}
                        />
                    </TableCell>
                    <TableCell>
                        <ProblemSignature
                            problemName={this.props.problem || 'N/A'}
                        />
                    </TableCell>
                    <TableCell>
                        <LanguageSignature
                            languageName={this.props.language || 'N/A'} />
                    </TableCell>
                    <TableCell>
                        <VerdictSignature
                            verdict={this.props.verdict || 'N/A'}
                        />
                    </TableCell>
                    <TableCell>
                        <ExecTimeSignature
                            time={this.props.executionTime || 'N/A'}
                        />
                    </TableCell>
                    <TableCell>
                        <MemorySignature memory={this.props.memory || 'N/A'} />
                    </TableCell>
                    <TableCell>
                        {/* <TimestampSignature time={this.props.timestamp || "N/A"} /> */}
                        {/* table overflow; will fix later, I guess */}
                        {new Date(this.props.timestamp).toLocaleString() || 'N/A'}
                    </TableCell>
                    <TableCell>
                        <SubmissionDownloadButton id={this.props.id}/>
                    </TableCell>
                </TableRow>
            </>
        )
    }
}

export default Submission
