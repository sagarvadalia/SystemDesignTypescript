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
		// API IS HERE https://material-table.com/#/

		<div>
			{/* <pre>{JSON.stringify(data)}</pre> */}

			<div style={{ maxWidth: '100%' }}>
				<MaterialTable
					title={
						<div>
							Master Schedule
							{semester !== 1 && (
								<Link to={`/masterSchedule/${semester - 1}`}>
									<Button onClick={() => dataFetch(semester - 1)}>Previous Semester</Button>
								</Link>
							)}
							{semester !== 10 && (
								<Link to={`/masterSchedule/${semester + 1}`}>
									<Button onClick={() => dataFetch(semester + 1)}>Next Semester</Button>
								</Link>
							)}
						</div>
					}
					columns={[
						{ title: 'Class CRN', field: 'classCRN' },
						{
							title: 'Course Name',
							field: 'courseID.courseName',
							render: (rowData) => (
								<Link to={`/courses/${rowData.courseID.courseID}`}>{rowData.courseID.courseName}</Link>
							),
						},
						{ title: 'Course Description', field: 'courseID.courseDesc' },
						{ title: 'Credits', field: 'courseID.numOfCredits' },
						{ title: 'Department', field: 'courseID.deptID.deptName' },
						{ title: 'Teacher', field: 'fID.userName' },
						{ title: 'Building Name', field: 'roomID.buildings.buildingName' },
						{ title: 'Room Number', field: 'roomID.roomNum' },
						{ title: 'Days of the Week', field: 'slotID.days' },
						{
							title: 'Start Time',
							field: 'slotID.periodID.startTime',
						},
						{
							title: 'End Time',
							field: 'slotID.periodID.endTime',
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
						onRowUpdate: (newData, oldData) =>
							new Promise((resolve, reject) => {
								setTimeout(() => {
									const dataUpdate = [...data];
									const index = oldData.tableData.id;
									dataUpdate[index] = newData;
									setData([...dataUpdate]);

									resolve();
								}, 1000);
							}),
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
