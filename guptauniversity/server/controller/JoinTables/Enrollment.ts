import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Enrollment } from '../../entity/JoinTables/Enrollment';
import { validate, validateOrReject } from 'class-validator';
import { Class } from '../../entity/ClassRelated/Class';
import { Course } from '../../entity/ClassRelated/Course';


export class EnrollmentController {
    private enrollmentRepository = getRepository(Enrollment);
	private classRepository = getRepository(Class);
	private courseRepository = getRepository(Course);

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
		try {


			let enrollment:any = await this.enrollmentRepository.find({ where: { sID: request.params.id } });

			for (let i = 0; i < enrollment.length; i++){
				let classCRN = await this.classRepository.findOne(enrollment[i].classCRN);
				if (classCRN) {
					enrollment[i].classNumber = classCRN.classCRN
					enrollment[i].semester = classCRN.semesterID;
					let course = await this.courseRepository.findOne(classCRN.courseID)
					enrollment[i].courseName = course
				}

			}
			return enrollment;

		} catch (error) {
			console.error(error);
		}

    }

    async changeGrade(request: Request, response: Response, next: NextFunction) {
        //Request needs to have grade, sID, classCRN
        try {
            let thisEnroll = await this.enrollmentRepository.findOne(Enrollment, { where: { classID: request.query.classCRN, sID: request.query.sID } })

            if (thisEnroll && typeof request.query.grade === 'string') {
                thisEnroll.grade = request.query.grade
                await this.enrollmentRepository.save(thisEnroll)
            }

            return thisEnroll
        } catch (error) {
            console.error(error)
        }
    }

}
