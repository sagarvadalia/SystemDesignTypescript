import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Researcher } from '../../entity/Users/Researcher';
import { validate, validateOrReject } from 'class-validator';
import { Student } from '../../entity/Users/Student';
import { Class } from '../../entity/ClassRelated/Class';
import { Users } from '../../entity/Users/Users';
import { Faculty } from '../../entity/Users/Faculty';

export class ResearcherController {
	private researcherRepository = getRepository(Researcher);
	private studentRepository = getRepository(Student);
	private classRepository = getRepository(Class);
	private userRepository = getRepository(Users);
	private facultyRepository = getRepository(Faculty);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.researcherRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.researcherRepository.findOne(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const researcher = new Researcher(request.body);
		const errors = await validate(researcher);
		console.log(errors);
		return this.researcherRepository.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const researcherToRemove: Researcher | undefined = await this.researcherRepository.findOne(request.params.id);
		try {
			if (researcherToRemove) {
				await this.researcherRepository.remove(researcherToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}


	// view total num of students
	async numOfStudents(request: Request, response: Response, next: NextFunction) {
		let totalStudents = this.userRepository.find({ where: { userType: "Student" } });
		let numStudents = 0;

		try {
			for (let i = 0; i < (await totalStudents).length; i++) {
				numStudents++
			}
			return { done: true, msg: "Total students at Gupta University: " + numStudents };
		} catch (error) {
			console.error(error);
		}
	}

	// view total num of faculty
	async numOfFaculty(request: Request, response: Response, next: NextFunction) {
		let totalFaculty = this.userRepository.find({ where: { userType: "Faculty" } });
		let numFac = 0;
		try {
			for (let i = 0; i < (await totalFaculty).length; i++) {
				numFac++
			}
			return { done: true, msg: "Total faculty at Gupta University: " + numFac };
		} catch (error) {
			console.error(error);
		}
	}

	// view total num of classes
	async numOfClasses(request: Request, response: Response, next: NextFunction) {
		let totalClasses = await this.classRepository.find();
		let numofClasses = 0;
		try {
			for (let i = 0; i < totalClasses.length; i++) {
				numofClasses++
			}
			return { done: true, msg: "Total number of classes offered by Gupta University: " + numofClasses };
		} catch (error) {
			console.error(error);
		}
	}

	// view how many students in specific class
	async numStudInClass(request: Request, response: Response, next: NextFunction) {
		let classToFind = await this.classRepository.findOne(request.params.classCRN);

		if (classToFind) {
			let totalSeats = classToFind.totalSeats;
			let openSeats = classToFind.openSeats;

			let numOfStudents = (totalSeats - openSeats);
			return { done: true, msg: "Total number of students taking " + classToFind.courseID.courseName + " is: " + numOfStudents };
		}
		return { done: false, msg: "Invalid classCRN" };
	}

	// view total of grad students
	async totalGrad(request: Request, response: Response, next: NextFunction) {
		let grads = await this.studentRepository.find({ where: { studentType: "graduate" } });
		let totalGrads = 0;

		for (let i = 0; i < (await grads).length; i++) {
			totalGrads++
		}
		return { done: true, msg: "Total number of Graduate Students at Gupta University: " + totalGrads };

	}

	// view total of undergrad
	async totalUnGrad(request: Request, response: Response, next: NextFunction) {
		let unGrads = await this.studentRepository.find({ where: { studentType: "undergraduate" } });
		let totalGrads = 0;

		for (let i = 0; i < (await unGrads).length; i++) {
			totalGrads++
		}
		return { done: true, msg: "Total number of Undergraduate Students at Gupta University: " + totalGrads };
	}

	// view total of fullTime faculty
	async totalFullTimeFac(request: Request, response: Response, next: NextFunction) {
		let faculty = await this.facultyRepository.find({ where: { isFullTime: true } });
		let totalFac = 0;

		for (let i = 0; i < (await faculty).length; i++) {
			totalFac++
		}
		return { done: true, msg: "Total number of FullTime Faculty at Gupta University: " + totalFac };
	}

	// view total of partTime faculty
	async totalPartTimeFac(request: Request, response: Response, next: NextFunction) {
		let faculty = await this.facultyRepository.find({ where: { isFullTime: false } });
		let totalFac = 0;

		for (let i = 0; i < (await faculty).length; i++) {
			totalFac++
		}
		return { done: true, msg: "Total number of PartTime Faculty at Gupta University: " + totalFac };
	}
	async showAllData(request: Request, response: Response, next: NextFunction) {
		let studentCnt: any = await this.numOfStudents(request, response, next);
		let facCnt: any = await this.numOfFaculty(request, response, next);
		let classCnt: any = await this.numOfClasses(request, response, next);

		let totalGrad: any = await this.totalGrad(request, response, next);
		let totalUnGrad: any = await this.totalUnGrad(request, response, next);
		let totalFullTimeFac: any = await this.totalFullTimeFac(request, response, next);
		let totalPartTimeFac: any = await this.totalPartTimeFac(request, response, next);

		studentCnt = studentCnt.msg
		facCnt = facCnt.msg
		classCnt = classCnt.msg

		totalGrad = totalGrad.msg
		totalUnGrad = totalUnGrad.msg
		totalFullTimeFac = totalFullTimeFac.msg
		totalPartTimeFac = totalPartTimeFac.msg


		return [{ studentCnt, facCnt, classCnt, totalGrad, totalUnGrad, totalFullTimeFac, totalPartTimeFac }]


	}
}
