import React from 'react';
import { Table, TableBody, TableCell, TableHead, Paper, TableRow } from '@material-ui/core';

import Submission from './submission.js';
import SubmissionDetail from './submissionDetail/submissionDetail.js';
/**
 * @name SubmissionTable
 * @param `{Array : Object({contestant, Problem, Language, Verdict, ExecutionTime, memory, timestamp, test})}` `SubmissionList`
 * 					- An array containing objects satisfying this schema :
 * 					`{contestant, Problem, Language, Verdict, ExecutionTime, memory, timestamp, test}`
 * 					- All props are strings,
 * 					except `tests` which is an `{Array : Object ({verdict : String, executionTime : String, memory : String, mark : String})}`
 * @return {Table} : a `<Table />` containing submissions
 */

import { toggleDetails, addDetails } from './submissionDetail/submissionDetail.js';
import { withNamespaces } from 'react-i18next';

class SubmissionTable extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false
        };
    }
    render() {
        const { t, submissionList } = this.props;
        const { disabled } = this.state;
        const mapping = submissionList.map(({ tests, ...submission }) => (
            <Submission
                {...submission}
                executionTime={
                    tests.constructor === Array && tests.length !== 0
                        ? tests.reduce((a, { executionTime }) => Math.max(a, executionTime), 0)
                        : undefined
                }
                key={submission.id}
                onClick={() => {
                    this.setState({ disabled: true });
                    const { id, language, score } = submission;
                    addDetails({ tests, id, language, score });
                    toggleDetails(() => this.setState({ disabled: false }));
                }}
            />
        ));
        return (
            <>
                <Paper elevation={2} style={disabled ? { opacity: 0.4, pointerEvents: 'none' } : {}}>
                    <Table style={{ tableLayout: 'fixed', ...{} }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>{t('submissions.table.contestant')}</TableCell>
                                <TableCell>{t('submissions.table.problem')}</TableCell>
                                <TableCell>{t('submissions.table.language')}</TableCell>
                                <TableCell>{t('submissions.table.verdict')}</TableCell>
                                <TableCell>{t('submissions.table.executionTime')}</TableCell>
                                {/* <TableCell>{t('submissions.table.memory')}</TableCell> */}
                                <TableCell>{t('submissions.table.totalPoints')}</TableCell>
                                <TableCell>{t('submissions.table.timestamp')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{mapping}</TableBody>
                    </Table>
                    <SubmissionDetail />
                </Paper>
            </>
        );
    }
}

export default withNamespaces()(SubmissionTable);
