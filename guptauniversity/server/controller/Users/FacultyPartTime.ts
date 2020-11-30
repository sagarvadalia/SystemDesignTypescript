import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { FacultyPartTime } from '../../entity/Users/FacultyPartTime';
import { validate, validateOrReject } from 'class-validator';

export class FacultyPartTimeController {
	private FacultyPartTimeRepository = getRepository(FacultyPartTime);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.FacultyPartTimeRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.FacultyPartTimeRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const facultyPartTime = new FacultyPartTime(request.body);
		const errors = await validate(FacultyPartTime);
		console.log(errors);
		if (!errors) {
			return this.FacultyPartTimeRepository.save(request.body);
		}
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const FacultyPartTimeToRemove: FacultyPartTime | undefined = await this.FacultyPartTimeRepository.findOne(
			request.params.id,
		);
		try {
			if (FacultyPartTimeToRemove) {
				await this.FacultyPartTimeRepository.remove(FacultyPartTimeToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}
}
