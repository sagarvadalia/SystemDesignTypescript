import React, { useContext } from 'react';
import { LoginContext } from './../LoginContext';
import ClassList from './Administrator/ClassList';
import SetBools from './Administrator/SetBools';
import StudentList from './Administrator/StudentList';
import UserList from './Administrator/UserList';
import AcademicCalendar from './All Users/academicCalendar';
import CourseCatalog from './All Users/courseCatalog';
import FacultyAdvisees from './Faculty/FacultyAdvisees';
import FacultyClassHistory from './Faculty/FacultyClassHistory';
import HomepageSchedule from './Faculty/HomepageSchedule';
import MasterSchedule from './masterSchedule';
import DataView from './Researcher/DataView';
import Holds from './Student/holds';
import MajorTable from './Student/MajorTable';
import MinorTable from './Student/MinorTable';
import StudentSchedule from './Student/studentSchedule';
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
			<AcademicCalendar></AcademicCalendar>
			<CourseCatalog></CourseCatalog>
			<MasterSchedule></MasterSchedule>
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
