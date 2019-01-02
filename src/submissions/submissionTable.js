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
 * @param {String} memload : memory consumption of the submission
 * @param {String} timestamp : The time of submission.
 * @returns {React.Component} : A <TableRow> containing all nicely-formatted information.
 */


class Submission extends React.Component {
	render() {
		return (
			<TableRow style={{
				backgroundColor: (this.props.verdict==="AC"
				|| this.props.verdict==="Accepted" ? '#A5D6A7' : '')
			}}>
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
					<VerdictSignature verdict={this.props.verdict}/>
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
 * 					{contestant, Problem, Language, Verdict, ExecutionTime, memory, SubmissionTimestamp}
 * @return {Table} : a <Table> containing submissions
 */

/**
 * @example here
 */
/*
	<SubmissionTable submissionList={[{
		contestant : 'minhducsun2002', problem : 'A',
		verdict : 'AC', executionTime: '00:00:123', memory : '1TB', submissionTimestamp: '00:00:00',
		language : 'Perl',
	},{
		contestant : 'minhducsun2002', problem : 'A',
		verdict : 'WA', executionTime: '11:00:234', memory : '1TB', submissionTimestamp: '00:00:00',
		language : 'Pascal',
	},{
		contestant : 'minhducsun2002', problem : 'A',
		verdict : 'AC', executionTime: '38:46:115', memory : '1TB', submissionTimestamp: '00:00:00',
		language : 'C99',
	}]}/>
*/

class SubmissionTable extends React.Component {
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
						<TableCell>memory consumed</TableCell>
						<TableCell>Timestamp</TableCell>
					</TableHead>
					<TableBody>
						{this.props.submissionList.map(submission => {
							return (
								<Submission contestant={submission.contestant} problem={submission.problem}
								language={submission.language} verdict={submission.verdict}
								executionTime={submission.executionTime} memload={submission.memory}
								timestamp={submission.submissionTimestamp}/>
							);
						})}
					</TableBody>
				</Table>
			</Paper>
		);
	}
}

export default SubmissionTable;
