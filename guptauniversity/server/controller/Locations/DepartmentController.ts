import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Department } from '../../entity/Locations/Department';

export class DepartmentController {
	private departmentRepository = getRepository(Department);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.departmentRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.departmentRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const department = new Department(request.body);
		const errors = await validate(department);
		console.log(errors);
		return this.departmentRepository.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const departmentToRemove: Department | undefined = await this.departmentRepository.findOne(request.params.id);
		try {
			if (departmentToRemove) {
				await this.departmentRepository.remove(departmentToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}
}
