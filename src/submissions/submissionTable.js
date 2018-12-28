import React from "react";
import { Table, TableBody, TableCell, TableRow, TableHead, Paper } from "@material-ui/core";

import ContestantSignature from './contestantSignature.js';
import ProblemSignature from './problemSignature.js';
import LanguageSignature from './languageSignature.js';
import VerdictSignature from './verdictSignature.js';
import ExecTimeSignature from './execTimeSignature.js';
import TimestampSignature from './timestampSignature.js';
import MemorySignature from './memorySignature.js';

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
				<TableRow>
					<TableCell>
						<ContestantSignature contestantName={submission.owner}/>
					</TableCell>
					<TableCell>
						<ProblemSignature problemName={submission.problem} />
					</TableCell>
					<TableCell>
						<LanguageSignature languageName={submission.language} />
					</TableCell>
					<TableCell>
						<VerdictSignature verdict={submission.verdict}
						success={submission.verdict==="AC"} failed={submission.verdict==="WA"}/>
					</TableCell>
					<TableCell>
						<ExecTimeSignature time={submission.executionTime} />
					</TableCell>
					<TableCell>
						<MemorySignature memload={submission.Memory} />
					</TableCell>
					<TableCell>
						<TimestampSignature time={submission.submissionTimestamp} />
					</TableCell>
				</TableRow>
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
						<TableCell>Language</TableCell>
						<TableCell>Verdict</TableCell>
						<TableCell>Execution duration</TableCell>
						<TableCell>Memory</TableCell>
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
