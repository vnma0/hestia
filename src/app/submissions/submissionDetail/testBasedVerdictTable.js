import React from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody, Typography, CardContent } from '@material-ui/core';

import MemorySignature from '../signature/memorySignature';
import ExecTimeSignature from '../signature/execTimeSignature';
import VerdictSignature from '../signature/verdictSignature';
import { withNamespaces } from 'react-i18next';

/**
 * @name AttestationSampleResult
 * @desc A <TableRow /> respresenting a test case used during judgement
 * @param {String} verdict : verdict after assessment
 * @param {String} executionTime : duration of execution
 * @param {String} memory : memory consumption during execution
 * @param {String} mark : points awarded
 * @return {React.Component} a <TableRow /> representing a test
 */

class AttestationSampleResult extends React.PureComponent {
    render() {
        const { verdict, executionTime, memory, mark } = this.props;
        return (
            <TableRow>
                <TableCell>
                    <VerdictSignature verdict={verdict || 'N/A'} />
                </TableCell>
                <TableCell align='justify'>
                    <ExecTimeSignature time={executionTime ? `${Number(executionTime).toFixed(6)} (s)` : 'N/A'} />
                </TableCell>
                {false && (
                    <TableCell align='right'>
                        <MemorySignature memory={memory || 'N/A'} />
                    </TableCell>
                )}
                <TableCell align='right'>{mark}</TableCell>
            </TableRow>
        );
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
        const { t, tests, score } = this.props;
        if (
            tests && // check if undefined or null
            tests.constructor === Array &&
            tests.length !== 0
        )
            // if valid, render normally
            return (
                <Table>
                    <TableHead>
                        <TableRow
                            style={{
                                minHeight: 24
                            }}>
                            <TableCell>{t('submissions.table.verdict')}</TableCell>
                            <TableCell>{t('submissions.table.executionTime')}</TableCell>
                            {/* <TableCell>{t('submissions.table.memory')}</TableCell> */}
                            <TableCell>{t('submissions.table.points')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tests.map((test, idx) => {
                            return <AttestationSampleResult key={`test-${idx}`} {...test} />;
                        })}
                        <TableRow>
                            <TableCell colSpan={1} />
                            <TableCell align='left'>{t('submissions.table.totalPoints')}</TableCell>
                            <TableCell align='right'>{score}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            );
        // else if an empty array or invalid variable type was supplied, assume ACM problem
        return (
            <CardContent>
                <Typography variant='h6'>
                    {
                        t('submissions.details.table.noDetail', {
                            returnObjects: true
                        })[0]
                    }
                </Typography>
                <Typography component='p'>
                    {
                        t('submissions.details.table.noDetail', {
                            returnObjects: true
                        })[1]
                    }
                </Typography>
            </CardContent>
        );
    }
}

export default withNamespaces()(ResultTable);
