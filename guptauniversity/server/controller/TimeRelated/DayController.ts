import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Day } from '../../entity/TimeRelated/Day';
import { validate, validateOrReject } from 'class-validator';

export class DayController {
	private dayRepository = getRepository(Day);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.dayRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.dayRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const day = new Day(request.body);
		const errors = await validate(day);
		console.log(errors);
		return this.dayRepository.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const dayToRemove: Day | undefined = await this.dayRepository.findOne(request.params.id);
		try {
			if (dayToRemove) {
				await this.dayRepository.remove(dayToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}
}
