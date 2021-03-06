import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from '../../LoginContext';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';

export default function MajorTable() {
	const [state, setState] = useContext(LoginContext);

	const [majors, setMajors] = useState([{ majorID: {}, majorID: { department: {} } }]);
	async function dropMajor(majorID) {
		let removed = await axios.get(`/api/removeMajor/${state.user.userID}/${majorID}`);

		let result = await axios.get(`/api/viewMajors/${state.user.userID}`);
		if (!removed.data.done) {
			alert(removed.message);
		}
		setMajors(result.data);
	}
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`/api/viewMajors/${state.user.userID}`);

			setMajors(result.data);
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
							Your Majors
							<Link to={'/majors'}>Add A Major</Link>
						</h2>
					}
					columns={[
						{
							title: 'Major Name',
							field: 'majorID.majorName',
							render: (rowData) => (
								<Link to={`/majorRequirements/${rowData.majorID.majorID}`}>
									{rowData.majorID.majorName}
								</Link>
							),
						},
						{ title: 'Department name', field: 'majorID.department.deptName' },
						{
							title: 'Date Declared',
							field: 'dateDeclared',
							render: (rowData) => <div>{new Date(rowData.dateDeclared).toDateString()}</div>,
						},
						{
							title: 'View Degree Evaluation',
							field: '',
							render: (rowData) => (
								<Link to={`/degreeAudit/${rowData.majorID.majorID}`}>
									View Degree Audit for this major here
								</Link>
							),
						},
					]}
					data={majors}
					options={{
						sorting: true,
						searching: true,
						exportButton: true,
						filtering: true,
					}}
					editable={{
						onRowDelete: async (oldData) => {
							dropMajor(oldData.majorID.majorID);
						},
					}}
				/>
			</div>
		</div>
	);
}
