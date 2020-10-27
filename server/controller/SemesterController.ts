import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Semester } from '../TimeRelated/Semester';

export class SemesterController {
	private semesterRepository = getRepository(Semester);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.semesterRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.semesterRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const semester = new Semester(request.body);
		const errors = await validate(semester);
		console.log(errors);
		return this.semesterRepository.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const semesterToRemove: Semester | undefined = await this.semesterRepository.findOne(request.params.id);
		try {
			if (semesterToRemove) {
				await this.semesterRepository.remove(semesterToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}
}
