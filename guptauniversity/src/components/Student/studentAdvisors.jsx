import axios from 'axios';
import MaterialTable from 'material-table';
import React, { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../LoginContext';
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
					title={<h2>Advisors</h2>}
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
						filtering: true,
					}}
				/>
			</div>
		</div>
	);
}
