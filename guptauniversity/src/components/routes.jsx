import React, { Component, useContext } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Login } from './login';
import Schedule from './schedule';
import StudentTranscript from './Student/studentTranscript';
import { LoginContext } from './../LoginContext';
import StudentClassList from './Faculty/studentclasslist';
import ClassDetails from './Faculty/classDetails';
import AcademicCalendar from './academicCalendar';
import NextCalendar from './nextCalendar';
import CourseCatalog from './courseCatalog';
import MasterSchedule from './masterSchedule';
import StudentSchedule from './Student/studentSchedule';
import Homepage from './homepage';
import StudentAdvisors from './Student/studentAdvisors';
import FacultySchedule from './Faculty/FacultySchedule';
import FacultyAdvisees from './Faculty/FacultyAdvisees';
import StudentDetails from './Faculty/StudentDetails';
import Majors from './Student/Majors';
import Registration from './Student/Registration';
import CourseDetails from './Utils/CourseDetails';
import Minors from './Student/Minors';
import MajorReqsTable from './Student/MajorReqsTable';
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
			<Route path="/studentSchedule/:semester" component={StudentSchedule} />
			<Route exact path="/" component={Homepage} />
			<Route exact path="/majors" component={Majors} />
			<Route exact path="/majorRequirements/:majorID" component={MajorReqsTable} />
			<Route exact path="/minors" component={Minors} />
			<Route exact path="/courses/:courseID" component={CourseDetails} />
			{/* we need to change this to match the student id */}

			{state?.user?.userType === 'Student' && (
				<Switch>
					<Route exact path="/majors" component={Majors} />
					<Route path="/student-transcript" component={StudentTranscript} />
					<Route path="/student-advisors" component={StudentAdvisors} />
					<Route exact path="/registration" component={Registration} />
				</Switch>
			)}
			{state?.user?.userType === 'Faculty' && (
				<Switch>
					<Route exact path="/classlist" component={StudentClassList} />
					<Route exact path="/schedule/:semester" component={FacultySchedule} />
					<Route exact path="/classlist/studentDetails" component={ClassDetails} />
					<Route path="/advisees/" component={FacultyAdvisees} />
					<Route path="/classlist/studentDetails/:sID" component={StudentDetails} />
				</Switch>
			)}

			{/* IF FACULTY */}

			{/* Displays our Login component as a fallback */}
			<Route component={Schedule} />
		</Switch>
	);
};
