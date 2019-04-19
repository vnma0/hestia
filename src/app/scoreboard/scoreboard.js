import React from 'react';
import { Table, TableBody, TableCell, TableRow, TableHead } from '@material-ui/core';

import LocalizedMessage from 'react-l10n';
import './scoreboard.css';

function toHrs(minute) {
    let hr = Math.floor(Number(minute) / 60);
    let min = Number(minute) % 60;
    return `${hr < 10 ? '0' + hr : hr}:${min < 10 ? '0' + min : min}`;
}

/**
 * @name Scoreboard
 */

class Scoreboard extends React.PureComponent {
    render() {
        // testing if it is ACM
        let mode = this.props.mode === 'ACM' ? '.acm' : '.oi';

        let initialStrings = [
            <LocalizedMessage id='scoreboard.table.head.name' />,
            <LocalizedMessage id={`scoreboard.table.head.score${mode}`} />,
            <LocalizedMessage id={`scoreboard.table.head.acceptedCount${mode}`} />
        ];
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        {initialStrings.concat(this.props.problems).map((entries, index) => (
                            <TableCell key={`head_${index}`} align='center'>
                                {entries}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.results.map((record, index) => {
                        let records = this.props.problems.map(entries => {
                            if (mode === '.oi')
                                return (
                                    <TableCell
                                        align='center'
                                        key={`row_${index}_${entries}`}
                                        style={{ whiteSpace: 'pre' }}
                                        className={`score_${record.result[entries].sec}`}>
                                        {record.result[entries].pri === null
                                            ? '∅'
                                            : parseFloat(Number(record.result[entries].pri)).toFixed(2)}
                                    </TableCell>
                                );
                            else
                                return (
                                    <TableCell
                                        align='center'
                                        key={`row_${index}_${entries}`}
                                        style={{ whiteSpace: 'pre' }}>
                                        {record.result[entries].sec === null ? (
                                            '∅'
                                        ) : (
                                            <>
                                                <div style={{ fontWeight: 'bold' }} className='score_acm_subcount'>
                                                    {`${record.result[entries].sec}\n`}
                                                </div>
                                                <span style={{ fontSize: 'smaller' }} className='score_acm_penalty'>
                                                    {`+${toHrs(record.result[entries].pri)}`}
                                                </span>
                                            </>
                                        )}
                                    </TableCell>
                                );
                            // `${record.result[entries].sec}\n\n+${toHrs(record.result[entries].pri)}`
                        });
                        return (
                            <TableRow key={`row_${index}`}>
                                <TableCell align='center'>{record.name}</TableCell>
                                <TableCell align='center'>
                                    {mode === '.acm'
                                        ? `+${toHrs(record.score)}`
                                        : parseFloat(Number(record.score)).toFixed(2)}
                                </TableCell>
                                <TableCell align='center'>{record.aced}</TableCell>
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
