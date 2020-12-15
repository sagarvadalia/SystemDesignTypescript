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
	async function editUser(newData, oldData) {
		await axios.post(
			`/api/updateUser/${oldData.userID}/${newData.userName}/${newData.userPhone}/${newData.userEmail}`,
		);
		const result = await axios(`/api/users`);
		console.log(oldData);
		console.log(newData);
		setData(result.data);
	}
	async function createUser(newData) {
		console.log(newData);
		await axios(
			`/api/createUser/${newData.userID}/${newData.userPhoned}/${newData.userName}/default/${newData.userAddress}/${newData.userEmail}/${newData.userType}`,
		);
		const result = await axios(`/api/users`);

		setData(result.data);
		console.log(result.data);
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
					title="User List"
					columns={[
						{ title: 'ID', field: 'userID', editable: 'onAdd' },
						{
							title: 'Name',
							field: 'userName',
						},
						{ title: 'Email Address', field: 'userEmail' },
						{ title: 'Phone Number', field: 'userPhone' },
						{ title: 'Status', field: 'userType', editable: 'onAdd' },

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
						onRowAdd: async (newData) => {
							await createUser(newData);
						},
						onRowUpdate: async (newData, oldData) => {
							const dataUpdate = [...data];
							const index = oldData.tableData.id;
							dataUpdate[index] = newData;
							editUser(newData, oldData);
							setData([...dataUpdate]);
						},
					}}
				/>
			</div>
		</div>
	);
}
