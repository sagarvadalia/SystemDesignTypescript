import { FacultyFullTime } from './../entity/Users/FacultyFullTime';
import { FacultyPartTime } from './../entity/Users/FacultyPartTime';
import { ConnectionOptionsReader, createConnection } from 'typeorm';
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
import { Hold } from '../entity/StudentRelated/Hold';
import { TimeSlot } from '../entity/TimeRelated/TimeSlot';
import { Class } from '../entity/ClassRelated/Class';
import { StudentMajor } from '../entity/JoinTables/StudentMajor';
import { StudentMinor } from '../entity/JoinTables/StudentMinor';
import { DayAndPeriod } from '../entity/JoinTables/DayAndPeriod';
import { StudentHistory } from '../entity/StudentRelated/StudentHistory';
import { Advisor } from '../entity/JoinTables/Advisor';
import { StudentHold } from '../entity/JoinTables/StudentHold';
import { Enrollment } from '../entity/JoinTables/Enrollment';
import {MinorRequirement} from '../entity/ClassRelated/MinorRequirement'
import { MajorRequirement } from '../entity/ClassRelated/MajorRequirement'




createConnection({
	type: "postgres",
	host: "localhost",
	port: 5432,
	database: "studentregistration",
	synchronize: true,
	logging: true,
	entities: [__dirname + "./../entity/**/*.ts"],
	migrations: [__dirname + "./../migration/**/*.ts"],
	subscribers: [__dirname + "./../subscriber/**/*.ts"],
	"cli": {
		"entitiesDir": __dirname + "./../entity",
		"migrationsDir": __dirname + "./../migration",
		"subscribersDir": __dirname + "./../subscriber"
	}
})
	.then(async (connection) => {
		//----------------------iteration index variables-------------------------
		let i = 0;
		let index = 1;
		let majorNum = 1;
		let minorNum = 1;
		let timeslotCnt = 1;
		let iter = 1;



		// ----------------------BUILDING------------------------------------------
		const buildingsSeed = seeds.building.default;
		for (i = 0; i < buildingsSeed.length; i++) {
			try {
				const buildings = await connection.manager.create(Building, buildingsSeed[i]);
				//console.log(buildings);
				await connection.manager.save(buildings);
			} catch (error) {
				// console.error(error);
			}
		}



		// //-----------------------LAB-------------------------------------
		let labsSeed = seeds.lab.default;
		for (i = 0; i < labsSeed.length; i++) {
			try {
				const building = await connection.manager.findOne(Building, labsSeed[i].buildingID);
				const lab = await connection.manager.create(Lab, labsSeed[i]);
				building ? lab.buildings = building : console.log("Building doesn't exist")

				await connection.manager.save(lab);
			} catch (error) {
				//console.error(error);
			}
		}


		// //----------------------------LECTURE--------------------------------------
		let lecturesSeed = seeds.lecture.default;
		for (i = 0; i < lecturesSeed.length; i++) {
			try {
				const building = await connection.manager.findOne(Building, lecturesSeed[i].buildingID);
				const lecture = await connection.manager.create(Lecture, lecturesSeed[i]);
				building ? lecture.buildings = building : console.log("Building Doesn't exist");

				await connection.manager.save(lecture);
			} catch (error) {
				//console.error(error);
			}
		}


		// //----------------------------------OFFICE---------------------------------
		const officesSeed = seeds.office.default;
		for (i = 0; i < officesSeed.length; i++) {
			try {
				const building = await connection.manager.findOne(Building, officesSeed[i].buildingID);
				const office = await connection.manager.create(Office, officesSeed[i]);
				building ? office.buildings = building : console.log("Building doesn't exist");

				await connection.manager.save(office);
			} catch (error) {
				//console.error(error);
			}
		}


		// //------------------------------RESEARCHER---------------------------------
		const researchersSeed = seeds.researcher.default;
		for (i = 0; i < researchersSeed.length; i++) {
			try {
				const user = await connection.manager.create(Users, researchersSeed[i])
				const researchers = await connection.manager.create(Researcher, researchersSeed[i]);
				await connection.manager.save(user);
				await connection.manager.save(researchers);

			} catch (error) {
				// console.error(error);
			}
		}


		//--------------------------- DEPARTMENT------------------------------------

		let departmentsSeed = seeds.department.default;
		for (i = 0; i < departmentsSeed.length; i++) {
			try {
				const departments = await connection.manager.create(Department, departmentsSeed[i]);
				try {
					// console.log(departmentsSeed[i].deptHeadIDNum)
					// const faculty = await connection.manager.findOne(Faculty, department[i].deptHeadIDNum)
					const faculty2 = await connection.manager.findOne(FacultyFullTime, departmentsSeed[i].deptHeadIDNum)
					// const faculty3 = await connection.manager.findOne(FacultyPartTime, department[i].deptHeadIDNum)
					const room = await connection.manager.findOne(Office, departmentsSeed[i].roomIDNum)
					// console.log(faculty);
					// console.log(faculty2);
					// console.log(faculty3);
					// console.log(room)
					if (room && faculty2) {
						departments.roomID = room;
						departments.deptHeadID = faculty2;
						let dept = await connection.manager.save(departments);
						// console.log(dept)
					}
				} catch (error) { }
			}
			catch (error) {

			}
		}


		// // // ---------------------------INHERITANCE TABLES---------------------------

		// //----------------------------FACULTY FT-----------------------------------
		const fullTimeFacultySeed = seeds.fullTimeFaculty.default;
		for (i = 0; i < fullTimeFacultySeed.length; i++) {
			try {
				const user = await connection.manager.create(Users, fullTimeFacultySeed[i]);
				const fac = await connection.manager.create(Faculty, fullTimeFacultySeed[i]);
				const fullTimeFac = await connection.manager.create(FacultyFullTime, fullTimeFacultySeed[i]);
				let room = await connection.manager.findOne(Office, fullTimeFacultySeed[i].roomIDNum)
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



		// //----------------------------FACULTY PT-----------------------------------
		const partTimeFacultySeed = seeds.partTimeFaculty.default;
		for (i = 0; i < partTimeFacultySeed.length; i++) {
			try {
				const user = await connection.manager.create(Users, partTimeFacultySeed[i]);
				const fac = await connection.manager.create(Faculty, partTimeFacultySeed[i]);
				const partTimeFac = await connection.manager.create(FacultyPartTime, partTimeFacultySeed[i]);
				await connection.manager.save(user);
				await connection.manager.save(fac);
				await connection.manager.save(partTimeFac);
			} catch (error) {
				console.error(error);
			}
		}


		// //-----------------------------STUDENT G FT--------------------------------
		const graduateFullTimeSeed = seeds.graduateFullTime.default;
		for (i = 0; i < graduateFullTimeSeed.length; i++) {
			try {
				const user = await connection.manager.create(Users, graduateFullTimeSeed[i])
				const student = await connection.manager.create(Student, graduateFullTimeSeed[i])
				const grad = await connection.manager.create(Graduate, graduateFullTimeSeed[i])
				const fullTimeGrad = await connection.manager.create(GraduateFullTime, graduateFullTimeSeed[i]);
				await connection.manager.save(user);
				await connection.manager.save(student);
				await connection.manager.save(grad);
				await connection.manager.save(fullTimeGrad);
			} catch (error) { }
		}


		// //----------------------------STUDENT G PT---------------------------------
		const graduatePartTimeSeed = seeds.graduatePartTime.default;
		for (i = 0; i < graduatePartTimeSeed.length; i++) {
			try {
				const user = await connection.manager.create(Users, graduatePartTimeSeed[i])
				const student = await connection.manager.create(Student, graduatePartTimeSeed[i])
				const grad = await connection.manager.create(Graduate, graduatePartTimeSeed[i])
				const partTimeGrad = await connection.manager.create(GraduatePartTime, graduatePartTimeSeed[i]);
				await connection.manager.save(user);
				await connection.manager.save(student);
				await connection.manager.save(grad);
				await connection.manager.save(partTimeGrad);
			} catch (error) {
				// console.error(error);
			}
		}


		// //-------------------------------STUDENT UG FT-----------------------------
		const undergraduateFullTimeSeed = seeds.undergraduateFullTime.default;
		for (i = 0; i < undergraduateFullTimeSeed.length; i++) {
			try {
				const user = await connection.manager.create(Users, undergraduateFullTimeSeed[i])
				const student = await connection.manager.create(Student, undergraduateFullTimeSeed[i])
				const undergrad = await connection.manager.create(UnderGraduate, undergraduateFullTimeSeed[i])
				const undergradFullTime = await connection.manager.create(UnderGraduateFullTime, undergraduateFullTimeSeed[i]);
				await connection.manager.save(user);
				await connection.manager.save(student);
				await connection.manager.save(undergrad);
				await connection.manager.save(undergradFullTime);
			} catch (error) {
				// console.error(error);
			}
		}


		//------------------------------STUDENT UG PT------------------------------
		const undergraduatePartTimeSeed = seeds.undergraduatePartTime.default;
		for (i = 0; i < undergraduatePartTimeSeed.length; i++) {
			try {
				const user = await connection.manager.create(Users, undergraduatePartTimeSeed[i])
				const student = await connection.manager.create(Student, undergraduatePartTimeSeed[i])
				const undergrad = await connection.manager.create(UnderGraduate, undergraduatePartTimeSeed[i])
				const undergradPartTime = await connection.manager.create(UnderGraduatePartTime, undergraduatePartTimeSeed[i]);
				await connection.manager.save(user);
				await connection.manager.save(student);
				await connection.manager.save(undergrad);
				await connection.manager.save(undergradPartTime);
			} catch (error) {
				// console.error(error);
			}
		}

		// --------------------------- DEPARTMENT------------------------------------
		departmentsSeed = seeds.department.default;
		for (i = 0; i < departmentsSeed.length; i++) {
			try {
				const departments = await connection.manager.create(Department, departmentsSeed[i]);
				try {

					const faculty2 = await connection.manager.findOne(FacultyFullTime, departmentsSeed[i].deptHeadIDNum)

					const room = await connection.manager.findOne(Office, departmentsSeed[i].roomIDNum)

					if (room && faculty2) {
						departments.roomID = room;
						departments.deptHeadID = faculty2;
						let dept = await connection.manager.save(departments);
						// console.log(dept)
					}
					else {
						console.error('error')
					}
				} catch (error) {
					console.error(error);
				}

			} catch (error) {
				console.error(error);
			}
		}

		// //-----------------------------COURSE--------------------------------------
		let coursesSeed = seeds.course.default;
		for (i = 0; i < coursesSeed.length; i++) {
			try {

				const course = await connection.manager.create(Course, coursesSeed[i]);
				const department = await connection.manager.findOne(Department, coursesSeed[i].deptIDNum)
				// console.log('-----------------', department);
				if (department) {
					course.deptID = department;
					// console.log('-----------------', course);
				}

				await connection.manager.save(course);
			} catch (error) {
				// console.error(error);
			}
		}


		// //--------------------------------MAJOR-----------------------------------
		const majorsSeed = seeds.major.default;
		for (i = 0; i < majorsSeed.length; i++) {
			try {
				const majors = await connection.manager.create(Major, majorsSeed[i]);
				const dept = await connection.manager.findOne(Department, majorsSeed[i].deptID)
				dept ? majors.department = dept : console.log('no department found')
				await connection.manager.save(majors);
			} catch (error) {
				// console.error(error);
			}
		}



		// //------------------------------MINOR--------------------------------------
		const minorsSeed = seeds.minor.default;
		for (i = 0; i < minorsSeed.length; i++) {
			try {
				const minors = await connection.manager.create(Minor, minorsSeed[i]);
				const dept = await connection.manager.findOne(Department, minorsSeed[i].deptID)
				dept ? minors.department = dept : console.log('no department found')
				await connection.manager.save(minors);
			} catch (error) {
				// console.error(error);
			}
		}




		// //--------------------------ADMINISTRATOR---------------------------------
		const administratorsSeed = seeds.administrator.default;
		for (i = 0; i < administratorsSeed.length; i++) {
			try {
				const user = await connection.manager.create(Users, administratorsSeed[i])
				const administrators = await connection.manager.create(Administrator, administratorsSeed[i]);

				await connection.manager.save(user);
				await connection.manager.save(administrators);
			} catch (error) {
				// console.error(error);
			}
		}


		// //----------------------------HOLDS----------------------------------------
		const holdsSeed = seeds.holds.default
		for (i = 0; i < holdsSeed.length; i++) {
			try {
				const hold = await connection.manager.create(Hold, holdsSeed[i])
				await connection.manager.save(hold)
			} catch (error) {

			}
		}
		const holds = await connection.manager.find




		// // // //----------------------RETRIEVING ALL THE DATA----------------------------
		const buildings = await connection.manager.find(Building)
		const labs = await connection.manager.find(Lab)
		const lectures = await connection.manager.find(Lecture)
		const offices = await connection.manager.find(Office)
		const semesters = await connection.manager.find(Semester)
		const researchers = await connection.manager.find(Researcher)
		const periods = await connection.manager.find(Period)
		const departments = await connection.manager.find(Department)
		const majors = await connection.manager.find(Major)
		const minors = await connection.manager.find(Minor)
		const days = await connection.manager.find(Day)
		const administrators = await connection.manager.find(Administrator)

		const fullTimeFaculty = await connection.manager.find(FacultyFullTime)
		const partTimeFaculty = await connection.manager.find(FacultyPartTime)
		const fullTimeGrads = await connection.manager.find(GraduateFullTime)
		const partTimeGrads = await connection.manager.find(GraduatePartTime)
		const fullTimeUndergrads = await connection.manager.find(UnderGraduateFullTime)
		const partTimeUndergrads = await connection.manager.find(UnderGraduatePartTime)
		const faculty = await connection.manager.find(Faculty)
		const users = await connection.manager.find(Users)
		const students = await connection.manager.find(Student)


		// // -----------------------------Join Tables--------------------------------

		// //------------------------------Faculty -----------------------



		for (i = 0; i < departments.length; i++) {
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

		for (i = 0; i < faculty.length; i++) {
			try {
				if (iter == 16) {
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
					// console.log('----------------------------', iter, 'couldnt find dept')
				}
				iter++;
			} catch (error) {
				console.error(error)
			}


		}

		// --------------------------------Student Minor---------------------------
		for (i = 0; i < students.length; i++) {
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			majorNum > majors.length - 1 ? majorNum = 1 : null
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			minorNum > minors.length - 1 ? minorNum = 1 : null
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			index > 3 ? index = 1 : null

			if (index === 1) {
				let major = await connection.manager.findOne(Major, majorNum)
				if (major) {
					const studentMajor = await connection.manager.create(StudentMajor, {
						majorID: major,
						sID: students[i],
						dateDeclared: new Date("November 12 2020")
					})
					await connection.manager.save(studentMajor);
					// students[i].studentMajors = [studentMajor];
					// await connection.manager.save(Student, students[i]);
					majorNum++;
					index++;
				}

			}
			if (index === 2) {
				let major = await connection.manager.findOne(Major, majorNum)
				if (major) {
					const studentMajor = await connection.manager.create(StudentMajor, {
						majorID: major,
						sID: students[i],
						dateDeclared: new Date("November 12 2020")
					})
					await connection.manager.save(studentMajor);
					// students[i].studentMajors = [studentMajor];
					// await connection.manager.save(Student, students[i]);
					majorNum++;
					index++;
				}

				let minor = await connection.manager.findOne(Minor, minorNum)
				if (minor) {
					const studentMinor = await connection.manager.create(StudentMinor, {
						minorID: minor,
						sID: students[i],
						dateDeclared: new Date("November 12 2020")
					})
					await connection.manager.save(studentMinor);
					// students[i].studentMinors = [studentMinor];
					// await connection.manager.save(Student, students[i]);
					majorNum++;
					minorNum++;
					index++;
				}

			}

			if (index === 3) {
				let major = await connection.manager.findOne(Major, majorNum)
				if (major) {
					const studentMajor = await connection.manager.create(StudentMajor, {
						majorID: major,
						sID: students[i],
						dateDeclared: new Date("November 12 2020")
					})
					await connection.manager.save(studentMajor);
					majorNum++;
					index++;
				}
				majorNum++;
				let major2 = await connection.manager.findOne(Major, majorNum)
				if (major2) {
					const studentMajor2 = await connection.manager.create(StudentMajor, {
						majorID: major2,
						sID: students[i],
						dateDeclared: new Date("November 12 2020")
					})
					await connection.manager.save(studentMajor2);
					majorNum++;
					minorNum++;
					index++;

				}

			}
			// console.log(students);
		}

		// //Advisors
		for (i = 0; i < students.length; i++) {
			try {
				const sID = students[i].userID;
				const majorIDs = await connection.manager.findOne(StudentMajor, { where: { sID: sID } });
				if (majorIDs) {
					const major = await connection.manager.findOne(Major, majorIDs.majorID);
					const department = major ? major.department : null;
					const faculty = department ? department.Faculties : null;
				}
				let min = Math.ceil(0);
				let max = Math.floor(faculty.length);
				let num = Math.floor(Math.random() * (max - min) + min);
				const advisors = await connection.manager.create(Advisor, { sID: students[i], fID: faculty[num], dateAssigned: new Date('November 12, 2020 04:28:00') })
				await connection.manager.save(advisors);
			}
			catch (error) {
				console.error(error);
			}
		}

		// // // Student Holds
		iter = 1;
		for (i = 0; i < students.length; i += 19) {
			try {
				if (iter === 9) {

					iter = 1;
				}
				const sID = students[i];
				let holdID = iter;
				const hold = await connection.manager.findOne(Hold, holdID);

				const studentHold = await connection.manager.create(StudentHold, { sID, holdID: hold });
				await connection.manager.save(studentHold);

				iter++;
			}
			catch (error) {
				console.log(error);
			}
		}


		//		TIME RELATED STUFF
		//   						TIME RELATED STUFF
		//												TIME RELATED STUFF
		//	by ya boi Ty													TIME RELATED STUFF

		// -------------------------------SEMESTER----------------------------------
		const semestersSeed = seeds.semester.default;
		for (i = 0; i < semestersSeed.length; i++) {
			try {
				const semester = await connection.manager.create(Semester, semestersSeed[i]);
				await connection.manager.save(semester);
			} catch (error) {
				// console.error(error);
			}
		}


		// ------------------------------PERIOD-------------------------------------

		const periodsSeed = seeds.period.default;
		for (i = 0; i < periodsSeed.length; i++) {
			try {
				const period = await connection.manager.create(Period, periodsSeed[i]);
				await connection.manager.save(period);
			} catch (error) {
				// console.error(error);
			}
		}


		// ----------------------TimeSlot v2-------------------------------------

		const timeslotsSeed = seeds.timeslots.default
		for (i = 0; i < timeslotsSeed.length; i++) {
			try {
				const period = await connection.manager.findOne(Period, timeslotsSeed[i].periodIDNum);
				const timeslot = await connection.manager.create(TimeSlot, timeslotsSeed[i])
				period ? timeslot.periodID = period : console.log('Period not found')
				await connection.manager.save(timeslot)
			} catch (error) {
			}
		}

		const timeslots = await connection.manager.find(TimeSlot)

		// -----THE 3 CODE BLOCKS BELOW ARE DEPRECATED BECAUSE OF TIMESLOT V2 CREATION---------------------

		// //------------------------Timeslots----------------------------------------
		// const timeslotsSeed = seeds.timeslots.default
		// for (i = 0; i < timeslotsSeed.length; i++) {
		// 	try {
		// 		const timeslot = await connection.manager.create(TimeSlot, timeslotsSeed[i])
		// 		await connection.manager.save(timeslot)
		// 	} catch (error) {
		// 	}
		// }

		// //---------------------------------DAY-------------------------------------
		// const daysSeed = seeds.day.default;
		// for (i = 0; i < daysSeed.length; i++) {
		// 	try {
		// 		const days = await connection.manager.create(Day, daysSeed[i]);
		// 		await connection.manager.save(days);
		// 	} catch (error) {
		// 		// console.error(error);
		// 	}
		// }

		// //----------------------------DayAndPeriod---------------------------------
		// for (i = 0; i < periods.length; i++) {
		// 	for (let j = 0; j < days.length; j++) {
		// 		const dayAndPeriod = await connection.manager.create(DayAndPeriod, {
		// 			periodID: periods[i],
		// 			dayID: days[j],
		// 			slotID: timeslotCnt
		// 		})
		// 		await connection.manager.save(dayAndPeriod)
		// 		timeslotCnt++;
		// 	}
		// }

		// TODO: seed classes and handle faculty associations
		const classSeed = seeds.classes.default;
		try {
			for (i = 0; i < classSeed.length; i++) {
				const oneClass = await connection.manager.create(Class, classSeed[i]);
				// console.log(classSeed[i].courseIDNum);
				const course = await connection.manager.findOne(Course, classSeed[i].courseIDNum);
				const semester = await connection.manager.findOne(Semester, classSeed[i].semesterIDNum);
				const room = await connection.manager.findOne(Lecture, classSeed[i].roomIDNum);
				const timeslot = await connection.manager.findOne(TimeSlot, classSeed[i].slotIDNum);


				if (course && semester && room && timeslot) {
					oneClass.courseID = course;
					oneClass.semesterID = semester;
					oneClass.roomID = room;
					oneClass.slotID = timeslot;

					const dept = course.deptID;
					const facIDArr = await connection.manager.find(FacultyDepartment, { where: { deptID: dept.deptID } });

					for (let j = 0; j < facIDArr.length; j++) {

						let fac = await connection.manager.findOne(Faculty, facIDArr[j].fID);
						if (fac) {
							let classes = await connection.manager.find(Class, { where: { fID: fac.userID } });

							let shouldTeach = true;
							// console.log(fac);
							// console.log(classes, 'list of classes');
							if (!classes) {
								// console.log('masdmalsmdlmasldmalsmd');
								oneClass.fID = fac;
								await connection.manager.save(oneClass);

								j = facIDArr.length;
							}
							else {


								let count = 0
								for (let k = 0; k < classes.length; k++) {

									let slot = classes[k].slotID;
									let semester = classes[k].semesterID;
									// console.error(semester, oneClass.semesterID, oneClass.semesterID === semester);
									// console.error(slot, oneClass.slotID, oneClass.slotID === slot);
									if (oneClass.semesterID.semesterID === semester.semesterID) {
										count++;
									}
									if (count > 4) {
										shouldTeach = false;
										console.error('too many this semester');
										k = classes.length;
									}
									if (oneClass.slotID.slotID === slot.slotID && oneClass.semesterID.semesterID === semester.semesterID) {
										shouldTeach = false;
										console.error('shouldnt teach due to conflict------------');
										k = classes.length;
									}
								}


								if (shouldTeach === true) {

									oneClass.fID = fac;
									await connection.manager.save(oneClass);




									j = facIDArr.length;


								}
							}


						}


					}

				}



			}
		} catch (error) {
			console.error(error);
		}

		//--------ENROLLMENT----------------ya boi Ty
		const stuArr = await connection.manager.find(Student, { where: { sGradYear: 2024 } });

		//For each student with gradYear 2024
		for (i = 0; i < stuArr.length; i++) {
			let firstSemester = [121, 1, 136, 99] 	//English1, AmerPeop1, CS1, Chem1
			const stu = await connection.manager.findOne(Student, stuArr[i].userID);

			//For each of the 4 classes
			for (let j = 0; j < firstSemester.length; j++) {
				const currCourse = await connection.manager.findOne(Course, firstSemester[j])
				const sem9 = await connection.manager.findOne(Semester, 9);

				const newClass = await connection.manager.findOne(Class, { where: { courseID: currCourse, semesterID: sem9 } });
				let newEnroll = connection.manager.create(Enrollment, {
					sID: stu,
					classCRN: newClass,
					enrollDate: "7/30/2020"
				})

				await connection.manager.save(newEnroll);
			}
		}

		//--------MajorReqs----------------
		// const majorReqSeed = seeds.majorReqs.default
		// for(i = 0; i < majorReqSeed.length; i++){ 
		// 	try{
		// 		const course = await connection.manager.findOne(Course, majorReqSeed[i].courseID);
		// 		const major = await connection.manager.findOne(Major, majorReqSeed[i].majorID);
		// 		const majorReqs = await connection.manager.create(MajorRequirement, {gradeRequired: 'C', majorID: major, courseID: course});
		// 		// console.log(majorReqs);
		// 		await connection.manager.save(majorReqs);
		// 	}catch(error){
		// 		console.error(error);
		// 	}
		// }

		//---------MinorReqs-----------------
		const minorReqSeed = seeds.minorReqs.default
		for(i = 0; i < minorReqSeed.length; i++){
			try{
				const course  = await connection.manager.findOne(Course, minorReqSeed[i].courseID);
				const minor = await connection.manager.findOne(Minor, minorReqSeed[i].minorID);
				const minorReqs = await connection.manager.create(MinorRequirement, {gradeRequired: 'C', minorID: minor, courseID: course});
				await connection.manager.save(minorReqs);
			}catch(error){
				console.log(error);
			}
		}


		// TODO: Faculty History
		// TODO: Minor Requirements
		// TODO: Student History
		// TODO: Attendance

	})
	.catch((error) => console.log(error));
