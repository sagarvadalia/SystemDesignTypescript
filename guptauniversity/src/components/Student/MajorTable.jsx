import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from '../../LoginContext';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';

export default function MajorTable() {
	const [state, setState] = useContext(LoginContext);

	const [majors, setMajors] = useState([{ majorID: {}, majorID: { department: {} } }]);
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
						<div>
							Your Majors
							<Link to={'/majors'}>Add A Major</Link>
						</div>
					}
					columns={[
						{ title: 'Major Name', field: 'majorID.majorName' },
						{ title: 'Department name', field: 'majorID.department.deptName' },
						{
							title: 'Date Declared',
							field: 'dateDeclared',
							render: (rowData) => <div>{new Date(rowData.dateDeclared).toDateString()}</div>,
						},
					]}
					data={majors}
					options={{
						sorting: true,
						searching: true,
						exportButton: true,
					}}
				/>
			</div>
		</div>
	);
}
