import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from './../../LoginContext';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
export default function EditMasterSchedule() {
	async function dataFetch(value) {
		const result = await axios(`/api/classes/semester/${value}`);

		setData(result.data);
		console.log(data);
	}

	const [data, setData] = useState([
		{ courseID: { deptID: {} }, fID: {}, roomID: { buildings: {} }, slotID: { periodID: {} } },
	]);
	let { semester } = useParams();
	semester = parseInt(semester);
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
	const [state, setState] = useContext(LoginContext);
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`/api/classes/semester/${semester}`);
			console.log(data);
			setData(result.data);
		};
		// console.log('rerender');
		fetchData();
	}, []);

	return (
		<div>
			<div style={{ maxWidth: '100%' }}>
				<MaterialTable
					title={
						<div>
							Master Schedule {semesterVal[semester].semester}
							{semester !== 1 && (
								<Link to={`/editmasterSchedule/${semester - 1}`}>
									<Button onClick={() => dataFetch(semester - 1)}>Previous Semester</Button>
								</Link>
							)}
							{semester !== 16 && (
								<Link to={`/editmasterSchedule/${semester + 1}`}>
									<Button onClick={() => dataFetch(semester + 1)}>Next Semester</Button>
								</Link>
							)}
						</div>
					}
					columns={[
						{ title: 'Class CRN', field: 'classCRN', editable: 'onAdd' },
						{
							title: 'Course Name',
							editable: 'never',
							field: 'courseID.courseName',
							render: (rowData) => (
								<Link to={`/courses/${rowData.courseID.courseID}`}>{rowData.courseID.courseName}</Link>
							),
						},

						{ title: 'Department ID', field: 'courseID.deptID.deptID', editable: 'never' },
						{ title: 'Class Section', field: 'classSection' },
						{ title: 'Faculty ID', field: 'fID.userID' },
						{ title: 'Building ID', field: 'roomID.buildings.buildingID', editable: 'never' },
						{ title: 'Room ID', field: 'roomID.roomID' },

						{ title: 'Total Seats', field: 'totalSeats' },

						{ title: 'Time Slot', field: 'slotID.slotID' },
						{
							title: 'Edit Grades for this class',
							field: '',
							render: (rowData) => <Link to={`/classlist/${rowData.classCRN}`}>Edit Grades</Link>,
						},
					]}
					data={data}
					options={{
						sorting: true,
						searching: true,
						exportButton: true,
					}}
					editable={{
						onBulkUpdate: (changes) =>
							new Promise((resolve, reject) => {
								setTimeout(() => {
									/* setData([...data, newData]); */

									resolve();
								}, 1000);
							}),
						onRowAddCancelled: (rowData) => console.log('Row adding cancelled'),
						onRowUpdateCancelled: (rowData) => console.log('Row editing cancelled'),
						onRowAdd: (newData) =>
							new Promise((resolve, reject) => {
								setTimeout(() => {
									/* setData([...data, newData]); */

									resolve();
								}, 1000);
							}),
						onRowUpdate: async (newData, oldData) => {
							const dataUpdate = [...data];
							const index = oldData.tableData.id;
							dataUpdate[index] = newData;

							await axios(`/api/changeteacher/${newData.classCRN}/${newData.fID.userID}`);
							await axios(`/api/classes/${newData.classCRN}/${newData.slotID.slotID}`);
							await axios(`/api/changeroom/${newData.classCRN}/${newData.roomID.roomID}`);
							await setData([...dataUpdate]);
							const result = await axios(`/api/classes/semester/${semester}`);
							setData(result.data);
						},
						onRowDelete: (oldData) =>
							new Promise((resolve, reject) => {
								setTimeout(() => {
									const dataDelete = [...data];
									const index = oldData.tableData.id;
									dataDelete.splice(index, 1);
									setData([...dataDelete]);

									resolve();
								}, 1000);
							}),
					}}
				/>
			</div>
		</div>
	);
}
