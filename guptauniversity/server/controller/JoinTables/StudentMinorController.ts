import { AdvancedConsoleLogger, getManager, getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { StudentMinor } from '../../entity/JoinTables/StudentMinor';
import { validate, validateOrReject } from 'class-validator';
import { Student } from '../../entity/Users/Student';
import { Minor } from '../../entity/ClassRelated/Minor';

export class StudentMinorController {
	private studentMinorRepository = getRepository(StudentMinor);
	private studentRepository = getRepository(Student);
	private minorRepository = getRepository(Minor);

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

	async findAllMinors(request: Request, response: Response, next: NextFunction) {
		const student = await this.studentRepository.findOne(request.params.sID);

		try {
			let currentMinors = await this.studentMinorRepository.find({ where: { sID: student } });
			console.log(currentMinors);
			return currentMinors
		} catch (error) {
			console.error(error);
		}
	}

	async declareMinor(request: Request, response: Response, next: NextFunction) {
		//Give me sID and minorID. I'll return false if they already have 2 minor and true if successful
		const student = await this.studentRepository.findOne(request.params.sID);
		const minor = await this.minorRepository.findOne(request.params.minorID);

		try {
			let currentMinors = await this.studentMinorRepository.find({ where: { sID: student } });

			if (currentMinors.length > 1) {
				return false;
			}

			if (student && minor) {
				const entityManager = getManager();
				let stuMin = await entityManager.create(StudentMinor, { sID: student, minorID: minor, dateDeclared: new Date() });

				await this.studentMinorRepository.save(stuMin);

				return true;
			}
		} catch (error) {
			console.error(error);
		}
	}

	async dropMinor(request: Request, response: Response, next: NextFunction) {
		//Give me sID and minorID
		const student = await this.studentRepository.findOne(request.params.sID);
		const minor = await this.minorRepository.findOne(request.params.minorID);

		try {
			let currentMinor = await this.studentMinorRepository.find({ where: { sID: student, minorID: minor } });
			this.studentMinorRepository.remove(currentMinor);
			return { done: true }
		} catch (error) {
			console.error(error);
			return { done: false, message: error }
		}
	}
}
