import { FacultyFullTime } from './../entity/Users/FacultyFullTime';
import { FacultyPartTime } from './../entity/Users/FacultyPartTime';

import { createConnection } from 'typeorm';
import { seeds } from './index';
import { GraduateFullTime } from '../entity/Users/GraduateFullTime';
import { GraduatePartTime } from '../entity/Users/GraduatePartTime';
import { UnderGraduatePartTime } from '../entity/Users/UnderGraduatePartTime';
import { UnderGraduateFullTime } from '../entity/Users/UnderGraduateFullTime';
import { Semester } from '../entity/TimeRelated/Semester';

createConnection()
	.then(async (connection) => {
		const fullTimeFaculty = seeds.fullTimeFaculty.default;
		for (let i = 0; i < fullTimeFaculty.length; i++) {
			try {
				const faculty = await connection.manager.create(FacultyFullTime, fullTimeFaculty[i]);
				await connection.manager.save(faculty);
			} catch (error) {
				console.error(error);
			}
		}

		const partTimeFaculty = seeds.partTimeFaculty.default;
		for (let i = 0; i < partTimeFaculty.length; i++) {
			try {
				const faculty = await connection.manager.create(FacultyPartTime, partTimeFaculty[i]);
				await connection.manager.save(faculty);
			} catch (error) {
				console.error(error);
			}
		}
		const graduateFullTime = seeds.graduateFullTime.default;
		for (let i = 0; i < graduateFullTime.length; i++) {
			try {
				const student = await connection.manager.create(GraduateFullTime, graduateFullTime[i]);
				await connection.manager.save(student);
			} catch (error) {}
		}
		const graduatePartTime = seeds.graduatePartTime.default;
		for (let i = 0; i < graduatePartTime.length; i++) {
			try {
				const student = await connection.manager.create(GraduatePartTime, graduatePartTime[i]);
				await connection.manager.save(student);
			} catch (error) {
				console.error(error);
			}
		}

		const undergraduateFullTime = seeds.undergraduateFullTime.default;
		for (let i = 0; i < undergraduateFullTime.length; i++) {
			try {
				const student = await connection.manager.create(UnderGraduateFullTime, undergraduateFullTime[i]);
				await connection.manager.save(student);
			} catch (error) {
				console.error(error);
			}
		}
		const undergraduatePartTime = seeds.undergraduatePartTime.default;
		for (let i = 0; i < undergraduatePartTime.length; i++) {
			try {
				const student = await connection.manager.create(UnderGraduatePartTime, undergraduatePartTime[i]);
				await connection.manager.save(student);
			} catch (error) {
				console.error(error);
			}
		}

		const semesters = seeds.semester.default;
		for (let i = 0; i < semesters.length; i++) {
			try {
				const semester = await connection.manager.create(Semester, semesters[i]);
				await connection.manager.save(semester);
			} catch (error) {
				console.error(error);
			}
		}
	})
	.catch((error) => console.log(error));
