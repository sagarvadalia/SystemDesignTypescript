import { FacultyFullTime } from './../entity/Users/FacultyFullTime';
import { FacultyPartTime } from './../entity/Users/FacultyPartTime';

import { createConnection } from 'typeorm';
import { seeds } from './index';
import { GraduateFullTime } from '../entity/Users/GraduateFullTime';
import { GraduatePartTime } from '../entity/Users/GraduatePartTime';
import { UnderGraduatePartTime } from '../entity/Users/UnderGraduatePartTime';

createConnection()
	.then(async (connection) => {
		// const partTimeFaculty = seeds.partTimeFaculty.default;
		// for (let i = 0; i < partTimeFaculty.length; i++) {
		// 	if (partTimeFaculty[i]) {
		// 		const faculty = await connection.manager.create(FacultyPartTime, partTimeFaculty[i]);
		// 		await connection.manager.save(faculty);
		// 	}
		// }
		// const fullTimeFaculty = seeds.fullTimeFaculty.default;

		// for (let i = 0; i < fullTimeFaculty.length; i++) {
		// 	if (fullTimeFaculty[i]) {
		// 		const faculty = await connection.manager.create(FacultyFullTime, fullTimeFaculty[i]);
		// 		await connection.manager.save(faculty);
		// 	}
		// }
		// const graduateFullTime = seeds.graduateFullTime.default;
		// for (let i = 0; i < graduateFullTime.length; i++) {
		// 	if (graduateFullTime[i]) {
		// 		const student = await connection.manager.create(GraduateFullTime, graduateFullTime[i]);
		// 		await connection.manager.save(student);
		// 	}
		// }

		const undergraduatePartTime = seeds.undergraduatePartTime.default;
		for (let i = 0; i < undergraduatePartTime.length; i++) {
			if (undergraduatePartTime[i]) {
				const student = await connection.manager.create(UnderGraduatePartTime, undergraduatePartTime[i]);
				await connection.manager.save(student);
			}
		}
	})

	.catch((error) => console.log(error));
