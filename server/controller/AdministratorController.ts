import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Administrator } from '../entity/Administrator';
import { validate, validateOrReject } from 'class-validator';

export class AdministratorController {
	private administratorRepository = getRepository(Administrator);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.administratorRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.administratorRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const administrator = new Administrator(request.body);
		const errors = await validate(administrator);
		console.log(errors);
		return this.administratorRepository.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const administratorToRemove: Administrator | undefined = await this.administratorRepository.findOne(
			request.params.id,
		);
		try {
			if (administratorToRemove) {
				await this.administratorRepository.remove(administratorToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}
}
