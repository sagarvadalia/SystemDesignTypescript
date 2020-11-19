import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Course } from '../../entity/ClassRelated/Course';

export class CourseController {
	private courseRepository = getRepository(Course);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.courseRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.courseRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const course = new Course(request.body);
		const errors = await validate(course);
		console.log(errors);
		return this.courseRepository.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const courseToRemove: Course | undefined = await this.courseRepository.findOne(request.params.id);
		try {
			if (courseToRemove) {
				await this.courseRepository.remove(courseToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}
}
