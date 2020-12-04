import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from './../LoginContext';

export default function ClassDetails() {
	const [data, setData] = useState([{ classCRN: { courseID: {} }, semesterID: {}, sID: {} }]);
	const [state, setState] = useContext(LoginContext);
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`/api/faculties/viewEnrollments/${1209}`);

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
						{ title: 'Student ID', field: 'sID.userID', editable: 'never' },
						{ title: 'Name', field: 'sID.userName', editable: 'never' },
						{ title: 'Midterm Grade', field: 'midtermGrade', editable: 'onUpdate' },
						{ title: 'Final Grade', field: 'finalGrade', editable: 'onUpdate' },
					]}
					data={data}
					options={{
						sorting: true,
					}}
					editable={{
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
