import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from './../LoginContext';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
export default function MasterSchedule() {
	async function dataFetch(value) {
		const result = await axios(`/api/classes/semester/${value}`);

		setData(result.data);
		console.log(data);
	}
	const tableRef = React.createRef();
	const [data, setData] = useState([{ courseID: { deptID: {} }, fID: {} }]);
	let { semester } = useParams();
	semester = parseInt(semester);
	let semesterVal = {
		1: { semester: `Fall 2016` },
		2: { semester: `Spring 2017` },
		3: { semester: `Fall 2017` },
		4: { semester: `Spring 2018` },
		5: { semester: `Fall 2018` },
		6: { semester: `Spring 2019` },
		7: { semester: `Fall 2019` },
		8: { semester: `Spring 2020` },
		9: { semester: `Fall 2020` },
		10: { semester: `Spring 2021` },
	};
	const [state, setState] = useContext(LoginContext);
	useEffect(() => {
		const fetchData = async () => {
			// const result = await axios(`/api/classes/semester/${semester}`);
			// console.log(data);
			// setData(result.data);
		};
		// console.log('rerender');
		fetchData();
	}, []);

	return (
		// API IS HERE https://material-table.com/#/

		<div>
			{/* <pre>{JSON.stringify(data)}</pre> */}

			<div style={{ maxWidth: '100%' }}>
				<MaterialTable
					title={
						<div>
							Master Schedule
							{semester !== 1 && (
								<Link to={`/masterSchedule/${semester - 1}`}>
									<Button onClick={() => dataFetch(semester - 1)}>Previous Semester</Button>
								</Link>
							)}
							{semester !== 10 && (
								<Link to={`/masterSchedule/${semester + 1}`}>
									<Button onClick={() => dataFetch(semester + 1)}>Next Semester</Button>
								</Link>
							)}
						</div>
					}
					columns={[
						{ title: 'Class CRN', field: 'classCRN' },
						{ title: 'Course Name', field: 'courseID.courseName' },
						{ title: 'Course Description', field: 'courseID.courseDesc' },
						{ title: 'Credits', field: 'courseID.numOfCredits' },
						{ title: 'Department', field: 'courseID.deptID.deptName' },
						{ title: 'Teacher', field: 'fID.userName' },
					]}
					data={async () => await axios(`/api/classes/semester/${semester}`)}
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
