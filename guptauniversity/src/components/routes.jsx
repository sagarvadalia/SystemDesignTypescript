import React, { Component, useContext } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Login } from './login';
import Schedule from './schedule';
import StudentTranscript from './studentTranscript';
import { LoginContext } from './../LoginContext';
import StudentClassList from './studentclasslist';
import ClassDetails from './classDetails';
import AcademicCalendar from './academicCalendar';
import NextCalendar from './nextCalendar';
import CourseCatalog from './courseCatalog';
import MasterSchedule from './masterSchedule';
export const Routes = ({}) => {
	const [state, setState] = useContext(LoginContext);

	return (
		<Switch>
			{/* Routes placed here are available to all visitors */}
			<Route path="/login" component={Login} />
			<Route path="/academicCalendar" component={AcademicCalendar} />
			<Route path="/nextCalendar" component={NextCalendar} />
			<Route path="/course-catalog" component={CourseCatalog} />
			<Route path="/masterSchedule/:semester" component={MasterSchedule} />
			{/* we need to change this to match the student id */}

			{state?.user?.userType === 'Student' && (
				<Switch>
					<Route path="/student-transcript" component={StudentTranscript} />
				</Switch>
			)}
			{state?.user?.userType === 'Faculty' && (
				<Switch>
					<Route exact path="/classlist" component={StudentClassList} />
					<Route path="/classlist/studentDetails" component={ClassDetails} />
				</Switch>
			)}

			{/* IF FACULTY */}

			{/* Displays our Login component as a fallback */}
			<Route component={Schedule} />
		</Switch>
	);
};
