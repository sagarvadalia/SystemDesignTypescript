import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { StudentMinor } from '../../entity/JoinTables/StudentMinor';
import { validate, validateOrReject } from 'class-validator';
import { Student } from '../../entity/Users/Student';

export class StudentMinorController {
	private studentMinorRepository = getRepository(StudentMinor);
	private studentRepository = getRepository(Student);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.studentMinorRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.studentMinorRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const studentMinor = new StudentMinor(request.body);
		const errors = await validate(studentMinor);
		console.log(errors);
		if (!errors) {
			return this.studentMinorRepository.save(request.body);
		}
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const studentMinorToRemove: StudentMinor | undefined = await this.studentMinorRepository.findOne(
			request.params.id,
		);
		try {
			if (studentMinorToRemove) {
				await this.studentMinorRepository.remove(studentMinorToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}
}
