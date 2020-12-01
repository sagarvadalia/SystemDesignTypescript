import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from './../LoginContext';
export default function StudentTranscript() {
	const [data, setData] = useState([{ semesterID: {}, courseName: 'test' }]);
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
			{/* <pre>{JSON.stringify(data)}</pre> */}

			<div style={{ maxWidth: '100%' }}>
				<MaterialTable
					title="Basic Sorting Preview"
					columns={[
						{ title: 'Class Number', field: 'classNumber' },
						{ title: 'Semester Season', field: 'semester.semesterName' },
						{ title: 'Year', field: 'semester.yearNum' },
						{ title: 'Course Name', field: 'courseName' },
						{ title: 'Grade', field: 'grade' },
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
