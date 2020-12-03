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
					title={<div>Majors</div>}
					columns={[
						{ title: 'Major Name', field: 'majorID' },
						{ title: 'Department name', field: 'deptID.deptName' },
						{ title: 'Date Declared', field: 'studentMinor.dateDeclared' },
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

				<MaterialTable
					title={<div>Minors</div>}
					columns={[
						{ title: 'Minor Name', field: 'minorID' },
						{ title: 'Department name', field: 'deptID.deptName' },
						{ title: 'Date Declared', field: 'studentMinor.dateDeclared' },
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
