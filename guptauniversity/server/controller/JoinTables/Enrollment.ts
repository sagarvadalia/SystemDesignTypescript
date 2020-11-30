import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Enrollment } from '../../entity/JoinTables/Enrollment';
import { validate, validateOrReject } from 'class-validator';

export class EnrollmentController {
    private enrollmentRepository = getRepository(Enrollment);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.enrollmentRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.enrollmentRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const enrollment = new Enrollment(request.body);
        const errors = await validate(enrollment);
        console.log(errors);
        if (!errors) {
            return this.enrollmentRepository.save(request.body);
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const enrollmentToRemove: Enrollment | undefined = await this.enrollmentRepository.findOne(request.params.id);
        try {
            if (enrollmentToRemove) {
                await this.enrollmentRepository.remove(enrollmentToRemove);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async studentHistory(request: Request, response: Response, next: NextFunction) {
        return this.enrollmentRepository.find({ where: { sID: request.params.id } });
    }
}
