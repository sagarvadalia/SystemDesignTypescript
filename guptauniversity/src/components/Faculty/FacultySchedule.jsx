import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from './../../LoginContext';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
export default function FacultySchedule() {
	const [state, setState] = useContext(LoginContext);
	const [data, setData] = useState([{ courseID: {}, semesterID: {} }]);
	async function dataFetch(value) {
		const result = await axios(`/api/classes/semester/${value}`);

		setData(result.data);
		console.log(data);
	}
	let { semester } = useParams();
	semester = parseInt(semester);
	let semesterVal = {
		1: { semester: `Fall 2013` },
		2: { semester: `Spring 2014` },
		3: { semester: `Fall 2014` },
		4: { semester: `Spring 2015` },
		5: { semester: `Fall 2015` },
		6: { semester: `Spring 2016` },
		7: { semester: `Fall 2016` },
		8: { semester: `Spring 2017` },
		9: { semester: `Fall 2017` },
		10: { semester: `Spring 2018` },
		11: { semester: `Fall 2018` },
		12: { semester: `Spring 2019` },
		13: { semester: `Fall 2019` },
		14: { semester: `Spring 2020` },
		15: { semester: `Fall 2020` },
		16: { semester: `Spring 2021` },
	};
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`/api/faculties/viewClassesBySemester/${state.user.userID}/${semester}`);

			setData(result.data);
			console.log(result.data);
		};

		fetchData();
	}, []);

	return (
		// API IS HERE https://material-table.com/#/

		<div>
			{/* <pre>{JSON.stringify(data)}</pre>s */}

			<div style={{ maxWidth: '100%' }}>
				<MaterialTable
					title={
						<h2>
							My Schedule for {semesterVal[semester].semester}
							{semester !== 1 && (
								<Link to={`/currentSchedule/${semester - 1}`}>
									<Button onClick={() => dataFetch(semester - 1)}>Previous Semester</Button>
								</Link>
							)}
							{semester !== 10 && (
								<Link to={`/currentSchedule/${semester + 1}`}>
									<Button onClick={() => dataFetch(semester + 1)}>Next Semester</Button>
								</Link>
							)}
						</h2>
					}
					columns={[
						{ title: 'Class CRN', field: 'classCRN' },
						{ title: 'Class Section', field: 'classSection' },
						{ title: 'Course ID', field: 'courseID.courseID' },
						{
							title: 'Course Name',
							field: 'courseID.courseName',
							render: (rowData) => (
								<Link to={`/courses/${rowData.courseID.courseID}`}>{rowData.courseID.courseName}</Link>
							),
						},
						{ title: 'Semester Season', field: 'semesterID.semesterName' },
						{ title: 'Semester Year', field: 'semesterID.yearNum' },
						{
							title: 'Student Details',
							render: (rowData) => <Link to={`/classlist/${rowData.classCRN}`}>STUDENT DETAILS</Link>,
						},
						{
							title: 'Mark Attendance for Today',
							render: (rowData) => (
								<Link to={`/classlist/${rowData.classCRN}/attendance`}>Today's Attendance</Link>
							),
						},
					]}
					data={data}
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
