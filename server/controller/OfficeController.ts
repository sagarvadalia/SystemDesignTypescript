import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Office } from '../entity/Office';

export class OfficeController {
	private officeRepository = getRepository(Office);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.officeRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.officeRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const office = new Office(request.body);
		const errors = await validate(office);
		console.log(errors);
		return this.officeRepository.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const OfficeToRemove: Office | undefined = await this.officeRepository.findOne(request.params.id);
		try {
			if (OfficeToRemove) {
				await this.officeRepository.remove(OfficeToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}
}