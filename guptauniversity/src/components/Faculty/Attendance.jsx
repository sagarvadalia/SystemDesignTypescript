import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from '../../LoginContext';
import { Link, useParams } from 'react-router-dom';

export default function Attendance() {
	const [data, setData] = useState([{ classCRN: { courseID: {} }, semesterID: {}, sID: {} }]);
	const [state, setState] = useContext(LoginContext);
	let { classCRN } = useParams();
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`/api/faculties/viewEnrollments/${classCRN}`);
			console.log(result.data);
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
					title="Class Details"
					columns={[
						{ title: 'Student ID', field: 'sID.userID', editable: 'never' },
						{
							title: 'Name',
							field: 'sID.userName',
							editable: 'never',
							render: (rowData) => (
								<Link to={`/studentDetails/${rowData.sID.userID}`}>{rowData.sID.userName}</Link>
							),
						},
						{ title: 'Midterm Grade', field: 'midtermGrade' },
						{ title: 'Final Grade', field: 'finalGrade' },
					]}
					data={data}
					options={{
						sorting: true,
					}}
					editable={{
						onBulkUpdate: async (changes) => {
							console.log('here');
							console.log(changes);

							for (const [key, value] of Object.entries(changes)) {
								console.log(value);
								const dataUpdate = [...data];
								const index = value.oldData.tableData.id;
								if (typeof value.newData.finalGrade === 'string') {
									value.newData.finalGrade = value.newData.finalGrade.toUpperCase();
									let stringToCheck = 'ABCDF';
									console.log(dataUpdate);

									if (stringToCheck.includes(value.newData.finalGrade)) {
										dataUpdate[index].finalGrade = value.newData.finalGrade;
										await setData([...dataUpdate]);
										await axios.post('/api/enrollment/finalGrade', {
											classID: value.oldData.classCRN.classCRN,
											sID: value.oldData.sID.userID,
											grade: value.newData.finalGrade,
										});
									}
								} else {
									console.log('INVALID');
								}
								if (typeof value.newData.midtermGrade === 'string') {
									value.newData.midtermGrade = value.newData.midtermGrade.toUpperCase();
									let stringToCheck = 'SU';

									if (stringToCheck.includes(value.newData.midtermGrade)) {
										dataUpdate[index].midtermGrade = value.newData.midtermGrade;
										await setData([...dataUpdate]);
										await axios.post('/api/enrollment/midtermGrade', {
											classID: value.oldData.classCRN.classCRN,
											sID: value.oldData.sID.userID,
											grade: value.newData.midtermGrade,
										});
									}
								}
							}
						},
						onRowUpdate: async (newData, oldData) => {
							const dataUpdate = [...data];
							const index = oldData.tableData.id;
							console.log(newData);
							if (typeof newData.finalGrade === 'string') {
								newData.finalGrade = newData.finalGrade.toUpperCase();
								let stringToCheck = 'ABCDF';

								dataUpdate[index] = newData;
								console.log(newData);
								if (stringToCheck.includes(newData.finalGrade)) {
									await setData([...dataUpdate]);
									await axios.post('/api/enrollment/finalGrade', {
										classID: oldData.classCRN.classCRN,
										sID: oldData.sID.userID,
										grade: newData.finalGrade,
									});
								}
							} else {
								console.log('INVALID');
							}
							if (typeof newData.midtermGrade === 'string') {
								newData.midtermGrade = newData.midtermGrade.toUpperCase();
								let stringToCheck = 'SU';
								dataUpdate[index] = newData;
								if (stringToCheck.includes(newData.midtermGrade)) {
									await setData([...dataUpdate]);
									await axios.post('/api/enrollment/midtermGrade', {
										classID: oldData.classCRN.classCRN,
										sID: oldData.sID.userID,
										grade: newData.midtermGrade,
									});
								}
							}
						},
					}}
				/>
			</div>
		</div>
	);
}
