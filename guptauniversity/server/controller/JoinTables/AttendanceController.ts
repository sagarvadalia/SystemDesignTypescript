import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Attendance } from '../../entity/JoinTables/Attendance';
import { validate, validateOrReject } from 'class-validator';
import { Enrollment } from '../../entity/JoinTables/Enrollment';
import { getManager } from "typeorm";
import { Class } from '../../entity/ClassRelated/Class';

export class AttendanceController {
	private attendanceRepository = getRepository(Attendance);
	private enrollmentRepository = getRepository(Enrollment);
	private classRepository = getRepository(Class);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.attendanceRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.attendanceRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const attendance = new Attendance(request.body);
		const errors = await validate(attendance);
		console.log(errors);
		if (!errors) {
			return this.attendanceRepository.save(request.body);
		}
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const attendanceToRemove: Attendance | undefined = await this.attendanceRepository.findOne(request.params.id);
		try {
			if (attendanceToRemove) {
				await this.attendanceRepository.remove(attendanceToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}

	async viewAttendanceForClass(request: Request, response: Response, next: NextFunction) {
		//given a classCRN we need to return a list of attendances
		let thisClass = await this.classRepository.findOne(request.params.id);
		let allAttends: Array<Array<Attendance>> = []
		try {
			if (thisClass) {
				let thisEnrolls = await this.enrollmentRepository.find({ where: { classCRN: thisClass } }) //Array of enrollment objs
				if (thisEnrolls) {
					for (let i = 0; i < thisEnrolls.length; i++) {
						let newAtt = await this.attendanceRepository.find({ where: { enrollmentID: thisEnrolls[i] } }) //Array of that student's attendances
						if (newAtt) {
							allAttends.push(newAtt);
						}
						return { done: false, msg: request.params.id + ": No attendance found with that ClassCRN" }
					}
					return allAttends;
				}
				return { done: false, msg: request.params.id + ": No enrollments found with that ClassCRN" }
			}
			return { done: false, msg: request.params.id + ": No class found with that ClassCRN" }
		} catch (error) {
			console.error(error);
		}
	}

	async newAttendance(request: Request, response: Response, next: NextFunction) {
		//Give me an enrollmentID and isPresent(bool). If no Date object is given, I assume today's date
		//Changed from request.params to request.body so that a date object can be passed in but unable to test now.
		let enroll = await this.enrollmentRepository.findOne(request.body.enrollID);
		const entityManager = getManager();
		var wasPresent = (request.body.isPresent == 'true');

		try {
			if (enroll && request.body.date && wasPresent != null) {
				let newAtt = await entityManager.create(Attendance, { enrollmentID: enroll, isPresent: wasPresent, date: request.body.date });
				await this.attendanceRepository.save(newAtt);
			}

			if (enroll && wasPresent != null) {
				let newAtt = await entityManager.create(Attendance, { enrollmentID: enroll, isPresent: wasPresent, date: new Date() });
				await this.attendanceRepository.save(newAtt);
			}
		} catch (error) {
			console.error(error);
		}
	}
}
