import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from './../LoginContext';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import MajorTable from './Student/MajorTable';
import StudentSchedule from './Student/studentSchedule';
import Holds from './Student/holds';
import MinorTable from './Student/MinorTable';
import FacultyAdvisees from './Faculty/FacultyAdvisees';
import FacultyClassHistory from './Faculty/FacultyClassHistory';
import HomepageSchedule from './Faculty/HomepageSchedule';
import UserList from './Administrator/UserList';
import ClassList from './Administrator/ClassList';
import StudentList from './Administrator/StudentList';
import SetBools from './Administrator/SetBools';
import AcademicCalendar from './All Users/academicCalendar';
import CourseCatalog from './All Users/courseCatalog';
import MasterSchedule from './masterSchedule';
import DataView from './Researcher/DataView';
export default function Homepage() {
	const [state, setState] = useContext(LoginContext);
	return (
		<div>
			{state?.user?.userType === 'Researcher' && (
				<div>
					<DataView></DataView>
				</div>
			)}
			{state?.user?.userType === 'Administrator' && (
				<div>
					<SetBools></SetBools>
				</div>
			)}
			{!state?.user && (
				<div>
					<AcademicCalendar></AcademicCalendar>
					<CourseCatalog></CourseCatalog>
					<MasterSchedule></MasterSchedule>
				</div>
			)}
			{state?.user?.userType === 'Student' && (
				<div>
					<Holds></Holds>
					<MajorTable></MajorTable>
					<MinorTable></MinorTable>
					<StudentSchedule></StudentSchedule>
				</div>
			)}
			{state?.user?.userType === 'Faculty' && (
				<div>
					<FacultyAdvisees></FacultyAdvisees>
					<HomepageSchedule></HomepageSchedule>
					<FacultyClassHistory></FacultyClassHistory>
				</div>
			)}
			{state?.user?.userType === 'Administrator' && (
				<div>
					<UserList></UserList>
					<StudentList></StudentList>
					<ClassList></ClassList>
				</div>
			)}
		</div>
	);
}
