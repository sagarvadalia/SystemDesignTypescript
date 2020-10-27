import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { TimeSlot } from '../../TimeRelated/TimeSlot';
import { validate, validateOrReject } from 'class-validator';

export class TimeSlotController {
	private timeSlotRepository = getRepository(TimeSlot);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.timeSlotRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.timeSlotRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const timeSlot = new TimeSlot(request.body);
		const errors = await validate(timeSlot);
		console.log(errors);
		if (!errors) {
			return this.timeSlotRepository.save(request.body);
		}
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const timeSlotToRemove: TimeSlot | undefined = await this.timeSlotRepository.findOne(request.params.id);
		try {
			if (timeSlotToRemove) {
				await this.timeSlotRepository.remove(timeSlotToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}
}
