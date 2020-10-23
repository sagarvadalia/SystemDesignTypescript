import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Room } from '../entity/Room';

export class RoomController {
	private roomRepository = getRepository(Room);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.roomRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.roomRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const room = new Room(request.body);
		const errors = await validate(room);
		console.log(errors);
		return this.roomRepository.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const roomToRemove: Room | undefined = await this.roomRepository.findOne(request.params.id);
		try {
			if (roomToRemove) {
				await this.roomRepository.remove(roomToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}
}
