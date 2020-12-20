import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from '../../LoginContext';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';

export default function DegreeAudit() {
	const [state, setState] = useContext(LoginContext);
	const [major1, setMajor1] = useState([{ majorID: {}, majorID: { department: {} } }]);
	const [major2, setMajor2] = useState([{ majorID: {}, majorID: { department: {} } }]);
	const [data, setData] = useState({
		needed: [{ deptID: {} }],
		inProg: [{ classCRN: { courseID: { deptID: {} } } }],
		complete: [{ classCRN: { courseID: { deptID: {} } } }],
	});
	const [data2, setData2] = useState({
		needed: [{ deptID: {} }],
		inProg: [{ classCRN: { courseID: { deptID: {} } } }],
		complete: [{ classCRN: { courseID: { deptID: {} } } }],
	});

	useEffect(() => {
		const fetchData = async () => {
			let majors = await axios.get(`/api/viewMajors/${state.user.userID}`);
			majors = majors.data;
			console.log(majors);
			for (let i = 0; i < majors.length; i++) {
				const result = await axios(`/api/degreeeval/${state.user.userID}/${majors[i].majorID.majorID}`);
				console.log(result);
				const major = await axios(`/api/majors/${majors[i].majorID.majorID}`);
				console.log(major);
				if (i == 0) {
					setData(result.data);
					setMajor1(major.data);
					console.log(major1, 'major1');
					console.log(result.data, 'data1');
				}
				if (i == 1) {
					setData2(result.data);
					setMajor2(major.data);
					console.log(data2, 'data2');
					console.log(major2, 'major2');
				}
			}
			console.log(data, 'dataa0----');
		};

		fetchData();
	}, []);

	return (
		<div>
			<div style={{ maxWidth: '100%' }}>
				<MaterialTable
					title={<h2>Classes Yet to be started for {major1.majorName}</h2>}
					columns={[
						{ title: 'Course ID', field: 'courseID' },
						{
							title: 'Course Name',
							field: 'courseName',

							render: (rowData) => (
								<Link to={`/courses/${rowData?.courseID}`}>{rowData?.courseName}</Link>
							),
						},
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
					title={<h2>Classes In Progress for {major1.majorName}</h2>}
					columns={[
						{ title: 'Course ID', field: 'classCRN.courseID.courseID' },
						{
							title: 'Course Name',
							field: 'classCRN.courseID.courseName',
							render: (rowData) => (
								<Link to={`/courses/${rowData?.classCRN?.courseID?.courseID}`}>
									{rowData?.classCRN?.courseID?.courseName}
								</Link>
							),
						},
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
					title={<h2>Classes Finished for {major1.majorName}</h2>}
					columns={[
						{ title: 'Course ID', field: 'classCRN.courseID.courseID' },
						{
							title: 'Course Name',
							field: 'classCRN.courseID.courseName',
							render: (rowData) => (
								<Link to={`/courses/${rowData?.classCRN?.courseID?.courseID}`}>
									{rowData?.classCRN?.courseID?.courseName}
								</Link>
							),
						},
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

			{major2.majorName && (
				<div style={{ maxWidth: '100%' }}>
					<MaterialTable
						title={<h2>Classes Yet to be started for {major2.majorName}</h2>}
						columns={[
							{ title: 'Course ID', field: 'courseID' },
							{
								title: 'Course Name',
								field: 'courseName',
								render: (rowData) => (
									<Link to={`/courses/${rowData?.courseID}`}>{rowData?.courseName}</Link>
								),
							},
							{ title: 'Course Desc', field: 'courseDesc' },
							{ title: 'Credits', field: 'numOfCredits' },
							{ title: 'Department', field: 'deptID.deptName' },
						]}
						data={data2.needed}
						options={{
							sorting: true,
							searching: true,
							exportButton: true,
						}}
					/>

					<MaterialTable
						title={<h2>Classes In Progress for {major2.majorName}</h2>}
						columns={[
							{ title: 'Course ID', field: 'classCRN.courseID.courseID' },
							{
								title: 'Course Name',
								field: 'classCRN.courseID.courseName',
								render: (rowData) => (
									<Link to={`/courses/${rowData?.classCRN?.courseID?.courseID}`}>
										{rowData?.classCRN?.courseID?.courseName}
									</Link>
								),
							},
							{ title: 'Course Desc', field: 'classCRN.courseID.courseDesc' },
							{ title: 'Credits', field: 'classCRN.courseID.numOfCredits' },
							{ title: 'Department', field: 'classCRN.courseID.deptID.deptName' },
							{ title: 'Final Grade', field: 'finalGrade' },
						]}
						data={data2.inProg}
						options={{
							sorting: true,
							searching: true,
							exportButton: true,
						}}
					/>
					<MaterialTable
						title={<h2>Classes Finished for {major2.majorName}</h2>}
						columns={[
							{ title: 'Course ID', field: 'classCRN.courseID.courseID' },
							{
								title: 'Course Name',
								field: 'classCRN.courseID.courseName',
								render: (rowData) => (
									<Link to={`/courses/${rowData?.classCRN?.courseID?.courseID}`}>
										{rowData?.classCRN?.courseID?.courseName}
									</Link>
								),
							},
							{ title: 'Course Desc', field: 'classCRN.courseID.courseDesc' },
							{ title: 'Credits', field: 'classCRN.courseID.numOfCredits' },
							{ title: 'Department', field: 'classCRN.courseID.deptID.deptName' },
							{ title: 'Final Grade', field: 'finalGrade' },
						]}
						data={data2.complete}
						options={{
							sorting: true,
							searching: true,
							exportButton: true,
							filtering: true,
						}}
					/>
				</div>
			)}
		</div>
	);
}
