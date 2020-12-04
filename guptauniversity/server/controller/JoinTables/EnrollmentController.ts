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

	async changeFinalGrade(request: Request, response: Response, next: NextFunction) {
		//Request needs to have grade, sID, classCRN
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
		//Request needs to have grade, sID, classCRN
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
		let student = await this.studentRepository.findOne(request.params.sID);
		let addClass = await this.classRepository.findOne(request.params.classCRN);
		const entityManager = getManager();

		//Ensure the student isn't already enrolled in that class
		let checkEnroll = await this.enrollmentRepository.findOne({ where: { sID: student, classCRN: addClass } })
		if (checkEnroll) {
			return { done: false, msg: "An enrollment with those credentials already exists" }
		}

		try {
			if (student) {
				if (addClass) {
					if (student.studentType == "undergraduate") {
						//Undergraduate
						let ugStu = await this.undergradStudentRepository.findOne(student.userID)
						if (ugStu) {
							if (ugStu.isFullTime) {
								//Full Time
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
								//Part Time
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
								//Full Time
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
								//Part Time
								let ptGStu = await this.ptGradstudentRepository.findOne(student.userID)

								if (ptGStu) {
									//Check credit cap

									if (ptGStu.currentCredits + 4 > ptGStu.maxCreditsAllowed) {
										//This student is going to become full time - Affected: isFullTime, maxCreditsAllowed, isDorming

										ptGStu.isFullTime = true;
										ptGStu.maxCreditsAllowed = 16;
										ptGStu.minCreditsAllowed = 12;
										console.log(ptGStu)
										let ftGStu = entityManager.create(GraduateFullTime, { ...ptGStu, isDorming: false });
										console.log(ftGStu)

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
									console.log(ptGStu.currentCredits)
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
}