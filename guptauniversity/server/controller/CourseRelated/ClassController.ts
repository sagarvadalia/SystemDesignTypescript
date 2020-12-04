import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Class } from '../../entity/ClassRelated/Class';
import { validate, validateOrReject } from 'class-validator';
import { TimeSlot } from '../../entity/TimeRelated/TimeSlot';

export class ClassController {
	private classRepository = getRepository(Class);
	private timeslotRepository = getRepository(TimeSlot);

	async inSemester(request: Request, response: Response, next: NextFunction) {
		try {
			return await this.classRepository.find({ where: { semesterID: request.params.id } });

		} catch (error) {
			console.error(error);
		}
	}

	async all(request: Request, response: Response, next: NextFunction) {
		return this.classRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.classRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const errors = await validate(new Class(request.body));
		console.log(errors);
		return this.classRepository.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const classToRemove: Class | undefined = await this.classRepository.findOne(request.params.id);
		try {
			if (classToRemove) {
				await this.classRepository.remove(classToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}

	async changeTime(request: Request, response: Response, next: NextFunction) {
		//Give me a classCRN and a new timeID
		let oldClass = await this.classRepository.findOne(request.params.classCRN);
		let newSlot = await this.timeslotRepository.findOne(request.params.slotID);
		console.log(oldClass);

		try {
			if (newSlot && oldClass) {
				oldClass.slotID = newSlot;
				console.log(oldClass);
				this.classRepository.save(oldClass);
			}
		} catch (error) {
			console.error(error);
		}
	}
}
