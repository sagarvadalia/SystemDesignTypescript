import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from './../../LoginContext';
import { Link, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
export default function UserList() {
	const [data, setData] = useState([{}]);
	const [state, setState] = useContext(LoginContext);
	async function deleteUser(userID) {
		await axios(`/api/removeUser/${userID}`);
	}
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`/api/users`);

			setData(result.data);
			console.log(result.data);
		};

		fetchData();
	}, []);

	return (
		// API IS HERE https://material-table.com/#/

		<div>
			<div style={{ maxWidth: '100%' }}>
				<MaterialTable
					title="Basic Sorting Preview"
					columns={[
						{ title: 'ID', field: 'userID', editable: 'onAdd' },
						{
							title: 'Name',
							field: 'userName',
						},
						{ title: 'Email Address', field: 'userEmail' },
						{ title: 'Phone Number', field: 'userPhone' },
						{ title: 'Status', field: 'userType' },

						// { title: 'Department', field: 'grade' },
					]}
					data={data}
					options={{
						sorting: true,
						searching: true,
						exporting: true,
					}}
					editable={{
						onRowDelete: async (oldData) => {
							const dataDelete = [...data];
							console.log(dataDelete);
							const index = oldData.tableData.id;

							dataDelete.splice(index, 1);
							setData([...dataDelete]);
							await deleteUser(oldData.userID);
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
