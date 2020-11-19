import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { Catalog } from '../entity/Catalog';
import { getRepository } from 'typeorm';

export class CatalogController {
	private catalogRepository = getRepository(Catalog);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.catalogRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.catalogRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const catalog = new Catalog(request.body);
		const errors = await validate(catalog);
		console.log(errors);
		return this.catalogRepository.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const catalogToRemove: Catalog | undefined = await this.catalogRepository.findOne(request.params.id);
		try {
			if (catalogToRemove) {
				await this.catalogRepository.remove(catalogToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}
}
