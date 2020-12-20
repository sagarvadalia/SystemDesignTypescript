import React, { Component, useContext } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Login } from './login';
import Schedule from './All Users/schedule';
import StudentTranscript from './Student/studentTranscript';
import { LoginContext } from './../LoginContext';
import FacultyClassHistory from './Faculty/FacultyClassHistory';
import ClassDetails from './Faculty/classDetails';
import AcademicCalendar from './All Users/academicCalendar';
import NextCalendar from './All Users/nextCalendar';
import CourseCatalog from './All Users/courseCatalog';
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
import MinorReqsTable from './Student/MinorReqsTable';
import ClassList from './Administrator/ClassList';
import StudentList from './Administrator/StudentList';
import StudentDetailsAdminView from './Administrator/StudentDetailsAdminView';
import SetBools from './Administrator/SetBools';
import UserList from './Administrator/UserList';
import EditMasterSchedule from './Administrator/EditMasterSchedule';
import EditStudentHolds from './Administrator/EditStudentHolds';
import Attendance from './Faculty/Attendance';
import DegreeEval from './Student/DegreeEval';
import DegreeAudit from './Student/DegreeAudit';
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
			<Route exact path="/minorRequirements/:minorID" component={MinorReqsTable} />
			<Route exact path="/minors" component={Minors} />
			<Route exact path="/courses/:courseID" component={CourseDetails} />
			{/* we need to change this to match the student id */}

			{state?.user?.userType === 'Student' && (
				<Switch>
					<Route exact path="/majors" component={Majors} />
					<Route path="/student-transcript" component={StudentTranscript} />
					<Route path="/student-advisors" component={StudentAdvisors} />
					<Route exact path="/registration" component={Registration} />
					<Route exact path="/degreeAudit/:majorID" component={DegreeEval} />
					<Route exact path="/degree-audit" component={DegreeAudit} />
				</Switch>
			)}
			{state?.user?.userType === 'Faculty' && (
				<Switch>
					<Route exact path="/classlist" component={FacultyClassHistory} />
					<Route exact path="/schedule/:semester" component={FacultySchedule} />
					<Route exact path="/classlist/:classCRN" component={ClassDetails} />
					<Route path="/advisees/" component={FacultyAdvisees} />
					<Route path="/studentDetails/:sID" component={StudentDetails} />
					<Route exact path="/classlist/:classCRN/attendance" component={Attendance} />
				</Switch>
			)}
			{state?.user?.userType === 'Administrator' && (
				<Switch>
					<Route exact path="/classlist" component={ClassList} />
					<Route exact path="/classlist/:classCRN" component={ClassDetails} />
					<Route exact path="/studentlist" component={StudentList} />
					<Route exact path="/userlist" component={UserList} />
					<Route exact path="/studentlist/:sID" component={StudentDetailsAdminView} />
					<Route exact path="/setTimes" component={SetBools} />
					<Route exact path="/editMasterSchedule/:semester" component={EditMasterSchedule} />
					<Route exact path="/studentlist/:sID/holds" component={EditStudentHolds} />
					<Route exact path="/classlist/:classCRN/attendance" component={Attendance} />
				</Switch>
			)}

			{/* IF FACULTY */}

			{/* Displays our Login component as a fallback */}
			<Route component={Schedule} />
		</Switch>
	);
};
