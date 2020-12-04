import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from '../../LoginContext';

export default function StudentSchedule() {
	const [data, setData] = useState([{ classCRN: { courseID: {} }, fID: {}, slotID: { days: '', periodID: {} } }]);
	const [state, setState] = useContext(LoginContext);
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`/api/enrollment/studentHistoryBySemester/${state.user.userID}/9`);

			setData(result.data);
		};

		fetchData();
	}, []);

	return (
		// API IS HERE https://material-table.com/#/

		<div>
			<div style={{ maxWidth: '100%' }}>
				<MaterialTable
					title="Current Semester Schedule"
					columns={[
						{ title: 'Course ID', field: 'classCRN.courseID.courseID' },
						{ title: 'Course Name', field: 'classCRN.courseID.courseName' },
						{ title: 'Course Description', field: 'classCRN.courseID.courseDescription' },
						{ title: 'Credits', field: 'classCRN.courseID.numOfCredits' },
						{ title: 'Teacher Name', field: 'classCRN.fID.userName' },
						{ title: 'Days of the Week', field: 'classCRN.slotID.days' },
						{ title: 'Start Time', field: 'classCRN.slotID.periodID.startTime' },
						{ title: 'End Time', field: 'classCRN.slotID.periodID.endTime' },
					]}
					data={data}
					options={{
						sorting: true,
					}}
				/>
			</div>
		</div>
	);
}
