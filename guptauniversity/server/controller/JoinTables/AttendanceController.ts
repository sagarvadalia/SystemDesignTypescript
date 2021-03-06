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

		// We need to switch this to take in a date and return the attendances just for that day
		let thisClass = await this.classRepository.findOne(request.params.id);
		let allAttends: Array<Array<Attendance>> = []
		const datesAreOnSameDay = (first: Date, second: Date) =>
			first.getUTCDate() === second.getUTCDate() &&
			first.getMonth() === second.getMonth() &&
			first.getFullYear() === second.getFullYear();
		try {
			if (thisClass) {
				let thisEnrolls = await this.enrollmentRepository.find({ where: { classCRN: thisClass } }) //Array of enrollment objs
				if (thisEnrolls) {
					for (let i = 0; i < thisEnrolls.length; i++) {
						let newAtt = await this.attendanceRepository.find({ where: { enrollmentID: thisEnrolls[i] } }) //Array of that student's attendances
						let todayAtt: Array<Attendance> = []
						for (let j = 0; j < newAtt.length; j++) {

							let date1 = new Date(newAtt[j].date);
							let date2 = newAtt[j].date;
							let date3 = new Date();


							if (datesAreOnSameDay(new Date(), new Date(newAtt[j].date))) {

								todayAtt.push(newAtt[j])
							}
						}
						thisEnrolls[i].attendances = todayAtt


						// return { done: false, msg: request.params.id + ": No attendance found with that ClassCRN" }
					}

					return { thisEnrolls };
				}
				return { done: false, msg: request.params.id + ": No enrollments found with that ClassCRN" }
			}
			return { done: false, msg: request.params.id + ": No class found with that ClassCRN" }
		} catch (error) {
			console.error(error);
		}
	}

	async newAttendance(request: Request, response: Response, next: NextFunction) {
		//Give me an enrollmentID and isPresent(bool)
		let enrollID: any = request.query.enrollID
		let isPresent: any = request.query.isPresent
		console.log(enrollID, isPresent);
		let todaysDate = new Date()

		let enroll = await this.enrollmentRepository.findOne(enrollID);
		const entityManager = getManager();
		var wasPresent = (isPresent == 'true');
		const datesAreOnSameDay = (first: Date, second: Date) =>
			first.getUTCDate() === second.getUTCDate() &&
			first.getMonth() === second.getMonth() &&
			first.getFullYear() === second.getFullYear();

		try {
			if (enroll) {
				let pastAtt = await this.attendanceRepository.find({ where: { enrollmentID: enroll } })
				if (pastAtt.length != 0) {
					for (let i = 0; i < pastAtt.length; i++) {
						let isEqual = datesAreOnSameDay(new Date(pastAtt[i].date), todaysDate)
						if (isEqual) {
							return { done: false, msg: enroll.sID + "An attendance for that student already exists for today" }
						}
					}
				}

				if (wasPresent != null) {
					let newAtt = await entityManager.create(Attendance, { enrollmentID: enroll, isPresent: wasPresent, date: todaysDate });
					await this.attendanceRepository.save(newAtt);

					return { done: true, msg: enroll.sID + ": Attendance has been saved for " + todaysDate }
				}
			}
		} catch (error) {
			console.error(error);
		}
	}
}
