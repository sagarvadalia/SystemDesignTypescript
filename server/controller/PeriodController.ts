import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Period } from '../TimeRelated/Period';

export class PeriodController {
	private periodRepository = getRepository(Period);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.periodRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.periodRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const period = new Period(request.body);
		const errors = await validate(period);
		console.log(errors);
		return this.periodRepository.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const periodToRemove: Period | undefined = await this.periodRepository.findOne(request.params.id);
		try {
			if (periodToRemove) {
				await this.periodRepository.remove(periodToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}
}
