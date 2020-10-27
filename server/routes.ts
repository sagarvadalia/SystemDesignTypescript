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
export const Routes = [
	// crud Routes for users
	{
		method: 'get',
		route: '/users',
		controller: UserController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/users/:id',
		controller: UserController,
		action: 'one',
	},
	{
		method: 'delete',
		route: '/users/:id',
		controller: UserController,
		action: 'remove',
	},

	// crud Routes for days
	{
		method: 'get',
		route: '/days',
		controller: DayController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/days/:id',
		controller: DayController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/days',
		controller: DayController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/days/:id',
		controller: DayController,
		action: 'remove',
	},

	// crud routes for faculties
	{
		method: 'get',
		route: '/faculties',
		controller: FacultyController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/faculties/:id',
		controller: FacultyController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/faculties',
		controller: FacultyController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/faculties/:id',
		controller: FacultyController,
		action: 'remove',
	},

	// crud routes for minors
	{
		method: 'get',
		route: '/minors',
		controller: MinorController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/minors/:id',
		controller: MinorController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/minors',
		controller: MinorController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/minors/:id',
		controller: MinorController,
		action: 'remove',
	},

	// crud routes for prerequisites
	{
		method: 'get',
		route: '/prerequisites',
		controller: PrerequisiteController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/prerequisites/:id',
		controller: PrerequisiteController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/prerequisites',
		controller: PrerequisiteController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/prerequisites/:id',
		controller: PrerequisiteController,
		action: 'remove',
	},

	// crud routes for Classes
	{
		method: 'get',
		route: '/classes',
		controller: ClassController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/classes/:id',
		controller: ClassController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/classes',
		controller: ClassController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/classes/:id',
		controller: ClassController,
		action: 'remove',
	},

	// crud routes for Rooms
	{
		method: 'get',
		route: '/rooms',
		controller: RoomController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/rooms/:id',
		controller: RoomController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/rooms',
		controller: RoomController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/rooms/:id',
		controller: RoomController,
		action: 'remove',
	},

	// crud routes for semesters
	{
		method: 'get',
		route: '/semesters',
		controller: SemesterController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/semesters/:id',
		controller: SemesterController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/semesters',
		controller: SemesterController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/semesters/:id',
		controller: SemesterController,
		action: 'remove',
	},

	// crud Routes for researchers
	{
		method: 'get',
		route: '/researchers',
		controller: ResearcherController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/researchers/:id',
		controller: ResearcherController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/researchers',
		controller: ResearcherController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/researchers/:id',
		controller: ResearcherController,
		action: 'remove',
	},

	// crud Routes for buildings
	{
		method: 'get',
		route: '/buildings',
		controller: BuildingController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/buildings/:id',
		controller: BuildingController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/buildings',
		controller: BuildingController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/buildings/:id',
		controller: BuildingController,
		action: 'remove',
	},

	// crud Routes for Catalog
	{
		method: 'get',
		route: '/catalogs',
		controller: CatalogController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/catalogs/:id',
		controller: CatalogController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/catalogs',
		controller: CatalogController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/catalogs/:id',
		controller: CatalogController,
		action: 'remove',
	},

	// crud Routes for Period
	{
		method: 'get',
		route: '/periods',
		controller: PeriodController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/periods/:id',
		controller: PeriodController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/periods',
		controller: PeriodController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/periods/:id',
		controller: PeriodController,
		action: 'remove',
	},

	// crud Routes for Student
	{
		method: 'get',
		route: '/students',
		controller: StudentController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/students/:id',
		controller: StudentController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/students',
		controller: StudentController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/students/:id',
		controller: StudentController,
		action: 'remove',
	},

	// crud Routes for Department
	{
		method: 'get',
		route: '/departments',
		controller: DepartmentController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/departments/:id',
		controller: DepartmentController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/departments',
		controller: DepartmentController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/departments/:id',
		controller: DepartmentController,
		action: 'remove',
	},

	// crud Routes for Course
	{
		method: 'get',
		route: '/courses',
		controller: CourseController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/courses/:id',
		controller: CourseController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/courses',
		controller: CourseController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/courses/:id',
		controller: CourseController,
		action: 'remove',
	},

	// crud Routes for Administrator
	{
		method: 'get',
		route: '/administrators',
		controller: AdministratorController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/administrators/:id',
		controller: AdministratorController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/administrators',
		controller: AdministratorController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/administrators/:id',
		controller: AdministratorController,
		action: 'remove',
	},

	// crud Routes for TimeSlot
	{
		method: 'get',
		route: '/timeslots',
		controller: TimeSlotController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/timeslots/:id',
		controller: TimeSlotController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/timeslots',
		controller: TimeSlotController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/timeslots/:id',
		controller: TimeSlotController,
		action: 'remove',
	},

	// crud Routes for Major
	{
		method: 'get',
		route: '/majors',
		controller: MajorController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/majors/:id',
		controller: MajorController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/majors',
		controller: MajorController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/majors/:id',
		controller: MajorController,
		action: 'remove',
	},

	// crud Routes for StudentMinor
	{
		method: 'get',
		route: '/studentminors',
		controller: StudentMinorController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/studentminors/:id',
		controller: StudentMinorController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/studentminors',
		controller: StudentMinorController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/studentminors/:id',
		controller: StudentMinorController,
		action: 'remove',
	},
	// crud Routes for Graduate
	{
		method: 'get',
		route: '/graduates',
		controller: GraduateController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/graduates/:id',
		controller: GraduateController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/graduates',
		controller: GraduateController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/graduates/:id',
		controller: GraduateController,
		action: 'remove',
	},
	// crud Routes for UnderGraduate
	{
		method: 'get',
		route: '/undergraduates',
		controller: UnderGraduateController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/undergraduates/:id',
		controller: UnderGraduateController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/undergraduates',
		controller: UnderGraduateController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/undergraduates/:id',
		controller: UnderGraduateController,
		action: 'remove',
	},
	// crud Routes for FacultyPartTime
	{
		method: 'get',
		route: '/facultyparttime',
		controller: FacultyPartTimeController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/facultyparttime/:id',
		controller: FacultyPartTimeController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/facultyparttime',
		controller: FacultyPartTimeController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/facultyparttime/:id',
		controller: FacultyPartTimeController,
		action: 'remove',
	},
	// crud Routes for FacultyFullTime
	{
		method: 'get',
		route: '/facultyfulltime',
		controller: FacultyFullTimeController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/facultyfulltime/:id',
		controller: FacultyFullTimeController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/facultyfulltime',
		controller: FacultyFullTimeController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/facultyfulltime/:id',
		controller: FacultyFullTimeController,
		action: 'remove',
	},
	// crud Routes for studentHistory
	{
		method: 'get',
		route: '/studenthistory',
		controller: StudentHistoryController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/studenthistory/:id',
		controller: StudentHistoryController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/studenthistory',
		controller: StudentHistoryController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/studenthistory/:id',
		controller: StudentHistoryController,
		action: 'remove',
	},
	// crud Routes for attendance
	{
		method: 'get',
		route: '/attendances',
		controller: AttendanceController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/attendances/:id',
		controller: AttendanceController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/attendances',
		controller: AttendanceController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/attendances/:id',
		controller: AttendanceController,
		action: 'remove',
	},
	// crud Routes for facultyHistory
	{
		method: 'get',
		route: '/facultyhistory',
		controller: FacultyHistoryController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/facultyhistory/:id',
		controller: FacultyHistoryController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/facultyhistory',
		controller: FacultyHistoryController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/facultyhistory/:id',
		controller: FacultyHistoryController,
		action: 'remove',
	},
	// crud Routes for undergradFullTime
	{
		method: 'get',
		route: '/undergraduatefulltime',
		controller: UnderGraduateFullTimeController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/undergraduatefulltime/:id',
		controller: UnderGraduateFullTimeController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/undergraduatefulltime',
		controller: UnderGraduateFullTimeController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/undergraduatefulltime/:id',
		controller: UnderGraduateFullTimeController,
		action: 'remove',
	},
	// crud Routes for undergradPartTime
	{
		method: 'get',
		route: '/undergraduateparttime',
		controller: UnderGraduatePartTimeController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/undergraduateparttime/:id',
		controller: UnderGraduatePartTimeController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/undergraduateparttime',
		controller: UnderGraduatePartTimeController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/undergraduateparttime/:id',
		controller: UnderGraduatePartTimeController,
		action: 'remove',
	},
	// crud Routes for gradPartTime
	{
		method: 'get',
		route: '/graduateparttime',
		controller: GraduatePartTimeController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/graduateparttime/:id',
		controller: GraduatePartTimeController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/graduateparttime',
		controller: GraduatePartTimeController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/graduateparttime/:id',
		controller: GraduatePartTimeController,
		action: 'remove',
	},
	// crud Routes for gradFullTime
	{
		method: 'get',
		route: '/graduatefulltime',
		controller: GraduateFullTimeController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/graduatefulltime/:id',
		controller: GraduateFullTimeController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/graduatefulltime',
		controller: GraduateFullTimeController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/graduatefulltime/:id',
		controller: GraduateFullTimeController,
		action: 'remove',
	},
	// crud Routes for lab
	{
		method: 'get',
		route: '/labs',
		controller: LabController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/labs/:id',
		controller: LabController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/labs',
		controller: LabController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/labs/:id',
		controller: LabController,
		action: 'remove',
	},
	// crud Routes for lecture
	{
		method: 'get',
		route: '/lectures',
		controller: LectureController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/lectures/:id',
		controller: LectureController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/lectures',
		controller: LectureController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/lectures/:id',
		controller: LectureController,
		action: 'remove',
	},
	// crud Routes for office
	{
		method: 'get',
		route: '/offices',
		controller: OfficeController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/offices/:id',
		controller: OfficeController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/offices',
		controller: OfficeController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/offices/:id',
		controller: OfficeController,
		action: 'remove',
	},
];
