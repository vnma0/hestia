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

class AttestationSampleResult extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell>
                    <VerdictSignature verdict={this.props.verdict || 'N/A'} />
                </TableCell>
                <TableCell align='justify'>
                    <ExecTimeSignature time={this.props.executionTime || 'N/A'} />
                </TableCell>
                <TableCell align='right'>
                    <MemorySignature memory={this.props.memory || 'N/A'} />
                </TableCell>
                <TableCell align='right'>{this.props.mark}</TableCell>
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
        const { t } = this.props;
        if (
            this.props.tests && // check if undefined or null
            this.props.tests.constructor === Array &&
            this.props.tests.length !== 0
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
                            <TableCell>{t('submissions.table.memory')}</TableCell>
                            <TableCell>{t('submissions.table.points')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.tests.map((test, idx) => {
                            return <AttestationSampleResult key={`test-${idx}`} {...test} />;
                        })}
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
