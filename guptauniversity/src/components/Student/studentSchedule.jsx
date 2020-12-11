import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from '../../LoginContext';
import { Button } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
export default function StudentSchedule() {
	const [data, setData] = useState([{ classCRN: { courseID: {} }, fID: {}, slotID: { days: '', periodID: {} } }]);
	const [state, setState] = useContext(LoginContext);
	const [semester, setSemester] = useState(15);
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
	async function incSemester() {
		await setSemester(semester + 1);

		const result = await axios(`/api/enrollment/studentHistoryBySemester/${state.user.userID}/${semester + 1}`);

		setData(result.data);
		console.log(data);
	}
	async function decSemester() {
		await setSemester(semester - 1);

		const result = await axios(`/api/enrollment/studentHistoryBySemester/${state.user.userID}/${semester - 1}`);

		setData(result.data);
		console.log(data);
	}
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`/api/enrollment/studentHistoryBySemester/${state.user.userID}/9`);

			setData(result.data);
		};

		fetchData();
	}, []);

	return (
		// API IS HERE https://material-table.com/#/

		<div>
			<div style={{ maxWidth: '100%' }}>
				<MaterialTable
					title={
						<div>
							My Schedule for {semesterVal[semester].semester}
							{semester != 1 && <Button onClick={() => decSemester()}>Previous Semester</Button>}
							{semester != 10 && <Button onClick={() => incSemester()}>Next Semester</Button>}
						</div>
					}
					columns={[
						{ title: 'Course ID', field: 'classCRN.courseID.courseID' },
						{
							title: 'Course Name',
							field: 'classCRN.courseID.courseName',
							render: (rowData) => (
								<Link to={`/courses/${rowData.classCRN.courseID.courseID}`}>
									{rowData.classCRN.courseID.courseName}
								</Link>
							),
						},
						{ title: 'Course Description', field: 'classCRN.courseID.courseDescription' },
						{ title: 'Credits', field: 'classCRN.courseID.numOfCredits' },
						{ title: 'Teacher Name', field: 'classCRN.fID.userName' },
						{ title: 'Days of the Week', field: 'classCRN.slotID.days' },
						{ title: 'Start Time', field: 'classCRN.slotID.periodID.startTime' },
						{ title: 'End Time', field: 'classCRN.slotID.periodID.endTime' },
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
