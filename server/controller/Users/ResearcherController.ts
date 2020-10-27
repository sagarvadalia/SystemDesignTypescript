import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Researcher } from '../../entity/Users/Researcher';
import { validate, validateOrReject } from 'class-validator';

export class ResearcherController {
	private researcherRepository = getRepository(Researcher);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.researcherRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.researcherRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const researcher = new Researcher(request.body);
		const errors = await validate(researcher);
		console.log(errors);
		return this.researcherRepository.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const researcherToRemove: Researcher | undefined = await this.researcherRepository.findOne(request.params.id);
		try {
			if (researcherToRemove) {
				await this.researcherRepository.remove(researcherToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}
}
