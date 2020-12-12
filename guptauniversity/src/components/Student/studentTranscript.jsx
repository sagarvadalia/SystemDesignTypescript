import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from '../../LoginContext';
import { Link, useParams } from 'react-router-dom';
export default function StudentTranscript() {
	const [data, setData] = useState([{ semesterID: {}, classCRN: { courseID: {} } }]);
	const [state, setState] = useContext(LoginContext);
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`/api/enrollment/${state.user.userID}`);
			console.log(result.data);

			setData(result.data);
		};

		fetchData();
	}, []);

	return (
		<div>
			<div style={{ maxWidth: '100%' }}>
				<MaterialTable
					title="Basic Sorting Preview"
					columns={[
						{ title: 'Class Number', field: 'classNumber' },
						{ title: 'Semester Season', field: 'semester.semesterName' },
						{ title: 'Year', field: 'semester.yearNum' },
						{
							title: 'Course Name',
							field: 'courseName',
							render: (rowData) => (
								<Link to={`/courses/${rowData.classCRN.courseID.courseID}`}>{rowData.courseName}</Link>
							),
						},
						{ title: 'Grade', field: 'finalGrade' },
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
