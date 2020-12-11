import { SemesterController } from './controller/CourseRelated/SemesterController';
import { ClassController } from './controller/CourseRelated/ClassController';
import { DayController } from './controller/TimeRelated/DayController';
import { FacultyController } from './controller/Users/FacultyController';
import { MinorController } from './controller/CourseRelated/MinorController';
import { PrerequisiteController } from './controller/CourseRelated/PrerequisiteController';
import { RoomController } from './controller/Locations/RoomController';
import { UserController } from './controller/Users/UserController';
import { ResearcherController } from './controller/Users/ResearcherController';
import { AdministratorController } from './controller/Users/AdministratorController';
import { BuildingController } from './controller/Locations/BuildingController';
import { CatalogController } from './controller/CatalogController';
import { PeriodController } from './controller/TimeRelated/PeriodController';
import { StudentController } from './controller/Users/StudentController';
import { DepartmentController } from './controller/Locations/DepartmentController';
import { CourseController } from './controller/CourseRelated/CourseController';
import { TimeSlotController } from './controller/TimeRelated/TimeSlotController';
import { MajorController } from './controller/CourseRelated/MajorController';
import { StudentMinorController } from './controller/JoinTables/StudentMinorController';
import { GraduateController } from './controller/Users/GraduateController';
import { UnderGraduateController } from './controller/Users/UnderGraduateController';
import { FacultyPartTimeController } from './controller/Users/FacultyPartTime';
import { FacultyFullTimeController } from './controller/Users/FacultyFullTimeController';
import { StudentHistoryController } from './controller/Users/StudentHistoryController';
import { AttendanceController } from './controller/JoinTables/AttendanceController';
import { FacultyHistoryController } from './controller/Users/FacultyHistoryController';
import { UnderGraduateFullTimeController } from './controller/Users/UnderGraduateFullTimeController';
import { UnderGraduatePartTimeController } from './controller/Users/UnderGraduatePartTimeController';
import { GraduatePartTimeController } from './controller/Users/GraduatePartTimeController';
import { GraduateFullTimeController } from './controller/Users/GraduateFullTimeController';
import { LabController } from './controller/Locations/LabController';
import { LectureController } from './controller/Locations/LectureController';
import { OfficeController } from './controller/Locations/OfficeController';
import { EnrollmentController } from './controller/JoinTables/EnrollmentController';
import { AdvisorController } from './controller/JoinTables/AdvisorController';
import { StudentHoldController } from './controller/JoinTables/StudentHoldController';
import { StudentMajorController } from './controller/JoinTables/StudentMajorController';
import { MajorReqController } from './controller/CourseRelated/MajorReqController';
import { MinorReqController } from './controller/CourseRelated/MinorReqController';
import { GradingController } from './controller/CourseRelated/GradingController';
// import { PrerequisiteController } from './controller/JoinTables/PrerequisiteController';



