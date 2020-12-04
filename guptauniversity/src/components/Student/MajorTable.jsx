import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from '../../LoginContext';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';

export default function MajorTable() {
	const [state, setState] = useContext(LoginContext);

	const [majors, setMajors] = useState([]);
	return (
		<div>
			<div style={{ maxWidth: '100%' }}>
				<MaterialTable
					title={<div>
						Your Majors
							<Link to={'/majors'}>
							Add A Major
							</Link>

					</div>}
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
			</div>
		</div>
	);
}
