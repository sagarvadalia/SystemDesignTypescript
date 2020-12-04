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
		1: { semester: `Fall 2016` },
		2: { semester: `Spring 2017` },
		3: { semester: `Fall 2017` },
		4: { semester: `Spring 2018` },
		5: { semester: `Fall 2018` },
		6: { semester: `Spring 2019` },
		7: { semester: `Fall 2019` },
		8: { semester: `Spring 2020` },
		9: { semester: `Fall 2020` },
		10: { semester: `Spring 2021` },
	};
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`/api/faculties/viewClassesBySemester/${state.user.userID}/${semester}`);

			setData(result.data);
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
						<div>
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
						</div>
					}
					columns={[
						{ title: 'classCRN', field: 'classCRN' },
						{ title: 'class section', field: 'classSection' },
						{ title: 'Course ID', field: 'courseID.courseID' },
						{ title: 'Course Name', field: 'courseID.courseName' },
						{ title: 'Semester Season', field: 'semesterID.semesterName' },
						{ title: 'Semester Year', field: 'semesterID.yearNum' },
						{
							title: 'Student Details',
							render: (rowData) => <Link to={'/classlist/studentDetails'}>STUDENT DETAILS</Link>,
						},
					]}
					data={data}
					options={{
						sorting: true,
					}}
				/>
			</div>
		</div>
	);
}
