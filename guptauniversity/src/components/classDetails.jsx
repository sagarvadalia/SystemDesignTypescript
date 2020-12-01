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
						{ title: 'Grade', field: 'grade', editable: 'onUpdate' },
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
							if (typeof newData.grade === 'string') {
								newData.grade = newData.grade.toUpperCase();
								let stringToCheck = 'ABCDF';

								dataUpdate[index] = newData;
								console.log(newData);
								if (stringToCheck.includes(newData.grade)) {
									await setData([...dataUpdate]);
									await axios.post('/api/enrollment/changeGrade', {
										classID: oldData.classCRN.classCRN,
										sID: oldData.sID.userID,
										grade: newData.grade,
									});
								}
							} else {
								console.log('INVALID');
							}
						},
					}}
				/>
			</div>
		</div>
	);
}
