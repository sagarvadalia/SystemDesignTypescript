import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from '../../LoginContext';
import { Link } from 'react-router-dom';
export default function FacultyClassHistory() {
	const [data, setData] = useState([{ courseID: {}, semesterID: {} }]);
	const [state, setState] = useContext(LoginContext);
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`/api/faculties/viewClasses/${state.user.userID}`);

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
					title="Basic Sorting Preview"
					columns={[
						{ title: 'classCRN', field: 'classCRN' },
						{ title: 'class section', field: 'classSection' },
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
