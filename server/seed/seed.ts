import { FacultyFullTime } from './../entity/Users/FacultyFullTime';
import { FacultyPartTime } from './../entity/Users/FacultyPartTime';

import { createConnection } from 'typeorm';
import { seeds } from './index';
createConnection()
	.then(async (connection) => {
		const partTimeFaculty = seeds.partTimeFaculty.default;
		for (let i = 0; i < partTimeFaculty.length; i++) {
			if (partTimeFaculty[i]) {
				const faculty = await connection.manager.create(FacultyPartTime, partTimeFaculty[i]);
				await connection.manager.save(faculty);
			}
		}
		const fullTimeFaculty = seeds.fullTimeFaculty.default;

		for (let i = 0; i < fullTimeFaculty.length; i++) {
			if (fullTimeFaculty[i]) {
				const faculty = await connection.manager.create(FacultyFullTime, fullTimeFaculty[i]);
				await connection.manager.save(faculty);
			}
		}
	})
	.catch((error) => console.log(error));
