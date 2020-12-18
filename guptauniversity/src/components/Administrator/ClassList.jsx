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
		const result = await axios(`/api/classes/semester/15`);

		setData(result.data);
	}
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`/api/classes/semester/15`);

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
					title="Class Modifications"
					columns={[
						{ title: 'Course ID', field: 'courseID.courseID', editable: 'onAdd' },

						{ title: 'Class CRN', field: 'classCRN', editable: 'onAdd' },
						{
							title: 'Course Name',
							field: 'courseID.courseName',
							render: (rowData) => (
								<Link to={`/courses/${rowData.courseID.courseID}`}>{rowData.courseID.courseName}</Link>
							),
							editable: 'onAdd',
						},

						{ title: 'Credits', field: 'courseID.numOfCredits', editable: 'onAdd' },
						{ title: 'Department', field: 'courseID.deptID.deptName', editable: 'onAdd' },
						{ title: 'Faculty ID', field: 'fID.userID' },
						{ title: 'Teacher', field: 'fID.userName', editable: 'never' },
						{ title: 'Building Name', field: 'roomID.buildings.buildingName', editable: 'onAdd' },
						{ title: 'Room Number', field: 'roomID.roomNum', editable: 'onAdd' },
						{ title: 'Semester Season', field: 'semesterID.semesterName', editable: 'onAdd' },
						{ title: 'Semester Year', field: 'semesterID.yearNum', editable: 'onAdd' },
						{ title: 'Slot ID', field: 'slotID.slotID' },
						{ title: 'Days of the Week', field: 'slotID.days', editable: 'never' },

						{
							title: 'Start Time',
							field: 'slotID.periodID.startTime',
							editable: 'never',
						},
						{
							title: 'End Time',
							field: 'slotID.periodID.endTime',
							editable: 'never',
						},
						{
							title: 'Student Details',
							render: (rowData) => <Link to={`/classlist/${rowData.classCRN}`}>Class Roster</Link>,
							editable: 'never',
						},
						{
							title: 'Take Todays Attendance',
							render: (rowData) => (
								<Link to={`/classlist/${rowData.classCRN}/attendance`}>Today's Attendance</Link>
							),
							editable: 'never',
						},
					]}
					data={data}
					options={{
						sorting: true,
						searching: true,
						exportButton: true,
						filtering: true,
					}}
					editable={{
						onRowUpdate: async (newData, oldData) => {
							const dataUpdate = [...data];
							const index = oldData.tableData.id;
							dataUpdate[index] = newData;

							await axios.get(`/api/changeteacher/${newData.classCRN}/${newData.fID.userID}`);
							await axios.get(`/api/classes/${newData.classCRN}/${newData.slotID.slotID}`);

							await setData([...dataUpdate]);
							const result = await axios(`/api/classes/semester/15`);
							setData(result.data);
						},
						onRowAddCancelled: (rowData) => console.log('Row adding cancelled'),
						onRowUpdateCancelled: (rowData) => console.log('Row editing cancelled'),
						onRowAdd: (newData) =>
							new Promise((resolve, reject) => {
								setTimeout(() => {
									/* setData([...data, newData]); */
									console.log(newData);

									resolve();
								}, 1000);
							}),

						onRowDelete: async (oldData) => {
							const dataDelete = [...data];
							console.log(dataDelete);
							const index = oldData.tableData.id;

							dataDelete.splice(index, 1);
							setData([...dataDelete]);
							await cancelClass(oldData.classCRN);
						},
					}}
				/>
			</div>
		</div>
	);
}
