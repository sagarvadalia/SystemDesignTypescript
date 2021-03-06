import { getManager, getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Enrollment } from '../../entity/JoinTables/Enrollment';
import { validate, validateOrReject } from 'class-validator';
import { Class } from '../../entity/ClassRelated/Class';
import { Course } from '../../entity/ClassRelated/Course';
import { Semester } from '../../entity/TimeRelated/Semester';
import { Student } from '../../entity/Users/Student';
import { Graduate } from '../../entity/Users/Graduate';
import { UnderGraduate } from '../../entity/Users/UnderGraduate';
import { GraduateFullTime } from '../../entity/Users/GraduateFullTime';
import { GraduatePartTime } from '../../entity/Users/GraduatePartTime';
import { UnderGraduateFullTime } from '../../entity/Users/UnderGraduateFullTime';
import { UnderGraduatePartTime } from '../../entity/Users/UnderGraduatePartTime';
import { Hold } from '../../entity/StudentRelated/Hold';
import { StudentHold } from '../../entity/JoinTables/StudentHold';
import { Grading } from '../../entity/ClassRelated/Grading';
import { Prerequisite } from '../../entity/ClassRelated/Prerequisite';
import { ActionThumbDown } from 'material-ui/svg-icons';


export class EnrollmentController {
	private enrollmentRepository = getRepository(Enrollment);
	private classRepository = getRepository(Class);
	private courseRepository = getRepository(Course);
	private studentRepository = getRepository(Student);
	private gradStudentRepository = getRepository(Graduate);
	private undergradStudentRepository = getRepository(UnderGraduate);
	private ptUndergradstudentRepository = getRepository(UnderGraduatePartTime);
	private ftUndergradstudentRepository = getRepository(UnderGraduateFullTime);
	private ptGradstudentRepository = getRepository(GraduatePartTime);
	private ftGradstudentRepository = getRepository(GraduateFullTime);
	private studentHoldRepository = getRepository(StudentHold);
	private holdRepository = getRepository(Hold);
	private gradeRepo = getRepository(Grading)
	private preReqRepo = getRepository(Prerequisite)

