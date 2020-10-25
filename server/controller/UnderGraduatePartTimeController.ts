import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { UnderGraduatePartTime } from '../entity/UnderGraduatePartTime';

export class UnderGraduatePartTimeController {
	private UnderGraduatePartTimeRepository = getRepository(UnderGraduatePartTime);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.UnderGraduatePartTimeRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.UnderGraduatePartTimeRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const underGraduatePartTime = new UnderGraduatePartTime(request.body);
		const errors = await validate(underGraduatePartTime);
		console.log(errors);
		return this.UnderGraduatePartTimeRepository.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const UnderGraduatePartTimeToRemove: UnderGraduatePartTime | undefined = await this.UnderGraduatePartTimeRepository.findOne(request.params.id);
		try {
			if (UnderGraduatePartTimeToRemove) {
				await this.UnderGraduatePartTimeRepository.remove(UnderGraduatePartTimeToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}
}