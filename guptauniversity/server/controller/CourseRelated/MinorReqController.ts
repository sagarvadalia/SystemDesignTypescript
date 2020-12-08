import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { MinorRequirement } from '../../entity/ClassRelated/MinorRequirement';
import { validate, validateOrReject } from 'class-validator';
import { Minor } from '../../entity/ClassRelated/Minor';

export class MinorReqController {
    private minReqRepository = getRepository(MinorRequirement);
    private minorRepository = getRepository(Minor);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.minReqRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.minReqRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const minReq = new MinorRequirement(request.body);
        const errors = await validate(minReq);
        console.log(errors);
        return this.minReqRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const minReqToRemove: MinorRequirement | undefined = await this.minReqRepository.findOne(request.params.id);
        try {
            if (minReqToRemove) {
                await this.minReqRepository.remove(minReqToRemove);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async minReqByMin(request: Request, response: Response, next: NextFunction) {
        //Give me a majorID and I'll return array of their majReqs
        let minor = await this.minorRepository.findOne(request.params.majorID)

        if (minor) {
            let reqs = await this.minReqRepository.find({ where: { minorID: minor } });
            let minorReqs: any = [];

            for (let i = 0; i < reqs.length; i++) {
                minorReqs[i] = reqs[i];
            }

            return minorReqs;
        }
        return "Minor not found with id " + request.params.minorID
    }
}
