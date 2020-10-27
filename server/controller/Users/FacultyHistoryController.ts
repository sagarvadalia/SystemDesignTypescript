import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { FacultyHistory } from '../../entity/JoinTables/FacultyHistory';
import { validate, validateOrReject } from 'class-validator';

export class FacultyHistoryController {
	private facultyHistoryRepository = getRepository(FacultyHistory);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.facultyHistoryRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.facultyHistoryRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const facultyHistory = new FacultyHistory(request.body);
		const errors = await validate(facultyHistory);
		console.log(errors);
		if (!errors) {
			return this.facultyHistoryRepository.save(request.body);
		}
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const facultyHistoryToRemove: FacultyHistory | undefined = await this.facultyHistoryRepository.findOne(
			request.params.id,
		);
		try {
			if (facultyHistoryToRemove) {
				await this.facultyHistoryRepository.remove(facultyHistoryToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}
}
