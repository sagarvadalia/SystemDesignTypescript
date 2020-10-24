import { SemesterController } from './controller/SemesterController';
import { ClassController } from './controller/ClassController';
import { DayController } from './controller/DayController';
import { FacultyController } from './controller/FacultyController';
import { MinorController } from './controller/MinorController';
import { PrerequisiteController } from './controller/PrerequisiteController';
import { RoomController } from './controller/RoomController';
import { UserController } from './controller/UserController';
import { ResearchController } from './controller/ResearcherController';
import { AdministratorController } from './controller/AdministratorController';
import { BuildingController } from './controller/BuildingController';
import { CatalogController } from './controller/CatalogController';
import { PeriodController } from './controller/PeriodController';
import { StudentController } from './controller/StudentController';
import { DepartmentController } from './controller/DepartmentController';
import { CourseController } from './controller/CourseControlller';

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
		controller: ResearchController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/researchers/:id',
		controller: ResearchController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/researchers',
		controller: ResearchController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/researchers/:id',
		controller: ResearchController,
		action: 'remove',
	},


	// crud Routes for administrators
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


];
