import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from '../../LoginContext';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
export default function Majors() {
	const [state, setState] = useContext(LoginContext);

	async function addMajor(majorID) {
		let majorAdded = await axios.get(`/api/addmajor/${state.user.userID}/${majorID}`);
		console.log(majorAdded);
		if (!majorAdded.data) {
			alert('Failed to declare this major');
		}
	}
	const [data, setData] = useState([{ sID: {} }]);
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`/api/majors`);

			setData(result.data);
		};

		fetchData();
	}, []);

	return (
		<div>
			<div style={{ maxWidth: '100%' }}>
				<MaterialTable
					title={<div>List of All Majors</div>}
					columns={[
						{
							title: 'Name',
							field: 'majorName',
							render: (rowData) => (
								<Link to={`/majorRequirements/${rowData.majorID}`}>{rowData.majorName}</Link>
							),
						},
						{
							title: 'Add Link',
							field: 'majorID',
							render: (rowData) => (
								<Button onClick={() => addMajor(rowData.majorID)}>Add {rowData.majorName} here</Button>
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
