import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { MajorRequirement } from '../../entity/ClassRelated/MajorRequirement';
import { validate, validateOrReject } from 'class-validator';
import { Major } from '../../entity/ClassRelated/Major';
import { Student } from '../..//entity/Users/Student';
import { Enrollment } from '../..//entity/JoinTables/Enrollment';
import { Course } from '../../entity/ClassRelated/Course';
import { Class } from '../../entity/ClassRelated/Class';

export class MajorReqController {
    private majReqRepository = getRepository(MajorRequirement);
    private majorRepository = getRepository(Major);
    private studentRepository = getRepository(Student);
    private enrollmentRepository = getRepository(Enrollment)


    async all(request: Request, response: Response, next: NextFunction) {
        return this.majReqRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.majReqRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const majReq = new MajorRequirement(request.body);
        const errors = await validate(majReq);
        console.log(errors);
        return this.majReqRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const majReqToRemove: MajorRequirement | undefined = await this.majReqRepository.findOne(request.params.id);
        try {
            if (majReqToRemove) {
                await this.majReqRepository.remove(majReqToRemove);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async majReqByMaj(request: Request, response: Response, next: NextFunction) {
        //Give me a majorID and I'll return array of their majReqs
        let major = await this.majorRepository.findOne(request.params.majorID)

        if (major) {
            let reqs = await this.majReqRepository.find({ where: { majorID: major } });
            let majorReqs: any = [];

            for (let i = 0; i < reqs.length; i++) {
                majorReqs[i] = reqs[i];
            }

            return majorReqs;
        }
        return "Major not found with id " + request.params.majorID
    }

    async degreeEvaluate(request: Request, response: Response, next: NextFunction) {
        //Gimme an sID and majorID (cause they may have 2)
        //I always return done(boolean). When false, I also return msg(String). When true I also return complete, inProg, needed (all of type Array<Course>)
        let student = await this.studentRepository.findOne(request.params.sID)
        let major = await this.majorRepository.findOne(request.params.majorID)
        try {
            if (student) {
                if (major) {
                    let majReq = await this.majReqRepository.find({ where: { majorID: major.majorID } })
                    if (majReq) {
                        let stuEnrolls = await this.enrollmentRepository.find({ where: { sID: student } })
                        let needed: Array<Course> = []
                        if (stuEnrolls.length != 0) {
                            let complete: Array<Class> = []
                            let inProg: Array<Class> = []
                            let iter = 0
                            let pushMeBaby
                            for (let i = 0; i < majReq.length; i++) {
                                for (let j = 0; j < stuEnrolls.length; j++) {
                                    if (majReq[i].courseID.courseID === stuEnrolls[j].classCRN.courseID.courseID) {
                                        //This majReq course has an enrollment
                                        if (stuEnrolls[j].classCRN.semesterID.semesterID == 15) {
                                            //If its during this semester
                                            iter = 1
                                        }
                                        else {
                                            //Must be a past semester
                                            iter = 2
                                        }
                                        pushMeBaby = stuEnrolls[j]
                                    } else {
                                        //This majReq course does NOT have an enrollment
                                        iter = 3
                                    }
                                    if (iter === 1) {
                                        inProg.push(pushMeBaby)
                                        break
                                    } else if (iter === 2) {
                                        complete.push(pushMeBaby)
                                        break
                                    }
                                }
                                if (iter === 3) {
                                    needed.push(majReq[i].courseID)
                                }
                            }
                            return { done: true, inProg, complete, needed }
                        }
                        for (let i = 0; i < majReq.length; i++) {
                            needed.push(majReq[i].courseID)
                        }
                        return { done: true, needed: needed }
                    }
                    return { done: false, msg: "This should never happen. No majReqs found for that major" }
                }
                return { done: false, msg: request.params.majorID + ': No major found with this ID' }
            }
            return { done: false, msg: request.params.sID + ': No student found with this ID' }
        } catch (error) {
            console.error(error)
        }

    }
}
