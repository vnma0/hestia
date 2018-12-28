import React from "react";
import { Table, TableBody, TableCell, TableRow, TableHead, Paper } from "@material-ui/core";

import ContestantSignature from './signature/contestantSignature.js';
import ProblemSignature from './signature/problemSignature.js';
import LanguageSignature from './signature/languageSignature.js';
import VerdictSignature from './signature/verdictSignature.js';
import ExecTimeSignature from './signature/execTimeSignature.js';
import TimestampSignature from './signature/timestampSignature.js';
import MemorySignature from './signature/memorySignature.js';

/**
 * @name Submission
 * @desc Render a submission table row
 * @param {String} contestant : Contestant identifier
 * @param {String} problem : Problem identifier
 * @param {String} language : Submission language identifier
 * @param {String} verdict : Submission's judged verdict
 * @param {String} executionTime : Submission's execution time
 * @param {String} memload : Memory consumption of the submission
 * @param {String} timestamp : The time of submission.
 * @returns {React.Component} : A <TableRow> containing all nicely-formatted information.
 */


class Submission extends React.Component {
	render() {
		return (
			<TableRow>
				<TableCell>
					<ContestantSignature contestantName={this.props.contestant}/>
				</TableCell>
				<TableCell>
					<ProblemSignature problemName={this.props.problem} />
				</TableCell>
				<TableCell>
					<LanguageSignature languageName={this.props.language} />
				</TableCell>
				<TableCell>
					<VerdictSignature verdict={this.props.verdict}
					success={this.props.verdict==="AC" || this.props.verdict==="Accepted"}
					failed={this.props.verdict==="WA" || this.props.verdict==="Wrong answer"}/>
				</TableCell>
				<TableCell>
					<ExecTimeSignature time={this.props.executionTime} />
				</TableCell>
				<TableCell>
					<MemorySignature memload={this.props.memload} />
				</TableCell>
				<TableCell>
					<TimestampSignature time={this.props.timestamp} />
				</TableCell>
			</TableRow>
		)
	}
}

/**
 * @name SubmissionTable
 * @param {Array} SubmissionList : An array containing objects satisfying this schema : 
 * 					{owner, Problem, Language, Verdict, ExecutionTime, Memory, SubmissionTimestamp}
 * @return {Table} : a <Table> containing submissions
 */

/**
 * @example here
 */
/*
	<SubmissionTable submissionList={[{
		owner : 'minhducsun2002', problem : 'A',
		verdict : 'AC', executionTime: '00:00:123', Memory : '1TB', submissionTimestamp: '00:00:00',
		language : 'Perl',
	},{
		owner : 'minhducsun2002', problem : 'A',
		verdict : 'WA', executionTime: '11:00:234', Memory : '1TB', submissionTimestamp: '00:00:00',
		language : 'Pascal',
	},{
		owner : 'minhducsun2002', problem : 'A',
		verdict : 'AC', executionTime: '38:46:115', Memory : '1TB', submissionTimestamp: '00:00:00',
		language : 'C99',
	}]}/>
*/

class SubmissionTable extends React.Component {
	constructor(props) {
		super(props);
		this.printArray = this.printArray.bind(this);
	}
	printArray(arr) {
		return this.props.submissionList.map(submission => {
			return (
				<Submission contestant={submission.contestant} problem={submission.problem}
				language={submission.language} verdict={submission.verdict}
				executionTime={submission.executionTime} memload={submission.memory}
				timestamp={submission.submissionTimestamp}/>
			);
		});
	}
	render() {
		return (
			<Paper>
				<Table>
					<TableHead>
						<TableCell>Submitted by</TableCell>
						<TableCell>Problem</TableCell>
						<TableCell>Programming language</TableCell>
						<TableCell>Verdict</TableCell>
						<TableCell>Execution duration</TableCell>
						<TableCell>Memory consumed</TableCell>
						<TableCell>Timestamp</TableCell>
					</TableHead>
					<TableBody>
						<this.printArray />
					</TableBody>
				</Table>
			</Paper>
		);
	}
}

export default SubmissionTable;
