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
import { TimeSlotController } from './controller/TimeSlotController';
import { MajorController } from './controller/MajorController';

export const Routes = [
	{
		// crud Routes for users

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
	// crud Routes for timeslot
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
	
];
