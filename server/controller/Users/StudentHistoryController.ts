import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { StudentHistory } from '../../entity/StudentHistory';
import { validate, validateOrReject } from 'class-validator';

export class StudentHistoryController {
	private StudentHistoryRepository = getRepository(StudentHistory);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.StudentHistoryRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.StudentHistoryRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const studentHistory = new StudentHistory(request.body);
		const errors = await validate(studentHistory);
		console.log(errors);
		if (!errors) {
			return this.StudentHistoryRepository.save(request.body);
		}
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const studentHistoryToRemove: StudentHistory | undefined = await this.StudentHistoryRepository.findOne(
			request.params.id,
		);
		try {
			if (studentHistoryToRemove) {
				await this.StudentHistoryRepository.remove(studentHistoryToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}
}