export const Routes = [
	{
		method: 'get',
		route: '/api/login',
		controller: UserController,
		action: 'login',
	},

	// crud Routes for users
	{
		method: 'get',
		route: '/api/users',
		controller: UserController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/api/users/:id',
		controller: UserController,
		action: 'one',
	},
	{
		method: 'delete',
		route: '/api/users/:id',
		controller: UserController,
		action: 'remove',
	},

	// crud Routes for days
	{
		method: 'get',
		route: '/api/days',
		controller: DayController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/api/days/:id',
		controller: DayController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/api/days',
		controller: DayController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/api/days/:id',
		controller: DayController,
		action: 'remove',
	},

	// crud routes for faculties
	{
		method: 'get',
		route: '/api/faculties',
		controller: FacultyController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/api/faculties/:id',
		controller: FacultyController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/api/faculties',
		controller: FacultyController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/api/faculties/:id',
		controller: FacultyController,
		action: 'remove',
	},
	{
		method: 'get',
		route: '/api/faculties/viewClasses/:id',
		controller: FacultyController,
		action: 'viewClasses',
	},
	{
		method: 'get',
		route: '/api/faculties/viewClassesBySemester/:id/:semesterID',
		controller: FacultyController,
		action: 'viewClassesBySemester',
	},
	{
		method: 'get',
		route: '/api/faculties/viewEnrollments/:classCRN',
		controller: FacultyController,
		action: 'viewEnrollments',
	},
	{
		method: 'get',
		route: '/api/faculties/facultyAdvisees/:id',
		controller: AdvisorController,
		action: 'facultyAdvisees',

	},


	// crud routes for minors
	{
		method: 'get',
		route: '/api/minors',
		controller: MinorController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/api/minors/:id',
		controller: MinorController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/api/minors',
		controller: MinorController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/api/minors/:id',
		controller: MinorController,
		action: 'remove',
	},

	// crud routes for prerequisites
	{
		method: 'get',
		route: '/api/prerequisites',
		controller: PrerequisiteController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/api/prerequisites/:id',
		controller: PrerequisiteController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/api/prerequisites',
		controller: PrerequisiteController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/api/prerequisites/:id',
		controller: PrerequisiteController,
		action: 'remove',
	},

	// crud routes for Classes
	{
		method: 'get',
		route: '/api/classes',
		controller: ClassController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/api/classes/:id',
		controller: ClassController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/api/classes',
		controller: ClassController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/api/classes/:id',
		controller: ClassController,
		action: 'remove',
	},
		{
		method: 'delete',
		route: '/api/removeClass/:classCRN',
		controller: ClassController,
		action: 'removeClass',
	},
	{
		method: 'get',
		route: '/api/classes/semester/:id',
		controller: ClassController,
		action: 'inSemester',
	},

	// crud routes for Rooms
	{
		method: 'get',
		route: '/api/rooms',
		controller: RoomController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/api/rooms/:id',
		controller: RoomController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/api/rooms',
		controller: RoomController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/api/rooms/:id',
		controller: RoomController,
		action: 'remove',
	},

	// crud routes for semesters
	{
		method: 'get',
		route: '/api/semesters',
		controller: SemesterController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/api/semesters/:id',
		controller: SemesterController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/api/semesters',
		controller: SemesterController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/api/semesters/:id',
		controller: SemesterController,
		action: 'remove',
	},

	// crud Routes for researchers
	{
		method: 'get',
		route: '/api/researchers',
		controller: ResearcherController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/api/researchers/:id',
		controller: ResearcherController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/api/researchers',
		controller: ResearcherController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/api/researchers/:id',
		controller: ResearcherController,
		action: 'remove',
	},

	// crud Routes for buildings
	{
		method: 'get',
		route: '/api/buildings',
		controller: BuildingController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/api/buildings/:id',
		controller: BuildingController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/api/buildings',
		controller: BuildingController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/api/buildings/:id',
		controller: BuildingController,
		action: 'remove',
	},

	// crud Routes for Catalog
	{
		method: 'get',
		route: '/api/catalogs',
		controller: CatalogController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/api/catalogs/:id',
		controller: CatalogController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/api/catalogs',
		controller: CatalogController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/api/catalogs/:id',
		controller: CatalogController,
		action: 'remove',
	},

	// crud Routes for Period
	{
		method: 'get',
		route: '/api/periods',
		controller: PeriodController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/api/periods/:id',
		controller: PeriodController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/api/periods',
		controller: PeriodController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/api/periods/:id',
		controller: PeriodController,
		action: 'remove',
	},

	// crud Routes for Student
	{
		method: 'get',
		route: '/api/students',
		controller: StudentController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/api/students/:id',
		controller: StudentController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/api/students',
		controller: StudentController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/api/students/:id',
		controller: StudentController,
		action: 'remove',
	},

	// crud Routes for Department
	{
		method: 'get',
		route: '/api/departments',
		controller: DepartmentController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/api/departments/:id',
		controller: DepartmentController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/api/departments',
		controller: DepartmentController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/api/departments/:id',
		controller: DepartmentController,
		action: 'remove',
	},

	// crud Routes for Course
	{
		method: 'get',
		route: '/api/courses',
		controller: CourseController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/api/courses/:id',
		controller: CourseController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/api/courses',
		controller: CourseController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/api/courses/:id',
		controller: CourseController,
		action: 'remove',
	},

	// crud Routes for Administrator
	{
		method: 'get',
		route: '/api/administrators',
		controller: AdministratorController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/api/administrators/:id',
		controller: AdministratorController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/api/administrators',
		controller: AdministratorController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/api/administrators/:id',
		controller: AdministratorController,
		action: 'remove',
	},

	// crud Routes for TimeSlot
	{
		method: 'get',
		route: '/api/timeslots',
		controller: TimeSlotController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/api/timeslots/:id',
		controller: TimeSlotController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/api/timeslots',
		controller: TimeSlotController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/api/timeslots/:id',
		controller: TimeSlotController,
		action: 'remove',
	},

	// crud Routes for Major
	{
		method: 'get',
		route: '/api/majors',
		controller: MajorController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/api/majors/:id',
		controller: MajorController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/api/majors',
		controller: MajorController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/api/majors/:id',
		controller: MajorController,
		action: 'remove',
	},

	// crud Routes for StudentMinor
	{
		method: 'get',
		route: '/api/studentminors',
		controller: StudentMinorController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/api/studentminors/:id',
		controller: StudentMinorController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/api/studentminors',
		controller: StudentMinorController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/api/studentminors/:id',
		controller: StudentMinorController,
		action: 'remove',
	},
	// crud Routes for Graduate
	{
		method: 'get',
		route: '/api/graduates',
		controller: GraduateController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/api/graduates/:id',
		controller: GraduateController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/api/graduates',
		controller: GraduateController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/api/graduates/:id',
		controller: GraduateController,
		action: 'remove',
	},
	// crud Routes for UnderGraduate
	{
		method: 'get',
		route: '/api/undergraduates',
		controller: UnderGraduateController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/api/undergraduates/:id',
		controller: UnderGraduateController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/api/undergraduates',
		controller: UnderGraduateController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/api/undergraduates/:id',
		controller: UnderGraduateController,
		action: 'remove',
	},
	// crud Routes for FacultyPartTime
	{
		method: 'get',
		route: '/api/facultyparttime',
		controller: FacultyPartTimeController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/api/facultyparttime/:id',
		controller: FacultyPartTimeController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/api/facultyparttime',
		controller: FacultyPartTimeController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/api/facultyparttime/:id',
		controller: FacultyPartTimeController,
		action: 'remove',
	},
	// crud Routes for FacultyFullTime
	{
		method: 'get',
		route: '/api/facultyfulltime',
		controller: FacultyFullTimeController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/api/facultyfulltime/:id',
		controller: FacultyFullTimeController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/api/facultyfulltime',
		controller: FacultyFullTimeController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/api/facultyfulltime/:id',
		controller: FacultyFullTimeController,
		action: 'remove',
	},
	// crud Routes for studentHistory
	{
		method: 'get',
		route: '/api/studenthistory',
		controller: StudentHistoryController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/api/studenthistory/:id',
		controller: StudentHistoryController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/api/studenthistory',
		controller: StudentHistoryController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/api/studenthistory/:id',
		controller: StudentHistoryController,
		action: 'remove',
	},
	// crud Routes for attendance
	{
		method: 'get',
		route: '/api/attendances',
		controller: AttendanceController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/api/attendances/:id',
		controller: AttendanceController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/api/attendances',
		controller: AttendanceController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/api/attendances/:id',
		controller: AttendanceController,
		action: 'remove',
	},
	// crud Routes for facultyHistory
	{
		method: 'get',
		route: '/api/facultyhistory',
		controller: FacultyHistoryController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/api/facultyhistory/:id',
		controller: FacultyHistoryController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/api/facultyhistory',
		controller: FacultyHistoryController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/api/facultyhistory/:id',
		controller: FacultyHistoryController,
		action: 'remove',
	},
	// crud Routes for undergradFullTime
	{
		method: 'get',
		route: '/api/undergraduatefulltime',
		controller: UnderGraduateFullTimeController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/api/undergraduatefulltime/:id',
		controller: UnderGraduateFullTimeController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/api/undergraduatefulltime',
		controller: UnderGraduateFullTimeController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/api/undergraduatefulltime/:id',
		controller: UnderGraduateFullTimeController,
		action: 'remove',
	},
	// crud Routes for undergradPartTime
	{
		method: 'get',
		route: '/api/undergraduateparttime',
		controller: UnderGraduatePartTimeController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/api/undergraduateparttime/:id',
		controller: UnderGraduatePartTimeController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/api/undergraduateparttime',
		controller: UnderGraduatePartTimeController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/api/undergraduateparttime/:id',
		controller: UnderGraduatePartTimeController,
		action: 'remove',
	},
	// crud Routes for gradPartTime
	{
		method: 'get',
		route: '/api/graduateparttime',
		controller: GraduatePartTimeController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/api/graduateparttime/:id',
		controller: GraduatePartTimeController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/api/graduateparttime',
		controller: GraduatePartTimeController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/api/graduateparttime/:id',
		controller: GraduatePartTimeController,
		action: 'remove',
	},
	// crud Routes for gradFullTime
	{
		method: 'get',
		route: '/api/graduatefulltime',
		controller: GraduateFullTimeController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/api/graduatefulltime/:id',
		controller: GraduateFullTimeController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/api/graduatefulltime',
		controller: GraduateFullTimeController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/api/graduatefulltime/:id',
		controller: GraduateFullTimeController,
		action: 'remove',
	},
	// crud Routes for lab
	{
		method: 'get',
		route: '/api/labs',
		controller: LabController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/api/labs/:id',
		controller: LabController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/api/labs',
		controller: LabController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/api/labs/:id',
		controller: LabController,
		action: 'remove',
	},
	// crud Routes for lecture
	{
		method: 'get',
		route: '/api/lectures',
		controller: LectureController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/api/lectures/:id',
		controller: LectureController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/api/lectures',
		controller: LectureController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/api/lectures/:id',
		controller: LectureController,
		action: 'remove',
	},
	// crud Routes for office
	{
		method: 'get',
		route: '/api/offices',
		controller: OfficeController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/api/offices/:id',
		controller: OfficeController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/api/offices',
		controller: OfficeController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/api/offices/:id',
		controller: OfficeController,
		action: 'remove',
	},
	//Enrollment
	{
		method: 'get',
		route: '/api/enrollment/:id',
		controller: EnrollmentController,
		action: 'studentHistory',
	},
	{
		method: 'get',
		route: '/api/enrollment/studentHistoryBySemester/:id/:semesterID',
		controller: EnrollmentController,
		action: 'studentHistoryBySemester',
	},
	{
		method: 'get',
		route: '/api/advisors/:id',
		controller: AdvisorController,
		action: 'myAdvisors',
	},
	// Holds
	{
		method: 'get',
		route: '/api/holds/:id',
		controller: StudentHoldController,
		action: 'viewHolds',
	},
	//Thursday December 4 12/4
	{
		method: 'get',
		route: '/api/addhold/:sID/:holdID',
		controller: StudentHoldController,
		action: 'addHold',
	},
	{
		method: 'get',
		route: '/api/removehold/:sID/:holdID',
		controller: StudentHoldController,
		action: 'removeHold',
	},
	{
		method: 'get',
		route: '/api/classes/:classCRN/:slotID',
		controller: ClassController,
		action: 'changeTime',
	},
	//Friday December 5 12/5
	{
		method: 'get',
		route: '/api/attendance',
		controller: AttendanceController,
		action: 'newAttendance',
	},
	{
		method: 'get',
		route: '/api/enroll/:sID/:classCRN',
		controller: EnrollmentController,
		action: 'addClass',
	},
	{
		method: 'post',
		route: '/api/enrollment/finalgrade',
		controller: EnrollmentController,
		action: 'changeFinalGrade',
	},
	{
		method: 'post',
		route: '/api/enrollment/midtermgrade',
		controller: EnrollmentController,
		action: 'changeMidtermGrade',
	},
	{
		method: 'delete',
		route: '/api/enrollment/delete/:enrollmentID',
		controller: EnrollmentController,
		action: 'remove'
	},
	{
		method: 'get',
		route: '/api/viewMajors/:sID',
		controller: StudentMajorController,
		action: 'findAllMajors',
	},
	{
		method: 'get',
		route: '/api/addmajor/:sID/:majorID',
		controller: StudentMajorController,
		action: 'declareMajor',
	},
	{
		method: 'get',
		route: '/api/removemajor/:sID/:majorID',
		controller: StudentMajorController,
		action: 'dropMajor',
	},
	{
		method: 'get',
		route: '/api/drop/:enrollID',
		controller: EnrollmentController,
		action: 'dropClass',
	},
	//Monday 12/7
	{
		method: 'get',
		route: '/api/changeteacher/:classCRN/:fID',
		controller: ClassController,
		action: 'changeTeacher',
	},
	{
		method: 'get',
		route: '/api/changeroom/:classCRN/:roomID',
		controller: ClassController,
		action: 'changeRoom',
	},
	{
		method: 'get',
		route: '/api/viewMinors/:sID',
		controller: StudentMinorController,
		action: 'findAllMinors',
	},
	{
		method: 'get',
		route: '/api/addminor/:sID/:minorID',
		controller: StudentMinorController,
		action: 'declareMinor',
	},
	{
		method: 'get',
		route: '/api/removeminor/:sID/:minorID',
		controller: StudentMinorController,
		action: 'dropMinor',
	},
	{
		method: 'get',
		route: '/api/majorreqs/:majorID',
		controller: MajorReqController,
		action: 'majReqByMaj',
	},
	// Tuesday 12/8
	{
		method: 'get',
		route: '/api/minorreqs/:minorID',
		controller: MinorReqController,
		action: 'minReqByMin',
	},


		// crud routes for Prerequisites
	{
		method: 'get',
		route: '/api/prereqs',
		controller: PrerequisiteController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/api/prereqs/:id',
		controller: PrerequisiteController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/api/prereqs',
		controller: PrerequisiteController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/api/prereqs/:id',
		controller: PrerequisiteController,
		action: 'remove',
	},
	// 12/11
	{
		method: 'get',
		route: '/api/grading/AddCourse',
		controller: GradingController,
		action: 'canAddCourse',
	},{
		method: 'get',
		route: '/api/grading/MidtermGrade',
		controller: GradingController,
		action: 'canAddMidtermGrade',
	},{
		method: 'get',
		route: '/api/grading/FinalGrade',
		controller: GradingController,
		action: 'canAddFinalGrade',
	},

];
