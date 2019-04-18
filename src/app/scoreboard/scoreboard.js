import React from 'react';
import { Table, TableBody, TableCell, TableRow, TableHead } from '@material-ui/core';

import LocalizedMessage from 'react-l10n';
import './scoreboard.css';

/**
 * @name Scoreboard
 */

class Scoreboard extends React.PureComponent {
    render() {
        let initialStrings = [
            <LocalizedMessage id='scoreboard.table.head.name' />,
            <LocalizedMessage id='scoreboard.table.head.score' />,
            <LocalizedMessage id='scoreboard.table.head.acceptedCount' />
        ];
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        {initialStrings.concat(this.props.problems).map((entries, index) => (
                            <TableCell key={`head_${index}`}>{entries}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.results.map((record, index) => {
                        let records = this.props.problems.map(entries => {
                            let oi_verdict = Number(record.result[entries].sec) !== record.result[entries].sec;
                            // check if it is OI or ACM
                            return (
                                <TableCell
                                    key={`row_${index}_${entries}`}
                                    {...(oi_verdict ? { className: `score_${record.result[entries].sec}` } : {})}>
                                    {record.result[entries].pri === null
                                        ? '∅'
                                        : parseFloat(Number(record.result[entries].pri)).toFixed(2)}
                                </TableCell>
                            );
                        });
                        return (
                            <TableRow key={`row_${index}`}>
                                <TableCell>{record.name}</TableCell>
                                <TableCell>{parseFloat(Number(record.score)).toFixed(2)}</TableCell>
                                <TableCell>{record.aced}</TableCell>
                                {records}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        );
    }
}

export default Scoreboard;
