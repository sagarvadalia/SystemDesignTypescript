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
import { Course } from '../entity/ClassRelated/Course';
import { Administrator } from '../entity/Users/Administrator';
import { Building } from '../entity/Locations/Building';
import { Department } from '../entity/Locations/Department';
import { Major } from '../entity/ClassRelated/Major';
import { Minor } from '../entity/ClassRelated/Minor';
import { Day } from '../entity/TimeRelated/Day';
import { Period } from '../entity/TimeRelated/Period';
import { Lab } from '../entity/Locations/Lab';
import { Lecture } from '../entity/Locations/Lecture';
import { Office } from '../entity/Locations/Office';





createConnection()
	.then(async (connection) => {
		//LAB
		const labs = seeds.lab.default;
		for (let i = 0; i < labs.length; i++) {
			try {
				const lab = await connection.manager.create(Lab, labs[i]);
				await connection.manager.save(lab);
			} catch (error) {
				// console.error(error);
			}
		}


		//LECTURE
		const lectures = seeds.lecture.default;
		for (let i = 0; i < lectures.length; i++) {
			try {
				const lecture = await connection.manager.create(Lecture, lectures[i]);
				await connection.manager.save(lecture);
			} catch (error) {
				// console.error(error);
			}
		}


		//OFFICE
		const offices = seeds.office.default;
		for (let i = 0; i < offices.length; i++) {
			try {
				const office = await connection.manager.create(Office, offices[i]);
				await connection.manager.save(office);
			} catch (error) {
				// console.error(error);
			}
		}


		//FACULTY FT
		const fullTimeFaculty = seeds.fullTimeFaculty.default;
		for (let i = 0; i < fullTimeFaculty.length; i++) {
			try {
				const faculty = await connection.manager.create(FacultyFullTime, fullTimeFaculty[i]);
				await connection.manager.save(faculty);
			} catch (error) {
				// console.error(error);
			}
		}


		//FACULTY PT
		const partTimeFaculty = seeds.partTimeFaculty.default;
		for (let i = 0; i < partTimeFaculty.length; i++) {
			try {
				const faculty = await connection.manager.create(FacultyPartTime, partTimeFaculty[i]);
				await connection.manager.save(faculty);
			} catch (error) {
				// console.error(error);
			}
		}


		//STUDENT G FT
		const graduateFullTime = seeds.graduateFullTime.default;
		for (let i = 0; i < graduateFullTime.length; i++) {
			try {
				const student = await connection.manager.create(GraduateFullTime, graduateFullTime[i]);
				await connection.manager.save(student);
			} catch (error) { }
		}



		//STUDENT G PT
		const graduatePartTime = seeds.graduatePartTime.default;
		for (let i = 0; i < graduatePartTime.length; i++) {
			try {
				const student = await connection.manager.create(GraduatePartTime, graduatePartTime[i]);
				await connection.manager.save(student);
			} catch (error) {
				// console.error(error);
			}
		}



		//STUDENT UG FT
		const undergraduateFullTime = seeds.undergraduateFullTime.default;
		for (let i = 0; i < undergraduateFullTime.length; i++) {
			try {
				const student = await connection.manager.create(UnderGraduateFullTime, undergraduateFullTime[i]);
				await connection.manager.save(student);
			} catch (error) {
				// console.error(error);
			}
		}


		//STUDENT UG PT
		const undergraduatePartTime = seeds.undergraduatePartTime.default;
		for (let i = 0; i < undergraduatePartTime.length; i++) {
			try {
				const student = await connection.manager.create(UnderGraduatePartTime, undergraduatePartTime[i]);
				await connection.manager.save(student);
			} catch (error) {
				// console.error(error);
			}
		}


		//SEMESTER
		const semesters = seeds.semester.default;
		for (let i = 0; i < semesters.length; i++) {
			try {
				const semester = await connection.manager.create(Semester, semesters[i]);
				await connection.manager.save(semester);
			} catch (error) {
				// console.error(error);
			}
		}


		//RESEARCHER
		const researcher = seeds.researcher.default;
		for (let i = 0; i < researcher.length; i++) {
			try {
				const researchers = await connection.manager.create(Researcher, researcher[i]);
				await connection.manager.save(researchers);
			} catch (error) {
				// console.error(error);
			}
		}


		//PERIOD
		const period = seeds.period.default;
		for (let i = 0; i < period.length; i++) {
			try {
				const periods = await connection.manager.create(Period, period[i]);
				await connection.manager.save(periods);
			} catch (error) {
				// console.error(error);
			}
		}


		//COURSE
		const course = seeds.course.default;
		for (let i = 0; i < course.length; i++) {
			try {
				const courses = await connection.manager.create(Course, course[i]);
				await connection.manager.save(courses);
			} catch (error) {
				// console.error(error);
			}
		}


		//BUILDING
		const building = seeds.building.default;
		for (let i = 0; i < building.length; i++) {
			try {
				const buildings = await connection.manager.create(Building, building[i]);
				await connection.manager.save(buildings);
			} catch (error) {
				// console.error(error);
			}
		}


		//DEPARTMENT
		const department = seeds.department.default;
		for (let i = 0; i < department.length; i++) {
			try {
				const departments = await connection.manager.create(Department, department[i]);
				await connection.manager.save(departments);
			} catch (error) {
				// console.error(error);
			}
		}


		//MAJOR
		const major = seeds.major.default;
		for (let i = 0; i < major.length; i++) {
			try {
				const majors = await connection.manager.create(Major, major[i]);
				await connection.manager.save(majors);
			} catch (error) {
				// console.error(error);
			}
		}


		//MINOR
		const minor = seeds.minor.default;
		for (let i = 0; i < minor.length; i++) {
			try {
				const minors = await connection.manager.create(Minor, minor[i]);
				await connection.manager.save(minors);
			} catch (error) {
				// console.error(error);
			}
		}


		//DAY
		const day = seeds.day.default;
		for (let i = 0; i < day.length; i++) {
			try {
				const days = await connection.manager.create(Day, day[i]);
				await connection.manager.save(days);
			} catch (error) {
				// console.error(error);
			}
		}


		//ADMINISTRATOR
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
