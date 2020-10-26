import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Attendance } from '../entity/Attendance';
import { validate, validateOrReject } from 'class-validator';

export class AttendanceController {
	private attendanceRepository = getRepository(Attendance);

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
}
