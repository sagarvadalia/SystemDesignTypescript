import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Lab } from '../entity/Lab';

export class LabController {
	private LabRepository = getRepository(Lab);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.LabRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.LabRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const lab = new Lab(request.body);
		const errors = await validate(lab);
		console.log(errors);
		return this.LabRepository.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const LabToRemove: Lab | undefined = await this.LabRepository.findOne(request.params.id);
		try {
			if (LabToRemove) {
				await this.LabRepository.remove(LabToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}
}
