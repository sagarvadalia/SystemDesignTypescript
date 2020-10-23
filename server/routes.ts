import { ClassController } from './controller/ClassController';
import { DayController } from './controller/DayController';
import { FacultyController } from './controller/FacultyController';
import { MinorController } from './controller/MinorController';
import { PrerequisiteController } from './controller/PrerequisiteController';
import { RoomController } from './controller/RoomController';
import { UserController } from './controller/UserController';

export const Routes = [
	{
		// Routes for users

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
	// Routes for days
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
	// routes for faculties
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
	// routes for minors
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
	// routes for prerequisites
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
	// routes for Classes
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
	// routes for Rooms
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
];
