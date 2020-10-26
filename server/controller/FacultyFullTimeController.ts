import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { FacultyFullTime } from '../entity/FacultyFullTime';
import { validate, validateOrReject } from 'class-validator';

export class FacultyFullTimeController {
	private FacultyFullTimeRepository = getRepository(FacultyFullTime);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.FacultyFullTimeRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.FacultyFullTimeRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const facultyFullTime = new FacultyFullTime(request.body);
		const errors = await validate(FacultyFullTime);
		console.log(errors);
		if (!errors) {
			return this.FacultyFullTimeRepository.save(request.body);
		}
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const FacultyFullTimeToRemove: FacultyFullTime | undefined = await this.FacultyFullTimeRepository.findOne(
			request.params.id,
		);
		try {
			if (FacultyFullTimeToRemove) {
				await this.FacultyFullTimeRepository.remove(FacultyFullTimeToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}
}
