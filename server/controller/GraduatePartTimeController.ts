import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { GraduatePartTime } from '../entity/GraduatePartTime';

export class GraduatePartTimeController {
	private GraduatePartTimeRepository = getRepository(GraduatePartTime);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.GraduatePartTimeRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.GraduatePartTimeRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const graduatePartTime = new GraduatePartTime(request.body);
		const errors = await validate(GraduatePartTime);
		console.log(errors);
		return this.GraduatePartTimeRepository.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const GraduatePartTimeToRemove: GraduatePartTime | undefined = await this.GraduatePartTimeRepository.findOne(
			request.params.id,
		);
		try {
			if (GraduatePartTimeToRemove) {
				await this.GraduatePartTimeRepository.remove(GraduatePartTimeToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}
}
