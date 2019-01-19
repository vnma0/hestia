import React from 'react'
import { Table, TableBody, TableCell, TableRow, TableHead } from '@material-ui/core'

/**
 * @name Scoreboard
 * @desc Display scoreboard updated after a submission result applied
 * @param {Array : Object (String, Number, Number)} data The current information (Handle, Penalty, Score for each problem) of a contestant
 * @param {String} data.Handle Name of contestant
 * @param {Number} data.Penalty Total Penalty of a contestant
 * @param {Number} data.Score current score the contestant have
 * @param {Array : String} problem - Problem name (and followed with B, C,... or customized by the contest host)
 * @returns {Table} Display current Score of contest
 */
class Scoreboard extends React.Component {
    /**
     * @function AddProblemToHead
     * @desc merge problem to header
     */
    AddProblemToHead() {
        this.props.problem.map(problems => {
            this.props.header.push({ name: problems });
            return;
        })
    }
    render() {
        this.AddProblemToHead()
        let head = this.props.header.map(cell => {
            return <TableCell>{cell.name}</TableCell>
        })
        let body = this.props.data.map(row => {
            return (
                <TableRow>
                    {this.props.header.map(cell => {
                        // if ()
                        return <TableCell>{row[cell.name]}</TableCell>
                    })}
                </TableRow>
            )
        })
        /*
            the first map of body to access to all object of data.
            the second map of body to access to all cell of each row.
            because number of element in head equal number of element each row
            so we map with length of header and return cell with have same name of header
        */
        return (
            <Table>
                <TableHead>{head}</TableHead>
                <TableBody>{body}</TableBody>
            </Table>
        )
    }
}

/**
 * @example
    <ScoreBoard
        header={[{ name: "Handle" }, { name: "Score" }, { name: "Penalty" }]}
        problem={["A", "B", "C"]}
        data={[
            {
                Handle: "GHTH01",
                Penalty: 40000,
                Score: 0,
                A: 70,
                B: 100,
                C: 85
            },
            {
                Handle: "GHTH02",
                Penalty: 50000,
                Score: 0,
                A: 100,
                B: 50,
                C: 50
            },
            {
                Handle: "GHTH03",
                Penalty: 30000,
                Score: 0,
                A: 0,
                B: 100,
                C: 100
            }
        ]}
    />,
    document.getElementById("root")
);
 */
export default Scoreboard
