import React from "react";
import ReactDOM from "react-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead
} from "@material-ui/core";

import "./submission_styles.css";

/**
 * @name CreateSubmit Create a single row for each submission
 * @param {string} Owner owner of the submission
 * @param {string} Problem what problem he/she submitted
 * @param {string} Language Language they chose to submit
 * @param {string} Verdict Result of his/her code: Accepted, Wrong Answer, Time Limit Exceed for ACM
 *         or Points they got if IOI
 * @param {string} Time Time running
 * @param {string} Memory Memory used
 */
let id = 0;
// function take data and return state to array
function CreateSubmit(
  Owner,
  Problem,
  Language,
  Verdict,
  Time,
  Memory,
  Submitted
) {
  id++;
  let isAC = Verdict == "Accepted" ? "Accepted" : "NotAccepted";
  return {
    isAC,
    Owner,
    Problem,
    Language,
    Verdict,
    Time,
    Memory,
    Submitted
  };
}

/**
 * @var SubmissionList contain information of a submission (will get from submission database and those above are only examples)
 */
var SubmissionList = [
  CreateSubmit(
    "Brionac",
    "A. 1 + 1 = ?",
    "C++14",
    "Accepted",
    "15ms",
    "300KB",
    "02:30:59"
  ),
  CreateSubmit(
    "Trishula",
    "B. 2 + 2 = ?",
    "C++11",
    "Runtime Error",
    "15ms",
    "300KB",
    "00:25:59"
  ),
  CreateSubmit(
    "MinhDucSun",
    "B. 3 + 3 = ?",
    "C++20",
    "Memory Limit Exceed",
    "15ms",
    "300KB",
    "00:42:43"
  )
];

/**
 * @class rending and displaying what will be in user's submission lists
 * @desc "Accepted" will be displayed in bold green while others are not
 * @desc sort base in 6 categories: Problem, Lang, Verdict, Time, Mem and time submitted
 * @desc Owner, which should be for a single user
 */
class Submission extends React.Component {
  printArray(arr) {
    return SubmissionList.map(row => {
      return (
        <TableRow key={row.Owner}>
          <TableCell>{row.Owner}</TableCell>
          <TableCell>{row.Problem}</TableCell>
          <TableCell>{row.Language}</TableCell>
          <TableCell>
            <h4 className={row.isAC}>{row.Verdict}</h4>
          </TableCell>
          <TableCell>{row.Time}</TableCell>
          <TableCell>{row.Memory}</TableCell>
          <TableCell>{row.Submitted}</TableCell>
        </TableRow>
      );
    });
  }
  render() {
    return (
      <div>
        <h1 className="titleSummissions">All Submissions</h1>
        <Table className="a_table">
          <TableHead className="head">
            <TableCell>Owner</TableCell>
            <TableCell>Problem</TableCell>
            <TableCell>Language</TableCell>
            <TableCell>Verdict</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Memory</TableCell>
            <TableCell>Submitted</TableCell>
          </TableHead>
          <TableBody>
            <this.printArray />
            <this.printArray />
          </TableBody>
        </Table>
      </div>
    );
  }
}
//render
const rootElement = document.getElementById("root");
ReactDOM.render(<Submission />, rootElement);
