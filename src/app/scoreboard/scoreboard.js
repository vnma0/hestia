import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableHead,
} from '@material-ui/core'

/**
 * @name Scoreboard
 */

class Scoreboard extends React.PureComponent {
    render() {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        {['Name', 'Score', 'AC'].concat(this.props.problems)
                            .map((entries, index) => <TableCell key={`head_${index}`}>{entries}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        this.props.results.map((record, index) => {
                            return (
                                <TableRow key={`row_${index}`}>
                                    <TableCell>{record.name}</TableCell>
                                    <TableCell>{record.score}</TableCell>
                                    <TableCell>{record.aced}</TableCell>
                                    {this.props.problems.map(entries => (<TableCell key={`row_${index}_${entries}`}>
                                                {record.result[entries].pri === null ? '∅' : record.result[entries].pri}
                                            </TableCell>)
                                    )}
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        )
    }
}

export default Scoreboard