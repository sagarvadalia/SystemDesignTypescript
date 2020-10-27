import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Major } from '../../entity/ClassRelated/Major';
import { validate, validateOrReject } from 'class-validator';

export class MajorController {
	private majorRepository = getRepository(Major);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.majorRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.majorRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const major = new Major(request.body);
		const errors = await validate(major);
		console.log(errors);
		if (!errors) {
			return this.majorRepository.save(request.body);
		}
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const majorToRemove: Major | undefined = await this.majorRepository.findOne(request.params.id);
		try {
			if (majorToRemove) {
				await this.majorRepository.remove(majorToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}
}
