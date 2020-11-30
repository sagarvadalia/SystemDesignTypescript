import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from './../LoginContext';
export default function StudentTranscript() {
	const [data, setData] = useState({ transcript: [] });
	const [state, setState] = useContext(LoginContext);
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`/api/enrollment/${state.user.userID}`);

			setData(result.data);
		};

		fetchData();
	}, []);

	return (
		// API IS HERE https://material-table.com/#/
		<div>
			<div style={{ maxWidth: '100%' }}>
				<MaterialTable
					title="Basic Sorting Preview"
					columns={[
						{ title: 'Class Number', field: 'classNumber' },
						{ title: 'Semester Season', field: 'semester.semesterName' },
						{ title: 'Year', field: 'semester.yearNum' },
						{ title: 'Course Name', field: 'courseName.courseName' },
						{ title: 'Course Description', field: 'courseName.courseDesc' },
						{ title: 'Number of Credits', field: 'courseName.numOfCredits' },
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
