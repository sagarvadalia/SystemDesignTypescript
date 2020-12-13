import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Users } from '../../entity/Users/Users';
import { UnderGraduatePartTime } from '../../entity/Users/UnderGraduatePartTime';
import { UnderGraduateFullTime } from '../../entity/Users/UnderGraduateFullTime';
import { GraduatePartTime } from '../../entity/Users/GraduatePartTime';
import { GraduateFullTime } from '../../entity/Users/GraduateFullTime';
import { FacultyPartTime } from '../../entity/Users/FacultyPartTime';
import { FacultyFullTime } from '../../entity/Users/FacultyFullTime';
import { Administrator } from '../../entity/Users/Administrator';
import { Researcher } from '../../entity/Users/Researcher';
import { Student } from '../../entity/Users/Student';
import { Enrollment } from '../../entity/JoinTables/Enrollment';
import { Class } from '../../entity/ClassRelated/Class';
import { Faculty } from '../../entity/Users/Faculty';
import { UnderGraduate } from '../../entity/Users/UnderGraduate';
import { Graduate } from '../../entity/Users/Graduate';
import { Advisor } from '../../entity/JoinTables/Advisor';

export class UserController {
	private userRepository = getRepository(Users);
	private undergraduatePartTime = getRepository(UnderGraduatePartTime)
	private undergraduateFullTime = getRepository(UnderGraduateFullTime)
	private graduatePartTime = getRepository(GraduatePartTime)
	private graduateFullTime = getRepository(GraduateFullTime)
	private facultyPartTime = getRepository(FacultyPartTime)
	private facultyFullTime = getRepository(FacultyFullTime)
	private administrator = getRepository(Administrator)
	private researcherRepository = getRepository(Researcher)
	private studentRepository = getRepository(Student);
	private enrollmentRepository = getRepository(Enrollment);
	private classRepository = getRepository(Class);
	private facultyRepository = getRepository(Faculty);
	private undergraduateRepository = getRepository(UnderGraduate);
	private graduateRepository = getRepository(Graduate);
	private advisorRepository = getRepository(Advisor);

	async login(request: Request, response: Response, next: NextFunction) {
		let email = request.query.email

		let password = request.query.password
		console.log(email, password);
		try {
			if (typeof email === 'string' && typeof password === 'string') {
				email = email.toLowerCase();
				let user = await this.userRepository.findOne({ where: { userEmail: email } })

				if ((await user?.comparePassword(password, 0)).isMatch) {
					console.log("Password Verified")

					//Students
					if (user?.userType === 'Student') {
						let stuUGPT = await this.undergraduatePartTime.findOne({ where: { userEmail: email } })
						let stuUGFT = await this.undergraduateFullTime.findOne({ where: { userEmail: email } })
						let stuGPT = await this.graduatePartTime.findOne({ where: { userEmail: email } })
						let stuGFT = await this.graduateFullTime.findOne({ where: { userEmail: email } })

						if (stuUGPT)
							return stuUGPT
						if (stuUGFT)
							return stuUGFT
						if (stuGPT)
							return stuGPT
						if (stuGFT)
							return stuGFT

					}

					// Faculty
					if (user?.userType === 'Faculty') {
						let facPT = await this.facultyPartTime.findOne({ where: { userEmail: email } })
						let facFT = await this.facultyFullTime.findOne({ where: { userEmail: email } })

						if (facPT)
							return facPT
						if (facFT)
							return facFT
					}

					//Admin
					if (user?.userType === 'Administrator') {
						let admin = await this.administrator.findOne({ where: { userEmail: email } })
						return admin
					}

					//Researcher
					if (user?.userType === 'Researcher') {
						let research = await this.researcherRepository.findOne({ where: { userEmail: email } })
						return research
					}

				}
				else {
					console.log("Password is incorrect")
					return null
				}


			}
		} catch (error) {
			console.error(error)
		}
	}


	async all(request: Request, response: Response, next: NextFunction) {
		return this.userRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.userRepository.findOne(request.params.id);
	}

	// async save(request: Request, response: Response, next: NextFunction) {
	//     const user = new User(request.body);
	//     const errors = await validate(user)
	//     console.log(errors);
	//     return this.userRepository.save(request.body);
	// }

	async remove(request: Request, response: Response, next: NextFunction) {
		const userToRemove: Users | undefined = await this.userRepository.findOne(request.params.id);
		try {
			if (userToRemove) {
				await this.userRepository.remove(userToRemove);
			}
		} catch (error) {
			console.error(error);
		}
	}

