import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { Faculty } from "../entity/faculty";
import {validate, validateOrReject} from 'class-validator'

export class FacultyController {

    private facultyRepository = getRepository(Faculty);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.facultyRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.facultyRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const faculty = new Faculty(request.body);
        const errors = await validate(faculty)
        console.log(errors);
        return this.facultyRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let facultyToRemove: Faculty | undefined = await this.facultyRepository.findOne(request.params.id);
        try {
            if (facultyToRemove) {
                await this.facultyRepository.remove(facultyToRemove);
            }

        } catch (error) {
            console.error(error);
        }

    }

}
