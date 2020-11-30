import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { UnderGraduateFullTime } from '../../entity/Users/UnderGraduateFullTime';

export class UnderGraduateFullTimeController {
	private UnderGraduateFullTimeRepository = getRepository(UnderGraduateFullTime);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.UnderGraduateFullTimeRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.UnderGraduateFullTimeRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const underGraduateFullTime = new UnderGraduateFullTime(request.body);
		const errors = await validate(underGraduateFullTime);
		console.log(errors);
		return this.UnderGraduateFullTimeRepository.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const UnderGraduateFullTimeToRemove:
			| UnderGraduateFullTime
			| undefined = await this.UnderGraduateFullTimeRepository.findOne(request.params.id);
		try {
			if (UnderGraduateFullTimeToRemove) {
				await this.UnderGraduateFullTimeRepository.remove(UnderGraduateFullTimeToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}
}
