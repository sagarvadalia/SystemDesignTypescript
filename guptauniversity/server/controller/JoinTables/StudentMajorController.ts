import { AdvancedConsoleLogger, getManager, getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { StudentMajor } from '../../entity/JoinTables/StudentMajor';
import { validate, validateOrReject } from 'class-validator';
import { Student } from '../../entity/Users/Student';
import { Major } from '../../entity/ClassRelated/Major';

export class StudentMajorController {
    private studentMajorRepository = getRepository(StudentMajor);
    private studentRepository = getRepository(Student);
    private majorRepository = getRepository(Major);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.studentMajorRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.studentMajorRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const studentMajor = new StudentMajor(request.body);
        const errors = await validate(StudentMajor);
        console.log(errors);
        if (!errors) {
            return this.studentMajorRepository.save(request.body);
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const studentMajorToRemove: StudentMajor | undefined = await this.studentMajorRepository.findOne(
            request.params.id,
        );
        try {
            if (studentMajorToRemove) {
                await this.studentMajorRepository.remove(studentMajorToRemove);
            }
        } catch (error) {
            console.error(error);
        }
    }
    async findAllMajors(request: Request, response: Response, next: NextFunction) {
        console.log('herehrehre');
        const student = await this.studentRepository.findOne(request.params.sID);

       try {
           let currentMajors = await this.studentMajorRepository.find({ where: { sID: student } });
           console.log(currentMajors);
           return currentMajors
       } catch (error) {
           console.error(error);
       }
    }

    async declareMajor(request: Request, response: Response, next: NextFunction) {
        //Give me sID and majorID. I'll return false if they already have 2 majors and true if successful
        const student = await this.studentRepository.findOne(request.params.sID);
        const major = await this.majorRepository.findOne(request.params.majorID);

        try {
            let currentMajors = await this.studentMajorRepository.find({ where: { sID: student } });

            if (currentMajors.length > 1) {
                return false;
            }

            if (student && major) {
                const entityManager = getManager();
                let stuMaj = await entityManager.create(StudentMajor, { sID: student, majorID: major, dateDeclared: new Date() });
                // console.log(stuMaj);
                await this.studentMajorRepository.save(stuMaj);

                return true;
            }
        } catch (error) {
            console.error(error);
        }
    }

    async dropMajor(request: Request, response: Response, next: NextFunction) {
        //Give me sID and majorID
        const student = await this.studentRepository.findOne(request.params.sID);
        const major = await this.majorRepository.findOne(request.params.majorID);

        try {
            let currentMajor = await this.studentMajorRepository.find({ where: { sID: student, majorID: major } });
            this.studentMajorRepository.remove(currentMajor);
            return {done: true}
        } catch (error) {
            console.error(error);
            return {done: false, message: error}
        }
    }
}
