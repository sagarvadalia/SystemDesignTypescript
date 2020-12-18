import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from '../../LoginContext';
import { Link, useParams } from 'react-router-dom';
export default function StudentDetailsAdminView() {
	const [data, setData] = useState([{ semesterID: {} }]);
	const [state, setState] = useContext(LoginContext);
	let { sID } = useParams();
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`/api/enrollment/${sID}`);
			console.log(result.data);

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
					title="Basic Sorting Preview"
					columns={[
						{ title: 'Class Number', field: 'classNumber' },
						{ title: 'Semester Season', field: 'semester.semesterName' },
						{ title: 'Year', field: 'semester.yearNum' },
						{
							title: 'Course Name',
							field: 'courseName',
						},
						{ title: 'Midterm Grade', field: 'midtermGrade' },
						{ title: 'Grade', field: 'finalGrade' },
					]}
					data={data}
					options={{
						sorting: true,
						searching: true,
						exportButton: true,
						filtering: true,
					}}
					editable={{
						onRowDelete: async (oldData) => {
							const dataDelete = [...data];
							console.log(dataDelete);
							const index = oldData.tableData.id;

							dataDelete.splice(index, 1);
							setData([...dataDelete]);
							// await cancelClass(oldData.classCRN)
						},
						onRowAddCancelled: (rowData) => console.log('Row adding cancelled'),
						onRowAdd: (newData) =>
							new Promise((resolve, reject) => {
								setTimeout(() => {
									/* setData([...data, newData]); */
									console.log(newData);

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
					}}
				/>
			</div>
		</div>
	);
}
