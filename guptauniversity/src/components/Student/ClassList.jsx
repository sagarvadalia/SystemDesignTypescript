import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from './../../LoginContext';
import { Link, useParams } from 'react-router-dom';
export default function ClassList() {
	const [data, setData] = useState([{ semesterID: {}, courseName: 'test', deptID: {} }]);
	const [state, setState] = useContext(LoginContext);
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`/api/courses`);

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
					title="Class List"
					columns={[
						{ title: 'Course ID', field: 'courseID' },
						{
							title: 'Course Name',
							field: 'courseName',
							render: (rowData) => <Link to={`/courses/${rowData.courseID}`}>{rowData.courseName}</Link>,
						},
						{ title: 'Course Description', field: 'courseDesc' },
						{ title: 'Credits', field: 'numOfCredits' },
						{ title: 'Department', field: 'deptID.deptName' },

						// { title: 'Department', field: 'grade' },
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
