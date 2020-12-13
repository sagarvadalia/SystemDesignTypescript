
import { Grading } from '../../entity/ClassRelated/Grading';
import { getManager, getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';

export class GradingController {
	private gradeRepository = getRepository(Grading);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.gradeRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.gradeRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const grading = new Grading(request.body);
		const errors = await validate(grading);
		console.log(errors);
		if (!errors) {
			return this.gradeRepository.save(request.body);
		}
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const gradingToRemove: Grading| undefined = await this.gradeRepository.findOne(request.params.id);
		try {
			if (gradingToRemove) {
				await this.gradeRepository.remove(gradingToRemove);
			}
		} catch (error) {
			console.error(error);
		}
    }

    async canAddCourse(request: Request, response: Response, next: NextFunction) {
		let grading =  await this.gradeRepository.findOne(1);
		try {
			if(grading){
                grading.canAddCourse = !grading.canAddCourse;
            }
		} catch (error) {
			console.error(error);
		}
	}
	
	async canDropCourse(request: Request, response: Response, next: NextFunction) {
		let grading = await this.gradeRepository.findOne(1);
		try{
			if(grading){
				grading.canDropCourse = !grading.canDropCourse;
			}
		}catch(error){
			console.log(error);
		}

	}

    async canAddMidtermGrade(request: Request, response: Response, next: NextFunction) {
		let grading =  await this.gradeRepository.findOne(1);
		try {
			if(grading){
                grading.canAddMidtermGrade = !grading.canAddMidtermGrade;
            }
		} catch (error) {
			console.error(error);
		}
    }
    async canAddFinalGrade(request: Request, response: Response, next: NextFunction) {
		let grading =  await this.gradeRepository.findOne(1);
		try {
			if(grading){
                grading.canAddFinalGrade = !grading.canAddFinalGrade;
            }
		} catch (error) {
			console.error(error);
		}
	}
	
	// viewing the data
	async viewFinalGrade(request: Request, response: Response, next: NextFunction) {
		let grading =  await this.gradeRepository.findOne(1);
		try {
			if(grading){
                return grading.canAddFinalGrade;
            }
		} catch (error) {
			console.error(error);
		}
	}
	
	async viewMidtermGrade(request: Request, response: Response, next: NextFunction) {
		let grading =  await this.gradeRepository.findOne(1);
		try {
			if(grading){
                return grading.canAddMidtermGrade;
            }
		} catch (error) {
			console.error(error);
		}
	}
	
	async viewDropCourse(request: Request, response: Response, next: NextFunction) {
		let grading =  await this.gradeRepository.findOne(1);
		try {
			if(grading){
                return grading.canDropCourse;
            }
		} catch (error) {
			console.error(error);
		}
	}
	
	async viewAddCourse(request: Request, response: Response, next: NextFunction) {
		let grading =  await this.gradeRepository.findOne(1);
		try {
			if(grading){
                return grading.canAddCourse;
            }
		} catch (error) {
			console.error(error);
		}
	}

}