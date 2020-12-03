import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from './../LoginContext';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
export default function MasterSchedule() {
	const tableRef = React.createRef();
	const [data, setData] = useState([{ fID: {} }]);

	const [state, setState] = useContext(LoginContext);
	return (
		<div>
			<div style={{ maxWidth: '100%' }}>
				<MaterialTable
					title={<div>Advisors</div>}
					columns={[
						{ title: 'Name', field: 'fid.userName' },
						{ title: 'Email', field: 'fid.userEmail' },
						{ title: 'Phone Number', field: 'fid.userPhone' },
						{ title: 'Date Assigned', field: 'dateAssigned' },
					]}
					data={async () => await axios(`/api/classes/semester/${state.user.userID}`)}
					options={{
						sorting: true,
						searching: true,
						exportButton: true,
					}}
					tableRef={tableRef}
					actions={[
						{
							icon: 'refresh',
							tooltip: 'Refresh Data',
							isFreeAction: true,
							onClick: () => tableRef.current && tableRef.current.onQueryChange(),
						},
					]}
				/>
			</div>
		</div>
	);
}
