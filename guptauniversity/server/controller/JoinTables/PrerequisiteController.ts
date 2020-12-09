import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Prerequisite } from '../../entity/ClassRelated/Prerequisite';
import { validate, validateOrReject } from 'class-validator';
import { Enrollment } from '../../entity/JoinTables/Enrollment';
import { getManager } from "typeorm";

export class PrerequisiteController {
	private prerequisiteRepository = getRepository(Prerequisite);


	async all(request: Request, response: Response, next: NextFunction) {
		return this.prerequisiteRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.prerequisiteRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const prerequisite = new Prerequisite(request.body);
		const errors = await validate(prerequisite);
		console.log(errors);
		if (!errors) {
			return this.prerequisiteRepository.save(request.body);
		}
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const prerequisiteToRemove: Prerequisite | undefined = await this.prerequisiteRepository.findOne(request.params.id);
		try {
			if (prerequisiteToRemove) {
				await this.prerequisiteRepository.remove(prerequisiteToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}


}
