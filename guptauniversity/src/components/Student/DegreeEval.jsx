import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from '../../LoginContext';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';

export default function DegreeEval() {
	const [state, setState] = useContext(LoginContext);
	const [major, setMajor] = useState({ majorName: '' });
	const [data, setData] = useState({
		needed: [{ deptID: {} }],
		inProg: [{ classCRN: { courseID: { deptID: {} } } }],
		complete: [{ classCRN: { courseID: { deptID: {} } } }],
	});
	let { majorID } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`/api/degreeeval/${state.user.userID}/${majorID}`);
			console.log(result.data);
			setData(result.data);
			const major = await axios(`/api/majors/${majorID}`);
			console.log(major);
			setMajor(major.data);
		};

		fetchData();
	}, []);

	return (
		<div>
			<div style={{ maxWidth: '100%' }}>
				<MaterialTable
					title={<div>Classes Yet to be started for {major.majorName}</div>}
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
					title={<div>Classes In Progress for {major.majorName}</div>}
					columns={[
						{ title: 'Course ID', field: 'classCRN.courseID.courseID' },
						{ title: 'Course Name', field: 'classCRN.courseID.courseName' },
						{ title: 'Course Desc', field: 'classCRN.courseID.courseDesc' },
						{ title: 'Credits', field: 'classCRN.courseID.numOfCredits' },
						{ title: 'Department', field: 'classCRN.courseID.deptID.deptName' },
						{ title: 'Final Grade', field: 'finalGrade' },
					]}
					data={data.inProg}
					options={{
						sorting: true,
						searching: true,
						exportButton: true,
					}}
				/>
				<MaterialTable
					title={<div>Classes Finished for {major.majorName}</div>}
					columns={[
						{ title: 'Course ID', field: 'classCRN.courseID.courseID' },
						{ title: 'Course Name', field: 'classCRN.courseID.courseName' },
						{ title: 'Course Desc', field: 'classCRN.courseID.courseDesc' },
						{ title: 'Credits', field: 'classCRN.courseID.numOfCredits' },
						{ title: 'Department', field: 'classCRN.courseID.deptID.deptName' },
						{ title: 'Final Grade', field: 'finalGrade' },
					]}
					data={data.complete}
					options={{
						sorting: true,
						searching: true,
						exportButton: true,
						filtering: true,
					}}
				/>
			</div>
		</div>
	);
}
