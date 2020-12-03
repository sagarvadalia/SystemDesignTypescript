import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from './../LoginContext';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
export default function StudentAdvisors() {
	const [state, setState] = useContext(LoginContext);
	const [data, setData] = useState([{ fID: {} }]);
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`/api/advisors/${state.user.userID}`);

			setData(result.data);
		};

		fetchData();
	}, []);

	return (
		<div>
			<div style={{ maxWidth: '100%' }}>
				<MaterialTable
					title={<div>Advisors</div>}
					columns={[
						{ title: 'Name', field: 'fID.userName' },
						{ title: 'Email', field: 'fID.userEmail' },
						{ title: 'Phone Number', field: 'fID.userPhone' },
						{ title: 'Date Assigned', field: 'dateAssigned' },
					]}
					data={data}
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
