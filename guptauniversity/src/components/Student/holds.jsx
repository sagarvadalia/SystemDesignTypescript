import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from '../../LoginContext';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';

export default function Holds() {
	const [state, setState] = useContext(LoginContext);

	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`/api/holds/${state.user.userID}`);

			setData(result.data);
		};

		fetchData();
	}, []);

	return (
		<div>
			<div style={{ maxWidth: '100%' }}>
				<MaterialTable
					title={<div>Holds</div>}
					columns={[
						{ title: 'Hold Type', field: 'holdType' },
						{ title: 'Hold Description', field: 'holdDescription' },
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
