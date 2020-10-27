import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { UnderGraduate } from '../../entity/Users/UnderGraduate';
import { validate, validateOrReject } from 'class-validator';

export class UnderGraduateController {
	private UnderGraduateRepository = getRepository(UnderGraduate);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.UnderGraduateRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.UnderGraduateRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const underGraduate = new UnderGraduate(request.body);
		const errors = await validate(UnderGraduate);
		console.log(errors);
		if (!errors) {
			return this.UnderGraduateRepository.save(request.body);
		}
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const UnderGraduateToRemove: UnderGraduate | undefined = await this.UnderGraduateRepository.findOne(
			request.params.id,
		);
		try {
			if (UnderGraduateToRemove) {
				await this.UnderGraduateRepository.remove(UnderGraduateToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}
}
