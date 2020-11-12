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
import { Faculty } from '../entity/Users/Faculty';
import { Room } from '../entity/Locations/Room';
import { Users } from '../entity/Users/Users';
import { Graduate } from '../entity/Users/Graduate';
import { Student } from '../entity/Users/Student';
import { UnderGraduate } from '../entity/Users/UnderGraduate';
import { FacultyDepartment } from '../entity/JoinTables/FacultyDepartment';





createConnection()
	.then(async (connection) => {
		//BUILDING
		const building = seeds.building.default;
		for (let i = 0; i < building.length; i++) {
			try {
				const buildings = await connection.manager.create(Building, building[i]);
				//console.log(buildings);
				await connection.manager.save(buildings);
			} catch (error) {
				// console.error(error);
			}
		}
		// LAB
		const labs = seeds.lab.default;
		for (let i = 0; i < labs.length; i++) {
			try {
				const building = await connection.manager.findOne(Building, labs[i].buildingID);
				const lab = await connection.manager.create(Lab, labs[i]);
				building ? lab.buildings = building: console.log("Building doesn't exist")
				
				await connection.manager.save(lab);
			} catch (error) {
				 //console.error(error);
			}
		}


		//LECTURE
		const lectures = seeds.lecture.default;
		for (let i = 0; i < lectures.length; i++) {
			try {
				const building = await connection.manager.findOne(Building, lectures[i].buildingID);
				const lecture = await connection.manager.create(Lecture, lectures[i]);
				building ? lecture.buildings = building: console.log("Building Doesn't exist");
				
				await connection.manager.save(lecture);
			} catch (error) {
				 //console.error(error);
			}
		}


		//OFFICE
		const offices = seeds.office.default;
		for (let i = 0; i < offices.length; i++) {
			try {
				const building = await connection.manager.findOne(Building, offices[i].buildingID);
				const office = await connection.manager.create(Office, offices[i]);
				building ? office.buildings = building: console.log("Building doesn't exist");
				
				await connection.manager.save(office);
			} catch (error) {
				 //console.error(error);
			}
		}


		//FACULTY FT
		const fullTimeFaculty = seeds.fullTimeFaculty.default;
		for (let i = 0; i < fullTimeFaculty.length; i++) {
			try {
				const user = await connection.manager.create(Users, fullTimeFaculty[i]);
				const fac = await connection.manager.create(Faculty, fullTimeFaculty[i]);
				const fullTimeFac = await connection.manager.create(FacultyFullTime, fullTimeFaculty[i]);
				let room = await connection.manager.findOne(Office, fullTimeFaculty[i].roomIDNum)
				if (room) {
					fullTimeFac.roomID = room;

					await connection.manager.save(user);
					await connection.manager.save(fac);
					await connection.manager.save(fullTimeFac);
					// let facCheck = await connection.manager.findOne(FacultyFullTime, faculty.userID)
					// console.log(facCheck);
				}

			} catch (error) {
				console.error(error);
			}
		}



		//FACULTY PT

		const partTimeFaculty = seeds.partTimeFaculty.default;
		for (let i = 0; i < partTimeFaculty.length; i++) {
			try {
				const user = await connection.manager.create(Users, fullTimeFaculty[i]);
				const fac = await connection.manager.create(Faculty, fullTimeFaculty[i]);
				const partTimeFac = await connection.manager.create(FacultyPartTime, partTimeFaculty[i]);
				await connection.manager.save(user);
				await connection.manager.save(fac);
				await connection.manager.save(partTimeFac);
			} catch (error) {
				// console.error(error);
			}
		}


		//STUDENT G FT
		// const graduateFullTime = seeds.graduateFullTime.default;
		// for (let i = 0; i < graduateFullTime.length; i++) {
		// 	try {
		// 		const user = await connection.manager.create(Users, graduateFullTime[i])
		// 		const student = await connection.manager.create(Student, graduateFullTime[i])
		// 		const grad = await connection.manager.create(Graduate, graduateFullTime[i])
		// 		const fullTimeGrad = await connection.manager.create(GraduateFullTime, graduateFullTime[i]);
		// 		await connection.manager.save(user);
		// 		await connection.manager.save(student);
		// 		await connection.manager.save(grad);
		// 		await connection.manager.save(fullTimeGrad);
		// 	} catch (error) { }
		// }



		//STUDENT G PT
		const graduatePartTime = seeds.graduatePartTime.default;
		for (let i = 0; i < graduatePartTime.length; i++) {
			try {
				const user = await connection.manager.create(Users, graduatePartTime[i])
				const student = await connection.manager.create(Student, graduatePartTime[i])
				const grad = await connection.manager.create(Graduate, graduatePartTime[i])
				const partTimeGrad = await connection.manager.create(GraduatePartTime, graduatePartTime[i]);
				await connection.manager.save(user);
				await connection.manager.save(student);
				await connection.manager.save(grad);
				await connection.manager.save(partTimeGrad);
			} catch (error) {
				// console.error(error);
			}
		}


		//STUDENT UG FT
		const undergraduateFullTime = seeds.undergraduateFullTime.default;
		for (let i = 0; i < undergraduateFullTime.length; i++) {
			try {
				const user = await connection.manager.create(Users, undergraduateFullTime[i])
				const student = await connection.manager.create(Student, undergraduateFullTime[i])
				const undergrad = await connection.manager.create(UnderGraduate, undergraduateFullTime[i])
				const undergradFullTime = await connection.manager.create(UnderGraduateFullTime, undergraduateFullTime[i]);
				await connection.manager.save(user);
				await connection.manager.save(student);
				await connection.manager.save(undergrad);
				await connection.manager.save(undergradFullTime);
			} catch (error) {
				// console.error(error);
			}
		}


		//STUDENT UG PT
		const undergraduatePartTime = seeds.undergraduatePartTime.default;
		for (let i = 0; i < undergraduatePartTime.length; i++) {
			try {
				const user = await connection.manager.create(Users, undergraduatePartTime[i])
				const student = await connection.manager.create(Student, undergraduatePartTime[i])
				const undergrad = await connection.manager.create(UnderGraduate, undergraduatePartTime[i])
				const undergradPartTime = await connection.manager.create(UnderGraduatePartTime, undergraduatePartTime[i]);
				await connection.manager.save(user);
				await connection.manager.save(student);
				await connection.manager.save(undergrad);
				await connection.manager.save(undergradPartTime);
			} catch (error) {
				// console.error(error);
			}
		}


		// //SEMESTER
		// const semesters = seeds.semester.default;
		// for (let i = 0; i < semesters.length; i++) {
		// 	try {
		// 		const semester = await connection.manager.create(Semester, semesters[i]);
		// 		await connection.manager.save(semester);
		// 	} catch (error) {
		// 		// console.error(error);
		// 	}
		// }


		//RESEARCHER
		const researcher = seeds.researcher.default;
		for (let i = 0; i < researcher.length; i++) {
			try {
				const user = await connection.manager.create(Users, researcher[i])
				const researchers = await connection.manager.create(Researcher, researcher[i]);
				await connection.manager.save(user);
				await connection.manager.save(researchers);
				
			} catch (error) {
				// console.error(error);
			}
		}


		// // //PERIOD
		// const period = seeds.period.default;
		// for (let i = 0; i < period.length; i++) {
		// 	try {
		// 		const periods = await connection.manager.create(Period, period[i]);
		// 		await connection.manager.save(periods);
		// 	} catch (error) {
		// 		// console.error(error);
		// 	}
		// }


		//COURSE
		// const course = seeds.course.default;
		// for (let i = 0; i < course.length; i++) {
		// 	try {
		// 		const courses = await connection.manager.create(Course, course[i]);
		// 		await connection.manager.save(courses);
		// 	} catch (error) {
		// 		// console.error(error);
		// 	}
		// }
		// try {
		// 	const facultyOne = await connection.manager.findOne(Faculty, 6000);
		// 	console.log(facultyOne)
		// } catch (error) {
		// 	console.error(error)
		// }

		//DEPARTMENT
		const department = seeds.department.default;
		for (let i = 0; i < department.length; i++) {
			try {
				const departments = await connection.manager.create(Department, department[i]);
				try {
					console.log(department[i].deptHeadIDNum)
					// const faculty = await connection.manager.findOne(Faculty, department[i].deptHeadIDNum)
					const faculty2 = await connection.manager.findOne(FacultyFullTime, department[i].deptHeadIDNum)
					// const faculty3 = await connection.manager.findOne(FacultyPartTime, department[i].deptHeadIDNum)
					const room = await connection.manager.findOne(Office, department[i].roomIDNum)
					// console.log(faculty);
					console.log(faculty2);
					// console.log(faculty3);
					// console.log(room)
					if (room && faculty2) {
						departments.roomID = room;
						departments.deptHeadID = faculty2;
						let dept = await connection.manager.save(departments);
						console.log(dept)
					}
				} catch (error) {

				}

			} catch (error) {
				// console.error(error);
			}
		}

		const departments = await connection.manager.find(Department)
		const faculty = await connection.manager.find(Faculty)

		for (let i = 0; i < departments.length; i++) {
			try {
				const head = departments[i].deptHeadID
				const deptHead = await connection.manager.findOne(Faculty, head)
				if (deptHead) {
					const facDep = await connection.manager.create(FacultyDepartment, {
						fID: deptHead,
						deptID: departments[i],
						percentOfTime: '100%',
						dateAppointed: new Date('November 12, 2020 04:28:00')

					})
					await connection.manager.save(facDep)
				}

			} catch (error) {
				console.error(error)
			}

		}
		let iter = 1;
		for (let i = 0; i < faculty.length; i++) {
			try {
				if (iter = 16) {
					iter = 1;
				}

				const dept = await connection.manager.findOne(Department, iter)
				if (dept) {
					const facDep = await connection.manager.create(FacultyDepartment, {
						fID: faculty[i],
						deptID: dept,
						percentOfTime: '100%',
						dateAppointed: new Date('November 12, 2020 04:28:00')

					})

					await connection.manager.save(facDep)
				}
				else {
					console.log('------------------------------------------------', iter, 'couldnt find dept')
				}
				iter++;
			} catch (error) {
				console.error(error)
			}


		}
		// //MAJOR
		const major = seeds.major.default;
		for (let i = 0; i < major.length; i++) {
			try {
				const majors = await connection.manager.create(Major, major[i]);
				const dept = await connection.manager.findOne(Department, major[i].deptID)
				dept ? majors.department = dept : console.log('no department found')
				await connection.manager.save(majors);
			} catch (error) {
				// console.error(error);
			}
		}


		// //MINOR
		const minor = seeds.minor.default;
		for (let i = 0; i < minor.length; i++) {
			try {
				const minors = await connection.manager.create(Minor, minor[i]);
				const dept = await connection.manager.findOne(Department, minor[i].deptID)
				dept ? minors.department = dept : console.log('no department found')
				await connection.manager.save(minors);
			} catch (error) {
				// console.error(error);
			}
		}


		// //DAY
		// const day = seeds.day.default;
		// for (let i = 0; i < day.length; i++) {
		// 	try {
		// 		const days = await connection.manager.create(Day, day[i]);
		// 		await connection.manager.save(days);
		// 	} catch (error) {
		// 		// console.error(error);
		// 	}
		// }


		//ADMINISTRATOR
		const administrator = seeds.administrator.default;
		for (let i = 0; i < administrator.length; i++) {
			try {
				const user = await connection.manager.create(Users, administrator[i]);
				const administrators = await connection.manager.create(Administrator, administrator[i]);
				await connection.manager.save(user);
				await connection.manager.save(administrators);
			} catch (error) {
				// console.error(error);
			}
		}

	})
	.catch((error) => console.log(error));
