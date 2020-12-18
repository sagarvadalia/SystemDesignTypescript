import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from '../../LoginContext';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
export default function Minors() {
	const [state, setState] = useContext(LoginContext);

	async function addMajor(minorID) {
		let minorAdded = await axios.get(`/api/addMinor/${state.user.userID}/${minorID}`);
		console.log(minorAdded);
		if (!minorAdded.data) {
			alert('Failed to declare this Minor');
		}
	}
	const [data, setData] = useState([{ sID: {} }]);
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`/api/minors`);

			setData(result.data);
			console.log(result.data);
		};

		fetchData();
	}, []);

	return (
		<div>
			<div style={{ maxWidth: '100%' }}>
				<MaterialTable
					title={<div>List of All Minors</div>}
					columns={[
						{
							title: 'Name',
							field: 'minorName',
							render: (rowData) => (
								<Link to={`/minorRequirements/${rowData.minorID}`}>{rowData.minorName}</Link>
							),
						},
						{
							title: 'Add Link',
							field: 'minorID',
							render: (rowData) => (
								<Button onClick={() => addMajor(rowData.minorID)}>Add {rowData.minorName} here</Button>
							),
						},
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
