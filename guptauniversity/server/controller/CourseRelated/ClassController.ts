import { Entity, getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Class } from '../../entity/ClassRelated/Class';
import { validate, validateOrReject } from 'class-validator';
import { TimeSlot } from '../../entity/TimeRelated/TimeSlot';
import { Faculty } from '../../entity/Users/Faculty';
import { Lecture } from '../../entity/Locations/Lecture';
import { Enrollment } from '../../entity/JoinTables/Enrollment';

export class ClassController {
	private classRepository = getRepository(Class);
	private timeslotRepository = getRepository(TimeSlot);
	private facRepository = getRepository(Faculty);
	private lectureRepository = getRepository(Lecture);
	private enrollmentRepository = getRepository(Enrollment);
	async inSemester(request: Request, response: Response, next: NextFunction) {
		try {
			return await this.classRepository.find({ where: { semesterID: request.params.id } });

		} catch (error) {
			console.error(error);
		}
	}

	async all(request: Request, response: Response, next: NextFunction) {
		return this.classRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.classRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const errors = await validate(new Class(request.body));
		console.log(errors);
		return this.classRepository.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const classToRemove: Class | undefined = await this.classRepository.findOne(request.params.id);
		try {
			if (classToRemove) {
				await this.classRepository.remove(classToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}

	async removeClass(request: Request, response: Response, next: NextFunction){
        // Give a classCRN and I will delete the enrollments, and the class
try {
	let classToRemove = await this.classRepository.findOne(request.params.classCRN);
		let enrollment = await this.enrollmentRepository.find({where: {classCRN: classToRemove}});
		console.log(enrollment);
	console.log('------------------------------------------------------------')


	if (classToRemove) {
		if (enrollment === []) {
						let bool = await this.classRepository.delete(classToRemove);
					console.log('------------------------------------------------------------')
					console.log(bool);
		}
		else {for (let i = 0; i < enrollment.length; i++){
							console.log('heerrrere')
							if (enrollment[i]) {
									console.log('--------here')
                    await this.enrollmentRepository.delete(enrollment[i]);
                }
            }
					let bool = await this.classRepository.delete(classToRemove);
					console.log('------------------------------------------------------------')
					console.log(bool);

            return "No class found with this CRN" + request.params.classCRN;}

        }
} catch (error) {
	console.error(error);
}

    }

	async changeTime(request: Request, response: Response, next: NextFunction) {
		//Give me a classCRN and a new slotID
		let oldClass = await this.classRepository.findOne(request.params.classCRN);
		let newSlot = await this.timeslotRepository.findOne(request.params.slotID);
		console.log(oldClass);

		try {
			if (newSlot && oldClass) {
				oldClass.slotID = newSlot;
				console.log(oldClass);
				this.classRepository.save(oldClass);
			}
		} catch (error) {
			console.error(error);
		}
	}

	async changeTeacher(request: Request, response: Response, next: NextFunction) {
		//Give me a classCRN and new fID. I DO NOT check deptIDs
		let thisClass = await this.classRepository.findOne(request.params.classCRN);
		let newTeacher = await this.facRepository.findOne(request.params.fID);

		if (newTeacher) {
			if (thisClass) {
				thisClass.fID = newTeacher;
				this.classRepository.save(thisClass);

				return "Teacher of " + thisClass.classCRN + ' has been successfully changed to ' + newTeacher.userID;
			}
			return "Class with CRN " + request.params.classCRN + ' not found'
		}
		return "No teacher found with id " + request.params.fID
	}

	async changeRoom(request: Request, response: Response, next: NextFunction) {
		//Give me a classCRN and new roomID. I DO NOT check for conflicts
		let thisClass = await this.classRepository.findOne(request.params.classCRN);
		let newRoom = await this.lectureRepository.findOne(request.params.roomID);

		if (newRoom) {
			if (thisClass) {
				thisClass.roomID = newRoom;
				this.classRepository.save(thisClass);

				return "Room of " + thisClass.classCRN + ' has been successfully changed to ' + newRoom.roomID;
			}
			return "Class with CRN " + request.params.classCRN + ' not found'
		}
		return "No room found with id " + request.params.newRoom
	}


}
