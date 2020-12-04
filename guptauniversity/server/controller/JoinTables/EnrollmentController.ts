import { getManager, getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Enrollment } from '../../entity/JoinTables/Enrollment';
import { validate, validateOrReject } from 'class-validator';
import { Class } from '../../entity/ClassRelated/Class';
import { Course } from '../../entity/ClassRelated/Course';
import { Semester } from '../../entity/TimeRelated/Semester';
import { Student } from '../../entity/Users/Student';

export class EnrollmentController {
	private enrollmentRepository = getRepository(Enrollment);
	private classRepository = getRepository(Class);
	private courseRepository = getRepository(Course);
	private studentRepository = getRepository(Student);

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

	async changeGrade(request: Request, response: Response, next: NextFunction) {
		//Request needs to have grade, sID, classCRN
		try {
			console.log(request);
			let thisEnroll = await this.enrollmentRepository.findOne({
				where: { classCRN: request.body.classID, sID: request.body.sID },
			});
			// console.log(thisEnroll);

			if (thisEnroll && typeof request.body.grade === 'string') {
				thisEnroll.grade = request.body.grade;
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
		//Give me an sID and a classCRN and I'll make an enrollment with today's date and grade of ' '
		const student = await this.studentRepository.findOne(request.params.sID);
		const addClass = await this.classRepository.findOne(request.params.classCRN);
		const entityManager = getManager();
		try {
			if (student && addClass) {
				let newEnroll = await entityManager.create(Enrollment, { sID: student, classCRN: addClass, enrollDate: new Date(), grade: ' ' });
				await this.enrollmentRepository.save(newEnroll)
			}
		} catch (error) {
			console.error(error);
		}
	}
}
