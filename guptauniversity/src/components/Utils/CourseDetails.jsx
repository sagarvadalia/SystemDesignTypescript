import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from './../../LoginContext';
import { Link, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import history from './../../history';
export default function CourseDetails() {
	const [data, setData] = useState([{ deptID: {} }]);
	const [state, setState] = useContext(LoginContext);
	let { courseID } = useParams();
	courseID = parseInt(courseID);
	async function showPrereq(prereqID) {
		history.push(`/courses/${prereqID}`);
		const result = await axios(`/api/courses/${prereqID}`);
		console.log(result.data);
		setData(result.data);
	}
	useEffect(() => {
		const fetchData = async () => {
			console.log(courseID);
			const result = await axios(`/api/courses/${courseID}`);
			console.log(result.data);
			setData(result.data);
		};

		fetchData();
	}, []);

	return (
		// API IS HERE https://material-table.com/#/

		<div>
			{/* <pre>{JSON.stringify(data)}</pre> */}

			<div style={{ maxWidth: '100%' }}>
				<MaterialTable
					title="Course Details"
					columns={[
						{ title: 'Course ID', field: 'courseID' },
						{ title: 'Course Name', field: 'courseName' },
						{ title: 'Course Description', field: 'courseDesc' },
						{ title: 'Credits', field: 'numOfCredits' },
						{ title: 'Department', field: 'deptID.deptName' },
						{
							title: 'Prerequisites',
							render: (rowData) => (
								<div>
									{rowData?.prereqs?.map((prereq) => (
										<Button onClick={() => showPrereq(prereq.prereqID)}>
											{`CourseID: ${prereq.prereqID} Grade Required: \n ${prereq.gradeRequired} \n`}
										</Button>
									))}
								</div>
							),
						},
					]}
					data={[data]}
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