	async all(request: Request, response: Response, next: NextFunction) {
		return this.enrollmentRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.enrollmentRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const enrollment = new Enrollment(request.body);
		const errors = await validate(enrollment);
		console.log(errors);
		if (!errors) {
			return this.enrollmentRepository.save(request.body);
		}
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const enrollmentToRemove: Enrollment | undefined = await this.enrollmentRepository.findOne(request.params.id);
		try {
			if (enrollmentToRemove) {
				await this.enrollmentRepository.remove(enrollmentToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}

	async studentHistory(request: Request, response: Response, next: NextFunction) {
		try {
			let enrollment: any = await this.enrollmentRepository.find({ where: { sID: request.params.id } });
			console.log('enrollment----------', enrollment);

			for (let i = 0; i < enrollment.length; i++) {
				let classCRN = enrollment[i].classCRN;
				console.log(classCRN);
				if (classCRN) {
					enrollment[i].classNumber = classCRN.classCRN;
					enrollment[i].semester = classCRN.semesterID;
					let course = enrollment[i].classCRN.courseID;
					enrollment[i].courseName = course.courseName;
				}
			}
			return enrollment;
		} catch (error) {
			console.error(error);
		}
	}

	async viewGPA(request: Request, response: Response, next: NextFunction) {
		try {
			let student = await this.studentRepository.findOne(request.params.id);

			if (student) {
				let gpa = student.sGPA;
				return { done: true, msg: "Accumulative GPA: " + gpa };
			}
			return { done: false, msg: "A student with that ID does not exist." }
		} catch (error) {
			console.log(error);
		}
	}

	async changeFinalGrade(request: Request, response: Response, next: NextFunction) {
		//Request needs to have grade, sID, classCRN
		// let foo = await this.gradeRepo.findOne(1);
		// if (foo) {
		// 	if (!foo.canAddFinalGrade) {
		// 		return { done: false, msg: "The administration has disabled changing final grades at this time" };
		// 	}
		// }

		// let date = new Date()
		// if (date.getUTCMonth() == 11) {
		// 	return { done: false, msg: "The time period for changing final grades has passed." };
		// }
		try {
			console.log(request);
			let thisEnroll = await this.enrollmentRepository.findOne({
				where: { classCRN: request.body.classID, sID: request.body.sID },
			});
			// console.log(thisEnroll);

			if (thisEnroll && typeof request.body.grade === 'string') {
				thisEnroll.finalGrade = request.body.grade;
				await this.enrollmentRepository.save(thisEnroll);
			}
			return 'HELLO';
			return thisEnroll;
			// return 'HELLO';
		} catch (error) {
			console.error(error);
		}
	}

	async changeMidtermGrade(request: Request, response: Response, next: NextFunction) {
		// //Request needs to have grade, sID, classCRN
		// let foo = await this.gradeRepo.findOne(1);
		// if (foo) {
		// 	if (!foo.canAddMidtermGrade) {
		// 		return { done: false, msg: " The administration has disbaled changing midterm grades at this time" }
		// 	}
		// }

		// let date = new Date()
		// if (date.getUTCMonth() == 11) {
		// 	return { done: false, msg: "The time period for changing midterm grades has passed" }
		// }

		try {
			console.log(request);
			let thisEnroll = await this.enrollmentRepository.findOne({
				where: { classCRN: request.body.classID, sID: request.body.sID },
			});
			// console.log(thisEnroll);

			if (thisEnroll && typeof request.body.grade === 'string') {
				thisEnroll.midtermGrade = request.body.grade;
				await this.enrollmentRepository.save(thisEnroll);
			}
			return 'HELLO';
			return thisEnroll;
			// return 'HELLO';
		} catch (error) {
			console.error(error);
		}
	}

	async studentHistoryBySemester(request: Request, response: Response, next: NextFunction) {
		try {
			let enrollment: any = await this.enrollmentRepository.find({ where: { sID: request.params.id } });
			// console.log('enrollment----------', enrollment);
			let filteredEnrollments: any = [];
			for (let i = 0; i < enrollment.length; i++) {
				let classCRN = enrollment[i].classCRN;
				// console.log(classCRN);
				if (classCRN) {
					enrollment[i].classNumber = classCRN.classCRN;
					enrollment[i].semester = classCRN.semesterID;
					let course = enrollment[i].classCRN.courseID;
					enrollment[i].courseName = course.courseName;
					// console.log(classCRN.semesterID);
					// console.log(request.params);
					if (classCRN.semesterID.semesterID === parseInt(request.params.semesterID)) {
						filteredEnrollments.push(enrollment[i]);
					}
				}
			}
			return filteredEnrollments;
		} catch (error) {
			console.error(error);
		}
	}

	async addClass(request: Request, response: Response, next: NextFunction) {
		//Give me an sID and a classCRN and I'll make an enrollment with today's date. I RETURN AN OBJECT  {done(bool), msg(string)}
		//First check two constraints
		// let foo = await this.gradeRepo.findOne(1)
		// if (foo) {
		// 	if (!foo.canAddCourse) {
		// 		return { done: false, msg: "The administration has disabled adding classes at this time" }
		// 	}
		// }

		// let date = new Date()
		// if (date.getUTCMonth() == 11) {
		// 	return { done: false, msg: "The time period for adding classes has passed." }
		// }

		let student = await this.studentRepository.findOne(request.params.sID);
		let addClass = await this.classRepository.findOne(request.params.classCRN);
		let stuHold = await this.studentHoldRepository.find({ where: { sID: request.params.sID } });
		const entityManager = getManager();

		//Checks if the student has a hold
		if (stuHold.length > 0) {
			return { done: false, msg: request.params.sID + ": this student has a hold and therefore cannot enroll in classes at this time. " };
		}

		//Check for the gosh dang prereqs why dontchya
		if (addClass) {
			let prereqs = await this.preReqRepo.find({ where: { courseID: addClass.courseID.courseID } })
			if (prereqs.length != 0) {
				console.log(prereqs)
				let theirEnrolls = await this.enrollmentRepository.find({ where: { sID: student } })
				let preReqsDone = 0
				if (theirEnrolls.length != 0) {
					for (let i = 0; i < theirEnrolls.length; i++) {
						for (let j = 0; j < prereqs.length; j++) {
							if (theirEnrolls[i].classCRN.courseID.courseID == prereqs[j].prereqID) {
								preReqsDone++
							}
						}
					}
				}
				if (preReqsDone != prereqs.length) {
					return { done: false, msg: "This student has not satisfied the prereqs for class " + request.params.classCRN }
				}
			}
		}

		try {
			if (student) {
				if (addClass) {
					//Check for conflicts
					let theirEnrolls = await this.enrollmentRepository.find({ where: { sID: student } })
					for (let i = 0; i < theirEnrolls.length; i++) {
						console.log('hi')
						if (theirEnrolls[i].classCRN.semesterID.semesterID === addClass.semesterID.semesterID) {
							console.log('hey')
							//Ensure the student isn't already enrolled in that class
							if (theirEnrolls[i].classCRN.classCRN === addClass.classCRN) {
								return { done: false, msg: student.userID + ": This student is already enrolled in that class" }
							}

							//Ensure they are free during that time
							if (theirEnrolls[i].classCRN.slotID.slotID === addClass.slotID.slotID) {
								return { done: false, msg: student.userID + ": This student is already enrolled in a class during that timeslot" }
							}
							console.log('hi')
							//TODO CHECK FOR PREREQ FULFILLMENT -ty lemme do this
						}
					}
					//Ensure open seats
					if (addClass.openSeats === 0) {
						return { done: false, msg: student.userID + ": That class has no open seats" }
					}

					//No conflicts, let's process the request
					if (student.studentType == "undergraduate") {
						//Undergraduate
						let ugStu = await this.undergradStudentRepository.findOne(student.userID)
						if (ugStu) {
							if (ugStu.isFullTime) {
								//Full Time Undergraduate
								let ftUGStu = await this.ftUndergradstudentRepository.findOne(ugStu.userID)

								if (ftUGStu) {
									//Check credit cap
									if (ftUGStu.currentCredits + 4 > ftUGStu.maxCreditsAllowed) {
										return { done: false, msg: ftUGStu.userID + ": This student is already taking the maximum allowed number of credits." };
									}

									//Enroll them
									let newEnroll = await entityManager.create(Enrollment, { sID: ftUGStu, classCRN: addClass, enrollDate: new Date() });
									await this.enrollmentRepository.save(newEnroll)

									//Update and store the student's currentCredits
									ftUGStu.currentCredits = ftUGStu.currentCredits + 4;
									this.ftUndergradstudentRepository.save(ftUGStu);
									this.undergradStudentRepository.save(ftUGStu);
									this.studentRepository.save(ftUGStu);

									return { done: true, msg: ftUGStu.userID + ": FTUG's new class was saved successfully" }
								}

							} else {
								//Part Time Undergraduate
								let ptUGStu = await this.ptUndergradstudentRepository.findOne(student.userID)

								if (ptUGStu) {
									//Check credit cap
									if ((ptUGStu.currentCredits + 4) > ptUGStu.maxCreditsAllowed) {
										//This student is going to become full time - Affected: isFullTime, maxCreditsAllowed, isDorming

										ptUGStu.isFullTime = true;
										ptUGStu.maxCreditsAllowed = 16;
										ptUGStu.minCreditsAllowed = 12;
										let ftUGStu = entityManager.create(UnderGraduateFullTime, { ...ptUGStu, isDorming: false });

										//Enroll them
										let newEnroll = await entityManager.create(Enrollment, { sID: ftUGStu, classCRN: addClass, enrollDate: new Date() });
										await this.enrollmentRepository.save(newEnroll)

										//Update and store the student's currentCredits
										ftUGStu.currentCredits = ftUGStu.currentCredits + 4;
										this.ftUndergradstudentRepository.save(ftUGStu);
										this.undergradStudentRepository.save(ftUGStu);
										this.studentRepository.save(ftUGStu);

										await this.ptUndergradstudentRepository.remove(ptUGStu);

										return { done: true, msg: ftUGStu.userID + ": This part-time student has become full-time, and was enrolled in the new class" }
									}

									//Enroll them
									let newEnroll = await entityManager.create(Enrollment, { sID: ptUGStu, classCRN: addClass, enrollDate: new Date() });
									await this.enrollmentRepository.save(newEnroll)

									//Update and store the student's currentCredits
									ptUGStu.currentCredits = ptUGStu.currentCredits + 4;
									this.ptUndergradstudentRepository.save(ptUGStu);
									this.undergradStudentRepository.save(ptUGStu);
									this.studentRepository.save(ptUGStu);

									return { done: true, msg: ptUGStu.userID + ": PTUG's new class was saved successfully" }
								}
							}
						}
					} else {
						//Graduate
						let gStu = await this.gradStudentRepository.findOne(student.userID)
						if (gStu) {
							if (gStu.isFullTime) {
								//Full Time Graduate
								let ftGStu = await this.ftGradstudentRepository.findOne(student.userID)

								if (ftGStu) {
									//Check credit cap
									if (ftGStu.currentCredits + 4 > ftGStu.maxCreditsAllowed) {
										return { done: false, msg: ftGStu.userID + ": This student is already taking the maximum allowed number of credits." };
									}

									//Enroll them
									let newEnroll = await entityManager.create(Enrollment, { sID: ftGStu, classCRN: addClass, enrollDate: new Date() });
									await this.enrollmentRepository.save(newEnroll)

									//Update and store the student's currentCredits
									ftGStu.currentCredits = (ftGStu.currentCredits + 4);
									this.ftGradstudentRepository.save(ftGStu);
									this.gradStudentRepository.save(ftGStu);
									this.studentRepository.save(ftGStu);

									return { done: true, msg: ftGStu.userID + ": FTG's new class was saved successfully" }
								}
							} else {
								//Part Time Graduate
								let ptGStu = await this.ptGradstudentRepository.findOne(student.userID)

								if (ptGStu) {
									//Check credit cap

									if (ptGStu.currentCredits + 4 > ptGStu.maxCreditsAllowed) {
										//This student is going to become full time - Affected: isFullTime, maxCreditsAllowed, isDorming

										ptGStu.isFullTime = true;
										ptGStu.maxCreditsAllowed = 16;
										ptGStu.minCreditsAllowed = 12;

										let ftGStu = entityManager.create(GraduateFullTime, { ...ptGStu, isDorming: false });

										//Enroll them
										let newEnroll = await entityManager.create(Enrollment, { sID: ftGStu, classCRN: addClass, enrollDate: new Date() });
										await this.enrollmentRepository.save(newEnroll)

										//Update and store the student's currentCredits
										ftGStu.currentCredits = ftGStu.currentCredits + 4;
										this.ftGradstudentRepository.save(ftGStu);
										this.gradStudentRepository.save(ftGStu);
										this.studentRepository.save(ftGStu);
										await this.ptGradstudentRepository.remove(ptGStu);

										return { done: true, msg: ftGStu.userID + ": This part-time G student has become full-time, and was enrolled in the new class" }
									}

									//Enroll them
									let newEnroll = await entityManager.create(Enrollment, { sID: ptGStu, classCRN: addClass, enrollDate: new Date() });
									await this.enrollmentRepository.save(newEnroll)

									//Update and store the student's currentCredits
									ptGStu.currentCredits = ptGStu.currentCredits + 4;

									this.ptGradstudentRepository.save(ptGStu);
									this.gradStudentRepository.save(ptGStu);
									this.studentRepository.save(ptGStu);

									return { done: true, msg: ptGStu.userID + ": PTG's new class was saved successfully" }

								}
							}
						}
					}
				}
				return { done: false, msg: 'Class not found' };
			}
			return { done: false, msg: 'Student not found' };
		} catch (error) {
			console.error(error);
		}
	}

	async dropClass(request: Request, response: Response, next: NextFunction) {
		//Give me an enrollID and I'll remove it while handling credits and PT/FT constraints. I RETURN AN OBJECT  {done(bool), msg(string)}
		//First check two constraints
		// let foo = await this.gradeRepo.findOne(1)
		// if (foo) {
		// 	if (!foo.canDropCourse) {
		// 		return { done: false, msg: "The administration has disabled class dropping at this time" }
		// 	}
		// }

		// let date = new Date()
		// if (date.getUTCMonth() == 11) {
		// 	return { done: false, msg: "The time period for dropping classes has passed." }
		// }

		let thisEnroll = await this.enrollmentRepository.findOne(request.params.enrollID);
		const entityManager = getManager();

		try {
			if (thisEnroll) {
				let student = await this.studentRepository.findOne(thisEnroll.sID);
				let addClass = await this.classRepository.findOne(thisEnroll.classCRN);

				if (student && addClass) {
					//Have to get the student child for credit information
					if (student.studentType == 'undergraduate') {
						//Undergraduate
						let ugStu = await this.undergradStudentRepository.findOne(student.userID);
						if (ugStu) {
							if (ugStu.isFullTime) {
								//Undergraduate Full Time
								let ftUGStu = await this.ftUndergradstudentRepository.findOne(ugStu.userID);
								if (ftUGStu) {
									//If 16c, make it 12, drop the enrollment
									if (ftUGStu.currentCredits == 16) {
										ftUGStu.currentCredits = 12;

										this.enrollmentRepository.remove(thisEnroll);
										this.ftUndergradstudentRepository.save(ftUGStu);
										this.undergradStudentRepository.save(ftUGStu);
										this.studentRepository.save(ftUGStu);

										return { done: true, msg: ftUGStu.userID + ': Class dropped successfully' }
									}
									//If 12c, make it 8, make student ptUG, drop enrollment
									ftUGStu.currentCredits = 8;
									ftUGStu.maxCreditsAllowed = 11;
									ftUGStu.isFullTime = false;
									const { isDorming, ...rest } = ftUGStu
									let ptUGStu = { ...rest }

									this.ptUndergradstudentRepository.save(ptUGStu)
									this.undergradStudentRepository.save(ptUGStu)
									this.studentRepository.save(ptUGStu)
									this.ftUndergradstudentRepository.remove(ftUGStu)
									this.enrollmentRepository.remove(thisEnroll);

									return { done: true, msg: ptUGStu.userID + ': Class dropped successfully. Student is now part-time' }
								}
							} else {
								//Undergraduate Part Time
								let ptUGStu = await this.ptUndergradstudentRepository.findOne(ugStu.userID);
								if (ptUGStu) {
									//currentCredits - 4
									if (ptUGStu.currentCredits === 4) {
										return { done: false, msg: ptUGStu.userID + ": Class cannot be dropped as it is the only class the student is enrolled in" }
									}
									ptUGStu.currentCredits = ptUGStu.currentCredits - 4;

									this.ptUndergradstudentRepository.save(ptUGStu)
									this.undergradStudentRepository.save(ptUGStu)
									this.studentRepository.save(ptUGStu)
									this.enrollmentRepository.remove(thisEnroll);

									// if (ptUGStu.currentCredits == 0) {
									// 	return { done: true, msg: ptUGStu.userID + ': Class dropped successfully. This student is now taking 0 classes' }
									// }
									return { done: true, msg: ptUGStu.userID + ': Class dropped successfully.' }
								}
							}
						}
					} else {
						//Graduate
						let gStu = await this.gradStudentRepository.findOne(student.userID);
						if (gStu) {
							if (gStu.isFullTime) {
								//Graduate Full Time
								let ftGStu = await this.ftGradstudentRepository.findOne(gStu.userID);
								if (ftGStu) {
									//If 16c, make it 12, drop the enrollment
									if (ftGStu.currentCredits == 16) {
										ftGStu.currentCredits = 12;

										this.enrollmentRepository.remove(thisEnroll);
										this.ftGradstudentRepository.save(ftGStu);
										this.gradStudentRepository.save(ftGStu);
										this.studentRepository.save(ftGStu);

										return { done: true, msg: ftGStu.userID + ': Class dropped successfully' }
									}
									//If 12c, make it 8, make student ptUG, drop enrollment
									ftGStu.currentCredits = 8;
									ftGStu.maxCreditsAllowed = 11;
									ftGStu.isFullTime = false;
									const { isDorming, ...rest } = ftGStu
									let ptGStu = { ...rest }

									this.ptGradstudentRepository.save(ptGStu)
									this.gradStudentRepository.save(ptGStu)
									this.studentRepository.save(ptGStu)
									this.ftGradstudentRepository.remove(ftGStu)
									this.enrollmentRepository.remove(thisEnroll);

									return { done: true, msg: ptGStu.userID + ': Class dropped successfully. Student is now part-time' }
								}
							} else {
								//Graduate Part Time
								let ptGStu = await this.ptGradstudentRepository.findOne(gStu.userID);

								if (ptGStu) {
									//currentCredits - 4
									if (ptGStu.currentCredits === 4) {
										return { done: false, msg: ptGStu.userID + ": Class cannot be dropped as it is the only class the student is enrolled in" }
									}
									ptGStu.currentCredits = ptGStu.currentCredits - 4;

									this.ptGradstudentRepository.save(ptGStu)
									this.gradStudentRepository.save(ptGStu)
									this.studentRepository.save(ptGStu)
									this.enrollmentRepository.remove(thisEnroll);

									// if (ptGStu.currentCredits == 0) {
									// 	return { done: true, msg: ptGStu.userID + ': Class dropped successfully. This student is now taking 0 classes' }
									// }
									return { done: true, msg: ptGStu.userID + ': Class dropped successfully.' }
								}
							}
						}
					}
				}
				return { done: false, msg: 'This should NEVER happen' };
			} else {
				return { done: false, msg: 'No enrollment found with that ID' };
			}
		} catch (err) {
			console.error(err);
		}
	}
}

