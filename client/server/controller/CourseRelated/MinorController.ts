import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Minor } from '../../entity/ClassRelated/Minor';
import { validate, validateOrReject } from 'class-validator';

export class MinorController {
	private minorRepository = getRepository(Minor);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.minorRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.minorRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const minor = new Minor(request.body);
		const errors = await validate(minor);
		console.log(errors);
		if (!errors) {
			return this.minorRepository.save(request.body);
		}
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const minorToRemove: Minor | undefined = await this.minorRepository.findOne(request.params.id);
		try {
			if (minorToRemove) {
				await this.minorRepository.remove(minorToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}
}
