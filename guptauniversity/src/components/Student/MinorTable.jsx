import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from '../../LoginContext';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';

export default function MinorTable() {
	const [state, setState] = useContext(LoginContext);

	const [minors, setminors] = useState([{ minorID: {}, minorID: { department: {} } }]);
	async function dropminor(minorID) {
		let removed = await axios.get(`/api/removeminor/${state.user.userID}/${minorID}`);

		let result = await axios.get(`/api/viewminors/${state.user.userID}`);
		if (!removed.data.done) {
			alert(removed.message);
		}
		setminors(result.data);
	}
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`/api/viewminors/${state.user.userID}`);

			setminors(result.data);
			console.log(result.data);
		};

		fetchData();
	}, []);
	return (
		<div>
			<div style={{ maxWidth: '100%' }}>
				<MaterialTable
					title={
						<h2>
							Your Minors
							<Link to={'/minors'}>Add A Minor</Link>
						</h2>
					}
					columns={[
						{
							title: 'Minor Name',
							field: 'minorID.minorName',
							render: (rowData) => (
								<Link to={`/minorRequirements/${rowData.minorID.minorID}`}>
									{rowData.minorID.minorName}
								</Link>
							),
						},
						{ title: 'Department name', field: 'minorID.department.deptName' },
						{
							title: 'Date Declared',
							field: 'dateDeclared',
							render: (rowData) => <div>{new Date(rowData.dateDeclared).toDateString()}</div>,
						},
					]}
					data={minors}
					options={{
						sorting: true,
						searching: true,
						exportButton: true,
						filtering: true,
					}}
					editable={{
						onRowDelete: async (oldData) => {
							dropminor(oldData.minorID.minorID);
						},
					}}
				/>
			</div>
		</div>
	);
}
