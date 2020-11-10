import { FacultyFullTime } from './../entity/Users/FacultyFullTime';
import { FacultyPartTime } from './../entity/Users/FacultyPartTime';

import { createConnection } from 'typeorm';
import { seeds } from './index';
import { GraduateFullTime } from '../entity/Users/GraduateFullTime';
import { GraduatePartTime } from '../entity/Users/GraduatePartTime';
import { UnderGraduatePartTime } from '../entity/Users/UnderGraduatePartTime';
import { UnderGraduateFullTime } from '../entity/Users/UnderGraduateFullTime';
import { Semester } from '../entity/TimeRelated/Semester';
import { Researcher } from '../entity/Users/Researcher';
import { Course } from 'server/entity/ClassRelated/Course';
import { Administrator } from 'server/entity/Users/Administrator';

createConnection()
	.then(async (connection) => {
		const fullTimeFaculty = seeds.fullTimeFaculty.default;
		for (let i = 0; i < fullTimeFaculty.length; i++) {
			try {
				const faculty = await connection.manager.create(FacultyFullTime, fullTimeFaculty[i]);
				await connection.manager.save(faculty);
			} catch (error) {
				// console.error(error);
			}
		}

		const partTimeFaculty = seeds.partTimeFaculty.default;
		for (let i = 0; i < partTimeFaculty.length; i++) {
			try {
				const faculty = await connection.manager.create(FacultyPartTime, partTimeFaculty[i]);
				await connection.manager.save(faculty);
			} catch (error) {
				// console.error(error);
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
				// console.error(error);
			}
		}

		const undergraduateFullTime = seeds.undergraduateFullTime.default;
		for (let i = 0; i < undergraduateFullTime.length; i++) {
			try {
				const student = await connection.manager.create(UnderGraduateFullTime, undergraduateFullTime[i]);
				await connection.manager.save(student);
			} catch (error) {
				// console.error(error);
			}
		}
		const undergraduatePartTime = seeds.undergraduatePartTime.default;
		for (let i = 0; i < undergraduatePartTime.length; i++) {
			try {
				const student = await connection.manager.create(UnderGraduatePartTime, undergraduatePartTime[i]);
				await connection.manager.save(student);
			} catch (error) {
				// console.error(error);
			}
		}

		const semesters = seeds.semester.default;
		for (let i = 0; i < semesters.length; i++) {
			try {
				const semester = await connection.manager.create(Semester, semesters[i]);
				await connection.manager.save(semester);
			} catch (error) {
				// console.error(error);
			}
		}
		const researcher = seeds.researcher.default;
		for (let i = 0; i < researcher.length; i++) {
			try {
				const researchers = await connection.manager.create(Researcher, researcher[i]);
				await connection.manager.save(researchers);
			} catch (error) {
				// console.error(error);
			}
		}

		const course = seeds.course.default;
		for (let i = 0; i < course.length; i++) {
			try {
				const courses = await connection.manager.create(Course, course[i]);
				await connection.manager.save(courses);
			} catch (error) {
				// console.error(error);
			}
		}

		const administrator = seeds.administrator.default;
		for (let i = 0; i < administrator.length; i++) {
			try {
				const administrators = await connection.manager.create(Administrator, administrator[i]);
				await connection.manager.save(administrators);
			} catch (error) {
				// console.error(error);
			}
		}
		
	})
	.catch((error) => console.log(error));
