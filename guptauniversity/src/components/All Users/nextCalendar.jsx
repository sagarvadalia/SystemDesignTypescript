import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from '../../LoginContext';
import { Link } from 'react-router-dom';
export default function NextCalendar() {
	const [data, setData] = useState([
		{
			Date: 'Jan 21 2021 (All day) to Jan 22 2021 (All day)',
			'Academic Event': 'Advising for All students',
		},
		{
			Date: 'Jan 24 2021 (All day)',
			'Academic Event': 'Residence Halls Open for all new students (First-Year and Transfer)',
		},
		{
			Date: 'Jan 24 2021 (All day)',
			'Academic Event': 'Residence Halls Open for all returning students',
		},
		{
			Date: 'Jan 25 2021 (All day) to Feb 1 2021 (All day)',
			'Academic Event': 'Add/Drop (no fee) / Late Registration ($50 fee) on the Web (connect.oldwestbury.edu)',
		},
		{
			Date: 'Jan 25 2021 (All day)',
			'Academic Event': 'First Day of Classes',
		},
		{
			Date: 'Feb 15 2021 (All day)',
			'Academic Event': 'Presidents Day – no classes',
		},
		{
			Date: 'Mar 1 2021 (All day)',
			'Academic Event':
				'Applications for Graduation (Registrar’s Office) due from candidates expecting to complete requirements by Spring 2021 or Summer 2021',
		},
		{
			Date: 'Mar 1 2021 (All day)',
			'Academic Event': 'Advising begins in academic department offices for Fall 2021 registration',
		},
		{
			Date: 'Mar 8 2021 (All day) to Mar 13 2021 (All day)',
			'Academic Event': 'Mid-Term week',
		},
		{
			Date: 'Mar 22 2021 (All day)',
			'Academic Event': 'Mid-term advisory grades due',
		},
		{
			Date: 'Mar 26 2021 (All day)',
			'Academic Event': 'Dining Hall closes after breakfast',
		},
		{
			Date: 'Mar 27 2021 (All day) to Apr 2 2021 (All day)',
			'Academic Event': 'Spring Break – no classes',
		},
		{
			Date: 'Apr 4 2021 (All day)',
			'Academic Event': 'Dining Hall reopens for dinner',
		},
		{
			Date: 'Apr 5 2021 (All day)',
			'Academic Event': 'Classes resume',
		},
		{
			Date: 'Apr 5 2021 (All day)',
			'Academic Event': 'Fall 2021 registration for Seniors on the Web (connect.oldwestbury.edu)',
		},
		{
			Date: 'Apr 8 2021 (All day)',
			'Academic Event': 'Fall 2021 registration for Juniors on the Web (connect.oldwestbury.edu)',
		},
		{
			Date: 'Apr 12 2021 (All day)',
			'Academic Event': 'Fall 2021 registration for Sophomores on the Web (connect.oldwestbury.edu)',
		},
		{
			Date: 'Apr 15 2021 (All day)',
			'Academic Event': 'Fall 2021 registration for First-Years on the Web (connect.oldwestbury.edu)',
		},
		{
			Date: 'Apr 16 2021 (All day)',
			'Academic Event':
				'Continuing Registration for Fall 2021 for all students on the Web (connect.oldwestbury.edu)',
		},
		{
			Date: 'Apr 29 2021 (All day)',
			'Academic Event': 'Honors Convocation – classes cancelled from 2 pm – 6 pm',
		},
		{
			Date: 'May 11 2021 (All day) to May 12 2021 (All day)',
			'Academic Event': 'Study /Make-Up Days',
		},
		{
			Date: 'May 13 2021 (All day) to May 19 2021 (All day)',
			'Academic Event': 'Final Exams (grades due to Registrar 48 hours after scheduled final examination period)',
		},
		{
			Date: 'May 19 2021 (All day)',
			'Academic Event': 'Residence Halls close at 10 pm',
		},
		{
			Date: 'May 19 2021 (All day)',
			'Academic Event': 'Spring Semester ends after last examination',
		},
		{
			Date: 'May 23 2021 (All day)',
			'Academic Event': 'Commencement (Date to be confirmed in Fall 2020)',
		},
		{
			Date: 'May 23 2021 (All day)',
			'Academic Event': 'Graduating students check out of Residence Halls at 3 pm',
		},
	]);
	const [state, setState] = useContext(LoginContext);

	return (
		<div>
			<div style={{ maxWidth: '100%' }}>
				<MaterialTable
					title={
						<h2>
							Academic Calendar Spring 2021
							<Link to={'/academicCalendar'}>
								<button> Previous Semester </button>
							</Link>
						</h2>
					}
					columns={[
						{ title: 'Date ', field: 'Date' },
						{ title: 'Academic Event', field: 'Academic Event' },
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
