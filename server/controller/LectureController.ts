import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import {  Lecture } from '../entity/Lecture';

export class LectureController {
	private LectureRepository = getRepository(Lecture);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.LectureRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.LectureRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const lecture = new Lecture(request.body);
		const errors = await validate(lecture);
		console.log(errors);
		return this.LectureRepository.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const LectureToRemove: Lecture | undefined = await this.LectureRepository.findOne(request.params.id);
		try {
			if (LectureToRemove) {
				await this.LectureRepository.remove(LectureToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}
}