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
		const result = await axios(`/api/classes`);

		setData(result.data);
	}
	async function dataEdit(newData) {
		let classCRN = newData.classCRN;
		let totalSeats = newData.totalSeats;
		let room = newData.roomID.roomID;
		let teacher = newData.fID.userID;
		let time = newData.slotID.slotID;
		let section = newData.classSection;

		let result = await axios(`/api/changeClassSection/${classCRN}/${section}`);
		console.log(result);
		if (!result.data.done) {
			alert(result.data.msg);
			return false;
		}
		result = await axios(`/api/changeTotalSeats/${classCRN}/${totalSeats}`);
		if (!result.data.done) {
			alert(result.data.msg);
			return false;
		}
		result = await axios(`/api/changeroom/${classCRN}/${room}`);
		console.log(result);
		if (!result.data.done) {
			alert(result.data.msg);
			return false;
		}
		result = await axios(`/api/changeteacher/${classCRN}/${teacher}`);
		console.log(result);
		if (!result.data.done) {
			alert(result.data.msg);
			return false;
		}
		result = await axios(`/api/classes/${classCRN}/${time}`);
		console.log(result);
		if (!result.data.done) {
			alert(result.data.msg);
			return false;
		}
		return true;
	}
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`/api/classes`);

			setData(result.data);
			console.log(result.data);
		};

		fetchData();
	}, []);

	return (
		// API IS HERE https://material-table.com/#/

		<div>
			{/* <pre>{JSON.stringify(data)}</pre>s */}

			<div style={{ maxWidth: '100%' }}>
				<MaterialTable
					title={<h2>Class Modifications</h2>}
					columns={[
						{ title: 'Course ID', field: 'courseID.courseID', editable: 'onAdd' },

						{ title: 'Class CRN', field: 'classCRN' },
						{ title: 'Class Section', field: 'classSection' },
						{
							title: 'Course Name',
							field: 'courseID.courseName',
							render: (rowData) => (
								<Link to={`/courses/${rowData.courseID.courseID}`}>{rowData.courseID.courseName}</Link>
							),
							editable: 'never',
						},

						{ title: 'Credits', field: 'courseID.numOfCredits', editable: 'never' },
						{ title: 'Department', field: 'courseID.deptID.deptName', editable: 'never' },
						{ title: 'Faculty ID', field: 'fID.userID' },
						{ title: 'Teacher', field: 'fID.userName', editable: 'never' },
						{ title: 'Building Name', field: 'roomID.buildings.buildingName', editable: 'never' },
						{ title: 'Room Number', field: 'roomID.roomID' },
						{ title: 'Total Seats', field: 'totalSeats' },
						{ title: 'Semester ID', field: 'semesterID.semesterID', editable: 'onAdd' },
						{ title: 'Semester Season', field: 'semesterID.semesterName', editable: 'never' },
						{ title: 'Semester Year', field: 'semesterID.yearNum', editable: 'never' },
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

							let result = await dataEdit(newData);

							if (result) {
								await setData([...dataUpdate]);
								const result = await axios(`/api/classes`);
								setData(result.data);
							}
						},
						onRowAddCancelled: (rowData) => console.log('Row adding cancelled'),
						onRowUpdateCancelled: (rowData) => console.log('Row editing cancelled'),
						onRowAdd: async (newData) => {
							let courseID = newData.courseID.courseID;
							let classCRN = newData.classCRN;
							let section = newData.classSection;
							let fID = newData.fID.userID;
							let roomID = newData.roomID.roomID;
							let totalSeats = newData.totalSeats;
							let timeslot = newData.slotID.slotID;
							let semesterID = newData.semesterID.semesterID;
							let newCourse = await axios.get(
								`/api/addClassToMasterSchedule/${classCRN}/${section}/${fID}/${roomID}/${totalSeats}/${totalSeats}/${timeslot}/${courseID}/${semesterID}`,
							);
							if (!newCourse.data.done) {
								alert(newCourse.data.msg);
							}
							console.log('new course, ', newCourse);
							console.log('adding stuff');
							const result = await axios(`/api/classes`);
							console.log(data);
							setData(result.data);
						},

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
