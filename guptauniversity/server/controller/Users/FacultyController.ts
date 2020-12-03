import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Faculty } from '../../entity/Users/Faculty';
import { validate, validateOrReject } from 'class-validator';
import { Class } from '../../entity/ClassRelated/Class';
import { Enrollment } from '../../entity/JoinTables/Enrollment';

export class FacultyController {
	private facultyRepository = getRepository(Faculty);
	private classRepository = getRepository(Class);
	private enrollmentRepository = getRepository(Enrollment);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.facultyRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.facultyRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const faculty = new Faculty(request.body);
		const errors = await validate(faculty);
		console.log(errors);
		if (!errors) {
			return this.facultyRepository.save(request.body);
		}
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const facultyToRemove: Faculty | undefined = await this.facultyRepository.findOne(request.params.id);
		try {
			if (facultyToRemove) {
				await this.facultyRepository.remove(facultyToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}

	async viewClasses(request: Request, response: Response, next: NextFunction) {
		try {
			return await this.classRepository.find({ where: { fID: request.params.id } });
		} catch (error) {
			console.error(error);
		}
	}
	async viewClassesBySemester(request: Request, response: Response, next: NextFunction) {
		try {

			return await this.classRepository.find({ where: { fID: request.params.id, semesterID: request.params.semesterID } });
		} catch (error) {
			console.error(error);
		}
	}
	async viewEnrollments(request: Request, response: Response, next: NextFunction) {
		//Gimme a classCRN and I'll show you the world

		try {
			return await this.enrollmentRepository.find({ where: { classCRN: request.params.classCRN } });
		} catch (error) {
			console.error(error);
		}
	}
}
