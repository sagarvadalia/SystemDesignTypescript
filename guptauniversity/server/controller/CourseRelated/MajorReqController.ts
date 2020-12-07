import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { MajorRequirement } from '../../entity/ClassRelated/MajorRequirement';
import { validate, validateOrReject } from 'class-validator';
import { Major } from '../../entity/ClassRelated/Major';

export class MajorReqController {
    private majReqRepository = getRepository(MajorRequirement);
    private majorRepository = getRepository(Major);

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
}
