import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from './../LoginContext';
import { Link } from 'react-router-dom';
export default function AcademicCalendar() {
	const [data, setData] = useState([
		{
			Date: 'Aug 17 2020 (All day) to Sep 4 2020 (All day)',
			'Academic Event': 'Advising for All students',
		},
		{
			Date: 'Aug 31 2020 (All day) to Sep 7 2020 (All day)',
			'Academic Event': 'Add/Drop (no fee) / Late Registration ($50 fee) on the Web (connect.oldwestbury.edu)',
		},
		{
			Date: 'Aug 31 2020 (All day)',
			'Academic Event': 'First Day of Classes',
		},
		{
			Date: 'Sep 7 2020 (All day)',
			'Academic Event': 'Labor Day – no classes, offices closed',
		},
		{
			Date: 'Oct 1 2020 (All day)',
			'Academic Event':
				'Applications for Graduation (Registrar’s Office) due from candidates expecting to complete requirements by Fall 2020 or Winter 2021',
		},
		{
			Date: 'Oct 1 2020 (All day)',
			'Academic Event': 'Advising begins for Spring 2021 registration',
		},
		{
			Date: 'Oct 12 2020 (All day)',
			'Academic Event': 'Columbus Day – no classes, offices closed',
		},
		{
			Date: 'Oct 17 2020 (All day) to Oct 23 2020 (All day)',
			'Academic Event': 'Mid-Term week',
		},
		{
			Date: 'Oct 26 2020 (All day)',
			'Academic Event': 'Mid-term advisory grades due',
		},
		{
			Date: 'Nov 2 2020 (All day)',
			'Academic Event': 'Spring 2021 registration for Seniors on the Web (connect.oldwestbury.edu)',
		},
		{
			Date: 'Nov 3 2020 (All day)',
			'Academic Event': 'Election Day – classes in session',
		},
		{
			Date: 'Nov 6 2020 (All day)',
			'Academic Event': 'Spring 2021 registration for Juniors on the Web (connect.oldwestbury.edu)',
		},
		{
			Date: 'Nov 11 2020 (All day)',
			'Academic Event': 'Veterans Day – classes in session',
		},
		{
			Date: 'Nov 11 2020 (All day)',
			'Academic Event': 'Spring 2021 registration for Sophomores on the Web (connect.oldwestbury.edu)',
		},
		{
			Date: 'Nov 16 2020 (All day)',
			'Academic Event': 'Spring 2021 registration for First-Years on the Web (connect.oldwestbury.edu)',
		},
		{
			Date: 'Nov 17 2020 (All day)',
			'Academic Event':
				'Continuing Registration for Spring 2021 for all students on the Web (connect.oldwestbury.edu)',
		},
		{
			Date: 'Nov 26 2020 (All day) to Nov 27 2020 (All day)',
			'Academic Event': 'Thanksgiving Recess – no classes',
		},
		{
			Date: 'Nov 30 2020 (All day)',
			'Academic Event': 'Classes resume via remote instruction only',
		},
		{
			Date: 'Dec 9 2020 (All day)',
			'Academic Event': 'Follows MONDAY schedule',
		},
		{
			Date: 'Dec 14 2020 (All day) to Dec 15 2020 (All day)',
			'Academic Event': 'Study /Make-Up Days',
		},
		{
			Date: 'Dec 16 2020 (All day) to Dec 22 2020 (All day)',
			'Academic Event': 'Final Exams (grades due to Registrar 48 hours after scheduled final examination period)',
		},
		{
			Date: 'Dec 22 2020 (All day)',
			'Academic Event': 'Fall Semester ends after last examination',
		},
	]);
	const [state, setState] = useContext(LoginContext);

	return (
		// API IS HERE https://material-table.com/#/

		<div>
			{/* <pre>{JSON.stringify(data)}</pre>s */}

			<div style={{ maxWidth: '100%' }}>
				<MaterialTable
					title={
						<div>
							Academic Calendar Fall 2020
							<Link to={'/nextCalendar'}>
								<button> Next Semester </button>
							</Link>
						</div>
					}
					columns={[
						{ title: 'Date', field: 'Date' },
						{ title: 'Academic Event', field: 'Academic Event' },
					]}
					data={data}
					options={{
						sorting: true,
						searching: true,
						export: true,
					}}
				/>
			</div>
		</div>
	);
}
