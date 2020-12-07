import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from '../../LoginContext';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
export default function MajorRequirements() {
	const [state, setState] = useContext(LoginContext);
	let { majorID } = useParams();
	const [majorName, setMajorName] = useState({});
	// async function addMajor(majorID) {
	//   let majorAdded = await axios.get(`/api/addmajor/${state.user.userID}/${majorID}`);
	//   console.log(majorAdded);
	//   if (!majorAdded.data) {
	//     alert('Failed to declare this major');
	//   }
	// }
	const [data, setData] = useState([{ courseID: { dept: {} } }]);
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`/api/majorreqs/${majorID}`);

			setData(result.data);
			const major = await axios(`/api/majors/${majorID}`);
			setMajorName(major.data);
			console.log(major.data);
		};

		fetchData();
	}, []);

	return (
		<div>
			<div style={{ maxWidth: '100%' }}>
				<MaterialTable
					title={<div>List of All Requirements for {majorName?.majorName}</div>}
					columns={[
						{ title: 'Course Name', field: 'courseID.courseName' },
						{
							title: 'Course Description',
							field: 'courseID.courseDesc',
						},
						{ title: 'Credits', field: 'courseID.numOfCredits' },
						{ title: 'Department', field: 'courseID.deptID.deptName' },
						{ title: 'Grade Required', field: 'gradeRequired' },
					]}
					data={data}
					options={{
						sorting: true,
						searching: true,
						exportButton: true,
					}}
				/>
			</div>
		</div>
	);
}
