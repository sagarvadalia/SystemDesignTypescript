import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from '../../LoginContext';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
export default function ClassList() {
	const [data, setData] = useState([{ courseID: {}, semesterID: {} }]);
	const [state, setState] = useContext(LoginContext);
	async function cancelClass(classCRN) {
		let val = await axios.delete(`/api/removeclass/${classCRN}`);
		console.log(val);
		const result = await axios(`/api/classes/semester/9`);

		setData(result.data);
	}
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`/api/classes/semester/9`);

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
						{ title: 'Course ID', field: 'courseID.courseID' },

						{ title: 'Class CRN', field: 'classCRN' },
						{
							title: 'Course Name',
							field: 'courseID.courseName',
							render: (rowData) => (
								<Link to={`/courses/${rowData.courseID.courseID}`}>{rowData.courseID.courseName}</Link>
							),
						},

						{ title: 'Credits', field: 'courseID.numOfCredits' },
						{ title: 'Department', field: 'courseID.deptID.deptName' },
						{ title: 'Teacher', field: 'fID.userName' },
						{ title: 'Building Name', field: 'roomID.buildings.buildingName' },
						{ title: 'Room Number', field: 'roomID.roomNum' },
						{ title: 'Semester Season', field: 'semesterID.semesterName' },
						{ title: 'Semester Year', field: 'semesterID.yearNum' },
						{ title: 'Days of the Week', field: 'slotID.days' },
						{
							title: 'Start Time',
							field: 'slotID.periodID.startTime',
						},
						{
							title: 'End Time',
							field: 'slotID.periodID.endTime',
						},
						{
							title: 'Student Details',
							render: (rowData) => <Link to={'/classlist/studentDetails'}>Class Roster</Link>,
						},
						{
							title: 'Cancel this Class',
							render: (rowData) => (
								<Button onClick={() => cancelClass(rowData.classCRN)}>Cancel this Class</Button>
							),
						},
					]}
					data={data}
					options={{
						sorting: true,
					}}
					editable={{
						onRowUpdate: async (newData, oldData) => {
							const dataUpdate = [...data];
							const index = oldData.tableData.id;
							dataUpdate[index] = newData;
							await setData([...dataUpdate]);
						},
					}}
				/>
			</div>
		</div>
	);
}
