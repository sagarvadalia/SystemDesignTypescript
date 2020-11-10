import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Users } from '../../entity/Users/Users';

export class UserController {
	private userRepository = getRepository(Users);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.userRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.userRepository.findOne(request.params.id);
	}

	// async save(request: Request, response: Response, next: NextFunction) {
	//     const user = new User(request.body);
	//     const errors = await validate(user)
	//     console.log(errors);
	//     return this.userRepository.save(request.body);
	// }

	async remove(request: Request, response: Response, next: NextFunction) {
		const userToRemove: Users | undefined = await this.userRepository.findOne(request.params.id);
		try {
			if (userToRemove) {
				await this.userRepository.remove(userToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}
}
