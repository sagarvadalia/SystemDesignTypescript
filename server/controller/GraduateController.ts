import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Graduate } from '../entity/Graduate';
import { validate, validateOrReject } from 'class-validator';

export class GraduateController {
	private GraduateRepository = getRepository(Graduate);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.GraduateRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.GraduateRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const graduate = new Graduate(request.body);
		const errors = await validate(Graduate);
		console.log(errors);
		if (!errors) {
			return this.GraduateRepository.save(request.body);
		}
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const GraduateToRemove: Graduate | undefined = await this.GraduateRepository.findOne(request.params.id);
		try {
			if (GraduateToRemove) {
				await this.GraduateRepository.remove(GraduateToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}
}
