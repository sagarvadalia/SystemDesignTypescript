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

	async myAdvisors(request: Request, response: Response, next: NextFunction) {
		//Give me an sID and I'll return an array of their advisors
		try {
			return await this.advisorRepository.find({ where: { sID: request.params.id } });
		} catch (error) {
			console.error(error);
		}
	}
	async facultyAdvisees(request: Request, response: Response, next: NextFunction) {
		//Give me an fID and I'll return an array of their advisees
		try {
			return await this.advisorRepository.find({ where: { fID: request.params.id } });
		} catch (error) {
			console.error(error);
		}
	}

}
