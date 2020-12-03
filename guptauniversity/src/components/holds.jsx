import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from './../LoginContext';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';

export default function Holds() {
	const [state, setState] = useContext(LoginContext);

	const tableRef = React.createRef();
	const [data, setData] = useState([]);

	return (
		<div>
			<div style={{ maxWidth: '100%' }}>
				<MaterialTable
					title={<div>Holds</div>}
					columns={[
						{ title: 'Hold Type', field: 'holdType' },
						{ title: 'Hold Description', field: 'holdDescription' },
						{ title: 'Hold Amount', field: 'holdAmount' },
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
