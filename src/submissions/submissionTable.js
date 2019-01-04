import React from "react";
import { Table, TableBody, TableCell, TableRow, TableHead, Paper, TableSortLabel } from "@material-ui/core";

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
 * @param {String} memory : memory consumption of the submission
 * @param {String} timestamp : The time of submission.
 * @returns {React.Component} : A <TableRow> containing all nicely-formatted information.
 */


class Submission extends React.Component {
	render() {
		return (
			<TableRow style={{
				backgroundColor: (this.props.verdict==="AC"
				|| this.props.verdict==="Accepted" ? '#A5D6A7' : '')
			}} button onClick={() => alert(1)}>
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
					<MemorySignature memory={this.props.memory} />
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
		contestant : 'minhducsun123456', problem : 'A',
		verdict : 'Accepted', executionTime: '00:00:123', memory : '1TB', timestamp: '00:00:00',
		language : 'Perl',
	},{
		contestant : 'minhducsun2002', problem : 'A',
		verdict : 'Wrong output', executionTime: '11:00:234', memory : '1TB', timestamp: '00:00:00',
		language : 'Pascal',
	},{
		contestant : 'minhducsun123456', problem : 'A',
		verdict : 'Accepted', executionTime: '38:46:115', memory : '1TB', timestamp: '00:00:00',
		language : 'C99',
	}]}/>
*/

class SubmissionTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			submissionList : this.props.submissionList,
			reverseSort : true
		}
		// Yeah, in order to support sorting
		// and since props are immutable
		// we mirror them to this.state and mutate it instead
		this.sortBy = this.sortBy.bind(this);
	}

	sortBy(field) {
		this.setState({
			submissionList : this.state.submissionList.sort((a, b) => {
				// yeah, simple sorting lambda...
				let a1 = a[field], b1 = b[field];
				if (a1 < b1) return -1;
				if (a1 > b1) return 1;
				return 0;
			}),
			reverseSort : !this.state.reverseSort
		})
		this.setState({
			submissionList :
				this.state.reverseSort ?
					this.state.submissionList.reverse() : this.state.submissionList
		})
	}

	render() {
		return (
			<Paper>
				<Table>
					<TableHead>
						<TableCell>
							<TableSortLabel direction={this.state.reverseSort ? "desc" : "asc"}
								active onClick={() => this.sortBy("contestant")}>
								Submitted by
							</TableSortLabel>
						</TableCell>
						<TableCell>
							<TableSortLabel direction={this.state.reverseSort ? "desc" : "asc"}
								active onClick={() => this.sortBy("problem")}>
								Problem
							</TableSortLabel>
						</TableCell>
						<TableCell>
							<TableSortLabel direction={this.state.reverseSort ? "desc" : "asc"}
								active onClick={() => this.sortBy("language")}>
								Programming language
							</TableSortLabel>
						</TableCell>
						<TableCell>
							<TableSortLabel direction={this.state.reverseSort ? "desc" : "asc"}
								active onClick={() => this.sortBy("verdict")}>
								Verdict
							</TableSortLabel>
						</TableCell>
						<TableCell>
							<TableSortLabel direction={this.state.reverseSort ? "desc" : "asc"}
								active onClick={() => this.sortBy("executionTime")}>
								Execution duration
							</TableSortLabel>
						</TableCell>
						<TableCell>
							<TableSortLabel direction={this.state.reverseSort ? "desc" : "asc"}
								active onClick={() => this.sortBy("memory")}>
								Memory consumed
							</TableSortLabel>
						</TableCell>
						<TableCell>
							<TableSortLabel direction={this.state.reverseSort ? "desc" : "asc"}
								active onClick={() => this.sortBy("timestamp")}>
								Timestamp
							</TableSortLabel>
						</TableCell>
					</TableHead>
					<TableBody>
						{this.state.submissionList.map(submission => {
							return (
								<Submission {...submission}/>
							);
						})}
					</TableBody>
				</Table>
			</Paper>
		);
	}
}

export default SubmissionTable;
