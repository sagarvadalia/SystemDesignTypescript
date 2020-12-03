import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { StudentHistory } from '../../entity/StudentRelated/StudentHistory';
import { validate, validateOrReject } from 'class-validator';
import { Hold } from '../../entity/StudentRelated/Hold';
import { StudentHold } from '../../entity/JoinTables/StudentHold';
import { Student } from '../../entity/Users/Student';

export class StudentHoldController {
    private HoldsRepository = getRepository(Hold);
    private studentHoldRepository = getRepository(StudentHold);
    private studentRepository = getRepository(Student);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.HoldsRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.HoldsRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const studentHolds = new Hold(request.body);
        const errors = await validate(studentHolds);
        console.log(errors);
        if (!errors) {
            return this.HoldsRepository.save(request.body);
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const HoldToRemove: Hold | undefined = await this.HoldsRepository.findOne(
            request.params.id,
        );
        try {
            if (HoldToRemove) {
                await this.HoldsRepository.remove(HoldToRemove);
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
                    let holdOne = await this.HoldsRepository.findOne({ where: { holdID: studentHold[i].holdID.holdID } });
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
}
