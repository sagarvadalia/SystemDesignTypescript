import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

import { Link, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
export default function DataView() {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`/api/data`);
			console.log(data);
			setData(result.data);
		};

		fetchData();
	}, []);

	return (
		<div>
			<div style={{ maxWidth: '100%' }}>
				<MaterialTable
					title={<div>Public data for Gupta University</div>}
					columns={[
						{ title: 'Total Classes', field: 'classCnt' },
						{ title: 'Total Student', field: 'studentCnt' },

						{ title: 'Total Grad Students ', field: 'totalGrad' },
						{ title: 'Total Undergrad Students ', field: 'totalUnGrad' },
						{
							title: 'Total Faculty',
							field: 'facCnt',
						},
						{ title: 'Total Full Time Faculty', field: 'totalFullTimeFac' },
						{ title: 'Total Part Time Faculty', field: 'totalPartTimeFac' },
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
