import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from './../LoginContext';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';

export default function Holds() {
	const [state, setState] = useContext(LoginContext);

	const [majors, setMajors] = useState([]);
	const [minors, setMinors] = useState([]);
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
					data={majors}
					options={{
						sorting: true,
						searching: true,
						exportButton: true,
					}}
				/>

				<MaterialTable
					title={<div>Minors</div>}
					columns={[
						{ title: 'Minor Name', field: 'minorID' },
						{ title: 'Department name', field: 'deptID.deptName' },
						{ title: 'Date Declared', field: 'studentMinor.dateDeclared' },
					]}
					data={minors}
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
