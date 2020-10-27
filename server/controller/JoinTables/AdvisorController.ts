import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Advisor } from '../../entity/JoinTables/Advisor';
import { validate, validateOrReject } from 'class-validator';

export class AdvisorController {
	private advisorRepository = getRepository(Advisor);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.advisorRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.advisorRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const advisor = new Advisor(request.body);
		const errors = await validate(advisor);
		console.log(errors);
		return this.advisorRepository.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const advisorToRemove: Advisor | undefined = await this.advisorRepository.findOne(request.params.id);
		try {
			if (advisorToRemove) {
				await this.advisorRepository.remove(advisorToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}
}