	async removeUser(request: Request, response: Response, next: NextFunction){
	const userToRemove: Users | undefined = await this.userRepository.findOne(request.params.id);
	// Give me an userID and I will remove the user Completely
	let user = await this.userRepository.findOne(request.params.userID);

	// finds users of type student
	if (user) {
		if (user.userType == "Student") {
			let student = await this.studentRepository.findOne(request.params.sID);
			// finds undergraduate students
			if (student) {
				if (student.studentType == "undergraduate") {
					let undergraduate = await this.undergraduateRepository.findOne(request.params.sID);
					
					// finds undergrad partTime
					if(undergraduate){
					if (undergraduate.isFullTime == false) {
						let ugPT = await this.undergraduatePartTime.findOne(undergraduate);
						if(ugPT){
						let enrollmentToRemove = await this.enrollmentRepository.find({ where: { sID: ugPT } });
						let advisorToRemove = await this.advisorRepository.findOne(request.params.sID);

						if(advisorToRemove){
							await this.advisorRepository.delete(advisorToRemove);
						}

						if(enrollmentToRemove){
							for (let i = 0; i < enrollmentToRemove.length; i++) {

								await this.enrollmentRepository.delete(enrollmentToRemove[i]);
							
							}
						}
						await this.undergraduatePartTime.delete(ugPT);
					}
					await this.undergraduateRepository.delete(undergraduate);
				}
				await this.studentRepository.delete(student);
				



					//finds undergrad fullTime
					if (undergraduate.isFullTime == true) {
						let ugFT = await this.undergraduateFullTime.findOne(undergraduate);
						if(ugFT){
							let enrollmentToRemove = await this.enrollmentRepository.find({ where: { sID: ugFT } });
							let advisorToRemove = await this.advisorRepository.findOne(request.params.sID);

							if(advisorToRemove){
								await this.advisorRepository.delete(advisorToRemove);
							}
							
							if(enrollmentToRemove){
				
								for (let i = 0; i < enrollmentToRemove.length; i++) {

									await this.enrollmentRepository.delete(enrollmentToRemove[i]);
								}
							}
							await this.undergraduateFullTime.delete(ugFT)
						}
						await this.undergraduateRepository.delete(undergraduate);
					}
					await this.studentRepository.delete(student);
				}
			}



				// finds grad students
				if(student){
				if (student.studentType == "graduate") {
					let graduate = await this.graduateRepository.findOne(request.params.sID);
					
					// finds grad parTime
					if(graduate){	
						if (graduate.isFullTime == false) {
							let gPT = await this.graduatePartTime.findOne(graduate);
							if(gPT){
							let enrollmentToRemove = await this.enrollmentRepository.find({ where: { sID: gPT } });
							let advisorToRemove = await this.advisorRepository.findOne(request.params.sID);

							if(advisorToRemove){
								await this.advisorRepository.delete(advisorToRemove);
							}

							for (let i = 0; i < enrollmentToRemove.length; i++){
								await this.enrollmentRepository.delete(enrollmentToRemove[i]);
							}
							await this.graduatePartTime.delete(gPT);
						}
						await this.graduateRepository.delete(graduate);
					}
					await this.studentRepository.delete(student);


						// finds grad fullTime
						if (graduate.isFullTime == true) {
							let gFT = await this.graduateFullTime.findOne(graduate);
							if(gFT){
								let enrollmentToRemove = await this.enrollmentRepository.find({ where: { sID: gFT} });
								let advisorToRemove = await this.advisorRepository.findOne(request.params.sID);

								if(advisorToRemove){
									await this.advisorRepository.delete(advisorToRemove);
								}

								for (let i = 0; i < enrollmentToRemove.length; i++) {
									await this.enrollmentRepository.delete(enrollmentToRemove[i]);
								}
								await this.graduateFullTime.delete(gFT);
							}
							await this.graduateRepository.delete(graduate);
						}
					await this.studentRepository.delete(student);
				}
			}
		}
			
	}
	await this.userRepository.delete(user);
	return {done: true, msg: "Student User has been removed"};
}


		// finds users of type faculty
		if( user.userType == "Faculty"){
			let faculty = await this.facultyRepository.findOne(request.params.fID);
			if(faculty){
				if(faculty.isFullTime == false){
					let facPT = await this.facultyPartTime.findOne(faculty);
					if(facPT){
						let classToRemove = await this.classRepository.find({where: {fID: facPT}});
						let advisorToRemove = await this.advisorRepository.find({where: {fID: facPT}});

						if(advisorToRemove){
							for(let i = 0; i <advisorToRemove.length; i++){
								await this.advisorRepository.delete(advisorToRemove[i]);
							}
						}

						for(let i = 0; i < classToRemove.length; i++){
							await this.classRepository.delete(classToRemove[i]);
						}
						await this.facultyPartTime.delete(facPT);
					}
				}

				await this.facultyRepository.delete(faculty);

				if(faculty.isFullTime == true){
					let facFT = await this.facultyFullTime.findOne(faculty);
					if(facFT){
						let classToRemove = await this.classRepository.find({where: { fID: facFT}});
						let advisorToRemove = await this.advisorRepository.find({where: {fID: facFT}});
						
						if(advisorToRemove){
							for(let i = 0; i < advisorToRemove.length; i++){
								await this.advisorRepository.delete(advisorToRemove[i]);
							}
						}

						for(let i = 0; i < classToRemove.length; i++){
							await this.classRepository.delete(classToRemove[i]);
						}
						await this.facultyFullTime.delete(facFT);
					}
				}
				await this.facultyRepository.delete(faculty);
			}
			await this.userRepository.delete(user);
			return {done: true, msg: "Faculty User has been removed"};
		}

		// find users of type admin
		if (user.userType == "Administrator") {
			let admin = await this.administrator.findOne(request.params.userID);
			if (admin) {
				// delete the admin from the adminRepository
				await this.administrator.delete(admin);
			}
			// deletes user after all children are deleted
			await this.userRepository.delete(user);
			return {done: true, msg: "Administrator User has been removed"};

		}


		// finds users of typer researcher
		if (user.userType == "Researcher") {
			let researcher = await this.researcherRepository.findOne(request.params.userID);
			if (researcher) {
				// delete the researcher from researchRepository
				await this.researcherRepository.delete(researcher)
			}
			// deletes user after all children are deleted
			await this.userRepository.delete(user);
			return{done: true, msg: "Researcher User has been removed"};

		}
		return { done: false, msg: "No user with that ID" };
	}
}
	

}
