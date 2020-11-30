import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Student } from '../../entity/Users/Student';

export class StudentController {
	private studentRepository = getRepository(Student);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.studentRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.studentRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const student = new Student(request.body);
		const errors = await validate(student);
		console.log(errors);
		return this.studentRepository.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const studentToRemove: Student | undefined = await this.studentRepository.findOne(request.params.id);
		try {
			if (studentToRemove) {
				await this.studentRepository.remove(studentToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}
}
