import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { User } from "../entity/User";
import {validate, validateOrReject} from 'class-validator'

export class UserController {

    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const user = new User(request.body);
        const errors = await validate(user)
        console.log(errors);
        return this.userRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove: User | undefined = await this.userRepository.findOne(request.params.id);
        try {
            if (userToRemove) {
                await this.userRepository.remove(userToRemove);
            }

        } catch (error) {
            console.error(error);
        }

    }

}
