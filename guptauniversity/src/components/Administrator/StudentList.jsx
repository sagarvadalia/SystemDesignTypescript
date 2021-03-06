import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from './../../LoginContext';
import { Link, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
export default function StudentList() {
	const [data, setData] = useState([{}]);
	const [state, setState] = useContext(LoginContext);
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`/api/students`);

			setData(result.data);
			console.log(result.data);
		};

		fetchData();
	}, []);
	async function deleteUser(userID) {
		console.log('userID', userID);
		await axios(`/api/removeUser/${userID}`);
	}
	return (
		// API IS HERE https://material-table.com/#/

		<div>
			<div style={{ maxWidth: '100%' }}>
				<MaterialTable
					title="All Student Details"
					columns={[
						{ title: 'ID', field: 'userID', editable: 'onAdd' },
						{
							title: 'Name',
							field: 'userName',
							render: (rowData) => <Link to={`/studentlist/${rowData.userID}`}>{rowData.userName}</Link>,
						},
						{ title: 'GPA', field: 'sGPA' },
						{ title: 'Credits', field: 'totalCredits' },
						{ title: 'Student Type', field: 'studentType' },
						{
							title: 'Edit Holds Here',
							field: '',
							render: (rowData) => (
								<div>
									<Link to={`/studentlist/${rowData.userID}/holds`}>View Holds</Link>
								</div>
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
						onRowDelete: async (oldData) => {
							const dataDelete = [...data];
							console.log(dataDelete);
							const index = oldData.tableData.id;

							dataDelete.splice(index, 1);
							setData([...dataDelete]);
							await deleteUser(oldData.userID);
						},
						onRowAddCancelled: (rowData) => console.log('Row adding cancelled'),
						// onRowAdd: (newData) =>
						// 	new Promise((resolve, reject) => {
						// 		setTimeout(() => {
						// 			/* setData([...data, newData]); */
						// 			console.log(newData);

						// 			resolve();
						// 		}, 1000);
						// 	}),
						// onRowUpdate: (newData, oldData) =>
						// 	new Promise((resolve, reject) => {
						// 		setTimeout(() => {
						// 			const dataUpdate = [...data];
						// 			const index = oldData.tableData.id;
						// 			dataUpdate[index] = newData;
						// 			setData([...dataUpdate]);

						// 			resolve();
						// 		}, 1000);
						// 	}),
					}}
				/>
			</div>
		</div>
	);
}
