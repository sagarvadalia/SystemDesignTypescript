import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from '../../LoginContext';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';

export default function DegreeEval() {
	const [state, setState] = useContext(LoginContext);

	const [data, setData] = useState({
		needed: [{ deptID: {} }],
		inProg: [{ deptID: {} }],
		complete: [{ deptID: {} }],
	});
	let { majorID } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`/api/degreeevel/${state.user.userID}/${majorID}`);
			console.log(result.data);
			setData(result.data);
		};

		fetchData();
	}, []);

	return (
		<div>
			<div style={{ maxWidth: '100%' }}>
				<MaterialTable
					title={<div>Classes Yet to be started for this major</div>}
					columns={[
						{ title: 'Course ID', field: 'courseID' },
						{ title: 'Course Name', field: 'courseName' },
						{ title: 'Course Desc', field: 'courseDesc' },
						{ title: 'Credits', field: 'numOfCredits' },
						{ title: 'Department', field: 'deptID.deptName' },
					]}
					data={data.needed}
					options={{
						sorting: true,
						searching: true,
						exportButton: true,
					}}
				/>
				<MaterialTable
					title={<div>Classes In Progress for this major</div>}
					columns={[
						{ title: 'Course ID', field: 'courseID' },
						{ title: 'Course Name', field: 'courseName' },
						{ title: 'Course Desc', field: 'courseDesc' },
						{ title: 'Credits', field: 'numOfCredits' },
						{ title: 'Department', field: 'deptID.deptName' },
					]}
					data={data.inProg}
					options={{
						sorting: true,
						searching: true,
						exportButton: true,
					}}
				/>
				<MaterialTable
					title={<div>Classes Finished for this major</div>}
					columns={[
						{ title: 'Course ID', field: 'courseID' },
						{ title: 'Course Name', field: 'courseName' },
						{ title: 'Course Desc', field: 'courseDesc' },
						{ title: 'Credits', field: 'numOfCredits' },
						{ title: 'Department', field: 'deptID.deptName' },
					]}
					data={data.complete}
					options={{
						sorting: true,
						searching: true,
						exportButton: true,
					}}
				/>
			</div>
		</div>
	);
}
