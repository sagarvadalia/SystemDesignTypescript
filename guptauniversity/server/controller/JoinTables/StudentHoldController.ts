import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { StudentHistory } from '../../entity/StudentRelated/StudentHistory';
import { validate, validateOrReject } from 'class-validator';
import { Hold } from '../../entity/StudentRelated/Hold';
import { StudentHold } from '../../entity/JoinTables/StudentHold';
import { Student } from '../../entity/Users/Student';
import { getManager } from "typeorm";

export class StudentHoldController {
    private holdsRepository = getRepository(Hold);
    private studentHoldRepository = getRepository(StudentHold);
    private studentRepository = getRepository(Student);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.studentHoldRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.studentHoldRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const studentHolds = new StudentHold(request.body);
        const errors = await validate(studentHolds);
        console.log(errors);
        if (!errors) {
            return this.studentHoldRepository.save(request.body);
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const StudentHoldToRemove: StudentHold | undefined = await this.studentHoldRepository.findOne(
            request.params.id,
        );
        try {
            if (StudentHoldToRemove) {
                await this.studentHoldRepository.remove(StudentHoldToRemove);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async viewHolds(request: Request, response: Response, next: NextFunction) {
        try {
            let studentHold = await this.studentHoldRepository.find({ where: { sID: request.params.id } });
            let hold: Hold[] = [];

            if (studentHold) {
                for (let i = 0; i < studentHold.length; i++) {
                    let holdOne = await this.holdsRepository.findOne({ where: { holdID: studentHold[i].holdID.holdID } });
                    console.log(holdOne);
                    if (holdOne) {
                        hold.push(holdOne);
                    }

                }
                return hold;
            }

            return [];
        } catch (error) {
            console.error(error);
        }
    }

    async addHold(request: Request, response: Response, next: NextFunction) {
        //Give me an sID and a holdID and I'll save a new StudentHold
        let student = await this.studentRepository.findOne({ where: { userID: request.params.sID } });
        let hold = await this.holdsRepository.findOne({ where: { holdID: request.params.holdID } });

        try {
            if (student && hold) {
                const entityManager = getManager();
                let newHold = await entityManager.create(StudentHold, { sID: student, holdID: hold });
                // console.log(newHold);
                await this.studentHoldRepository.save(newHold);
                return true;
            }
        } catch (error) {
            console.error(error);
        }
        return false;

    }

    async removeHold(request: Request, response: Response, next: NextFunction) {
        //Give me an sID and a holdID
        let student = await this.studentRepository.findOne({ where: { userID: request.params.sID } });
        let hold = await this.holdsRepository.findOne({ where: { holdID: request.params.holdID } });

        try {

            if (student && hold) {
                let oldHold = await this.studentHoldRepository.findOne({ where: { sID: student, holdID: hold } });
                // console.log(oldHold);
                if (oldHold) {
                    await this.studentHoldRepository.remove(oldHold)
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.error(error);
        }

    }
}
