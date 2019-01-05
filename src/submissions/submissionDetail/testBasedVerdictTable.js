import React from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody } from '@material-ui/core';
import MemorySignature from '../signature/memorySignature';
import ExecTimeSignature from '../signature/execTimeSignature';
import VerdictSignature from '../signature/verdictSignature';

/**
 * @name AttestationSampleResult
 * @desc A <TableRow /> respresenting a test case used during judgement
 * @param {String} verdict : verdict after assessment
 * @param {String} executionTime : duration of execution
 * @param {String} memory : memory consumption during execution
 * @param {String} mark : points awarded
 * @return {React.Component} a <TableRow /> representing a test
 */

class AttestationSampleResult extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell>
                    <VerdictSignature verdict={this.props.verdict} />
                </TableCell>
                <TableCell>
                    <ExecTimeSignature time={this.props.executionTime} />
                </TableCell>
                <TableCell>
                    <MemorySignature memory={this.props.memory}/>
                </TableCell>
                <TableCell>
                    {this.props.mark}
                </TableCell>
            </TableRow>
        )
    }
}

/**
 * @name ResultTable
 * @desc A table showing test-based results for OI problems.
 * @param {Array : Object ({verdict, executionTime, memory, mark})} tests
 *        - an array with objects satisfying the given schema
 * @returns {React.Component} a <Table />
 */

class ResultTable extends React.Component {
    render() {
        if (this.props.tests // check if undefined or null
            &&
            this.props.tests.constructor === Array && this.props.tests.length !== 0)
        // if valid, render normally
            return (
                <Table>
                    <TableHead>
                        <TableCell>
                            Verdict
                        </TableCell>
                        <TableCell>
                            Execution duration
                        </TableCell>
                        <TableCell>
                            Memory consumed
                        </TableCell>
                        <TableCell>
                            Points awarded
                        </TableCell>
                    </TableHead>
                    <TableBody>
                        {this.props.tests.map(test => {
                            return <AttestationSampleResult {...test} />
                        })}
                    </TableBody>
                </Table>
            )
        // else if an empty array or invalid variable type was supplied, assume ACM problem
            return (<></>)
    }
}

export default ResultTable;