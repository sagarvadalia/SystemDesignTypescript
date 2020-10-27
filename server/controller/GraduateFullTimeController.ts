import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { GraduateFullTime } from '../entity/Users/GraduateFullTime';

export class GraduateFullTimeController {
	private GraduateFullTimeRepository = getRepository(GraduateFullTime);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.GraduateFullTimeRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.GraduateFullTimeRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const graduateFullTime = new GraduateFullTime(request.body);
		const errors = await validate(GraduateFullTime);
		console.log(errors);
		return this.GraduateFullTimeRepository.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const GraduateTimeToRemove: GraduateFullTime | undefined = await this.GraduateFullTimeRepository.findOne(
			request.params.id,
		);
		try {
			if (GraduateTimeToRemove) {
				await this.GraduateFullTimeRepository.remove(GraduateTimeToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}
}
