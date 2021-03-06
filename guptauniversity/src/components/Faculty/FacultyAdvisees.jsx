import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from './../../LoginContext';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
export default function FacultyAdvisees() {
	const [state, setState] = useContext(LoginContext);
	const [data, setData] = useState([{ sID: {} }]);
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`/api/faculties/facultyAdvisees/${state.user.userID}`);

			setData(result.data);
		};

		fetchData();
	}, []);

	return (
		<div>
			<div style={{ maxWidth: '100%' }}>
				<MaterialTable
					title={<h2>Advisees</h2>}
					columns={[
						{
							title: 'Name',
							field: 'sID.userName',
							render: (rowData) => (
								<Link to={`/studentDetails/${rowData.sID.userID}`}>{rowData.sID.userName}</Link>
							),
						},
						{ title: 'Email', field: 'sID.userEmail' },
						{ title: 'Phone Number', field: 'sID.userPhone' },
						{ title: 'Date Assigned', field: 'dateAssigned' },
					]}
					data={data}
					options={{
						sorting: true,
						searching: true,
						exportButton: true,
						filtering: true,
					}}
				/>
			</div>
		</div>
	);
}
