import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Building } from '../../entity/Locations/Building';
import { validate, validateOrReject } from 'class-validator';

export class BuildingController {
	private buildingRepository = getRepository(Building);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.buildingRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.buildingRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const building = new Building(request.body);
		const errors = await validate(building);
		console.log(errors);
		return this.buildingRepository.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const buildingToRemove: Building | undefined = await this.buildingRepository.findOne(request.params.id);
		try {
			if (buildingToRemove) {
				await this.buildingRepository.remove(buildingToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}
}
