import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from '../../LoginContext';
import { Link, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
export default function EditStudentHolds() {
	const [data, setData] = useState([{}]);
	const [state, setState] = useContext(LoginContext);
	let { sID } = useParams();
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`/api/holds/${sID}`);

			setData(result.data);
			console.log(result.data);
		};

		fetchData();
	}, []);

	return (
		// API IS HERE https://material-table.com/#/

		<div>
			ABC
			<div style={{ maxWidth: '100%' }}>
				<MaterialTable
					title="Holds"
					columns={[
						{ title: 'Hold ID', field: 'holdID' },
						{ title: 'Type of Hold', field: 'holdType', editable: 'never' },
						{ title: 'Description of Hold', field: 'holdDescription', editable: 'never' },
					]}
					data={data}
					options={{
						sorting: true,
						searching: true,
						exporting: true,
					}}
					editable={{
						onRowUpdate: async (newData, oldData) => {
							const dataUpdate = [...data];
							const index = oldData.tableData.id;
							dataUpdate[index] = newData;

							await axios.get(`/api/removehold/${sID}/${oldData.holdID}`);
							await axios.get(`/api/addhold/${sID}/${newData.holdID}`);
							const result = await axios(`/api/holds/${sID}`);
							await setData([...dataUpdate]);

							setData(result.data);
						},
						onRowUpdateCancelled: (rowData) => console.log('Row editing cancelled'),
						onRowDelete: async (oldData) => {
							const dataDelete = [...data];
							console.log(dataDelete);
							const index = oldData.tableData.id;
							await axios.get(`/api/removehold/${sID}/${oldData.holdID}`);
							dataDelete.splice(index, 1);
							setData([...dataDelete]);
							// await cancelClass(oldData.classCRN)
						},

						onRowAddCancelled: (rowData) => console.log('Row adding cancelled'),
						onRowAdd: async (newData) => {
							await axios.get(`/api/addhold/${sID}/${newData.holdID}`);
							const result = await axios(`/api/holds/${sID}`);

							setData(result.data);
						},
					}}
				/>
			</div>
		</div>
	);
}
