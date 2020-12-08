import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { StudentMinor } from '../../entity/JoinTables/StudentMinor';
import { validate, validateOrReject } from 'class-validator';
import { Minor } from '../../entity/ClassRelated/Minor';

export class StudentMinorController {
	private StudentMinorRepository = getRepository(StudentMinor);
	private minorRepository = getRepository(Minor);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.StudentMinorRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.StudentMinorRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const studentMinor = new StudentMinor(request.body);
		const errors = await validate(studentMinor);
		console.log(errors);
		if (!errors) {
			return this.StudentMinorRepository.save(request.body);
		}
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const studentMinorToRemove: StudentMinor | undefined = await this.StudentMinorRepository.findOne(
			request.params.id,
		);
		try {
			if (studentMinorToRemove) {
				await this.StudentMinorRepository.remove(studentMinorToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}
	// async viewMinor(request: Request, response: Response, next: NextFunction){
    //     try{
	// 		let studentMinor = await this.StudentMinorRepository.find( { where: { sID: request.params.id } } );
	// 		let minor: Minor[] = [];
	// 		if(studentMinor){
	// 			for(let i = 0; i < studentMinor.length; i++){
	// 				let minorOne = await this.minorRepository.findOne({where: {minorID: studentMinor[i].minorID.minorID}});
	// 				console.log(minor);
	// 				if(minorOne){
	// 					minor.push(minorOne);
	// 				}
	// 			}
	// 			return minor;
	// 		}
    //     }catch(error){
    //         console.error(error);
    //     }
    // }
}
