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
import { StudentMinor } from '../../entity/JoinTables/StudentMinor';
import { StudentMajor } from '../../entity/JoinTables/StudentMajor';
import { FacultyDepartment } from '../../entity/JoinTables/FacultyDepartment';
import { StudentHold } from '../../entity/JoinTables/StudentHold';
import { Department } from '../../entity/Locations/Department';
import { Course } from '../../entity/ClassRelated/Course';

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
	private studentMinorRepository = getRepository(StudentMinor);
	private studentMajorRepository = getRepository(StudentMajor);
	private facultyDeptRepo = getRepository(FacultyDepartment);
	private studentHoldRepo = getRepository(StudentHold);
	private departmentRepository = getRepository(Department);
	private courseRepository = getRepository(Course);

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


	async removeUser(request: Request, response: Response, next: NextFunction) {
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
						if (undergraduate) {
							if (undergraduate.isFullTime == false) {
								let ugPT = await this.undergraduatePartTime.findOne(request.params.sID);
								if (ugPT) {
									let enrollmentToRemove = await this.enrollmentRepository.find({ where: { sID: ugPT } });
									let advisorToRemove = await this.advisorRepository.find({ where: { sID: student } });
									let studentMinorToRemove = await this.studentMinorRepository.find({ where: { sID: student } });
									let studentMajorToRemove = await this.studentMajorRepository.find({ where: { sID: student } });
									let studetHoldToRemove = await this.studentHoldRepo.findOne({ where: { sID: student } });

									if (studetHoldToRemove) {
										await this.studentHoldRepo.delete(studetHoldToRemove);
									}

									if (studentMinorToRemove) {
										for (let i = 0; i < studentMinorToRemove.length; i++) {
											await this.studentMinorRepository.delete(studentMinorToRemove[i]);
										}
									}

									if (studentMajorToRemove) {
										for (let i = 0; i < studentMajorToRemove.length; i++) {
											await this.studentMajorRepository.delete(studentMajorToRemove[i]);
										}
									}

									if (advisorToRemove) {
										for (let i = 0; i < advisorToRemove.length; i++) {
											await this.advisorRepository.delete(advisorToRemove[i]);
										}
									}

									if (enrollmentToRemove) {
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
								let ugFT = await this.undergraduateFullTime.findOne(request.params.sID);
								if (ugFT) {
									let enrollmentToRemove = await this.enrollmentRepository.find({ where: { sID: ugFT } });
									let advisorToRemove = await this.advisorRepository.find({ where: { sID: student } });
									let studentMinorToRemove = await this.studentMinorRepository.find({ where: { sID: student } });
									let StudentMajorToRemove = await this.studentMajorRepository.find({ where: { sID: student } });
									let StudentHoldToRemove = await this.studentHoldRepo.findOne({ where: { sID: student } });

									if (StudentHoldToRemove) {
										await this.studentHoldRepo.delete(StudentHoldToRemove);
									}

									if (studentMinorToRemove) {
										for (let i = 0; i < studentMinorToRemove.length; i++) {
											await this.studentMinorRepository.delete(studentMinorToRemove[i]);
										}
									}

									if (StudentMajorToRemove) {
										for (let i = 0; i < StudentMajorToRemove.length; i++) {
											await this.studentMajorRepository.delete(StudentMajorToRemove[i]);
										}
									}

									if (advisorToRemove) {
										for (let i = 0; i < advisorToRemove.length; i++) {
											await this.advisorRepository.delete(advisorToRemove[i]);
										}
									}

									if (enrollmentToRemove) {

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
					if (student) {
						if (student.studentType == "graduate") {
							let graduate = await this.graduateRepository.findOne(request.params.sID);

							// finds grad parTime
							if (graduate) {
								if (graduate.isFullTime == false) {
									let gPT = await this.graduatePartTime.findOne(request.params.sID);
									if (gPT) {
										let enrollmentToRemove = await this.enrollmentRepository.find({ where: { sID: gPT } });
										let advisorToRemove = await this.advisorRepository.findOne({ where: { sID: student } });
										let studentMinorToRemove = await this.studentMinorRepository.find({ where: { sID: student } });
										let studentMajorToRemove = await this.studentMajorRepository.find({ where: { sID: student } });
										let studentHoldToRemove = await this.studentHoldRepo.findOne({ where: { sID: student } });

										if (studentHoldToRemove) {
											await this.studentHoldRepo.delete(studentHoldToRemove);
										}

										if (studentMinorToRemove) {
											for (let i = 0; i < studentMinorToRemove.length; i++) {
												await this.studentMinorRepository.delete(studentMinorToRemove[i]);
											}
										}

										if (studentMajorToRemove) {
											for (let i = 0; i < studentMajorToRemove.length; i++) {
												await this.studentMajorRepository.delete(studentMajorToRemove[i]);
											}
										}

										if (advisorToRemove) {
											await this.advisorRepository.delete(advisorToRemove);
										}

										for (let i = 0; i < enrollmentToRemove.length; i++) {
											await this.enrollmentRepository.delete(enrollmentToRemove[i]);
										}
										await this.graduatePartTime.delete(gPT);
									}
									await this.graduateRepository.delete(graduate);
								}


								// finds grad fullTime
								if (graduate.isFullTime == true) {
									let gFT = await this.graduateFullTime.findOne(request.params.sID);
									console.log('------------------', gFT)
									if (gFT) {
										console.log('never here');
										let enrollmentToRemove = await this.enrollmentRepository.find({ where: { sID: gFT } });
										let advisorToRemove = await this.advisorRepository.findOne({ where: { sID: student } });
										let studentMinorToRemove = await this.studentMinorRepository.find({ where: { sID: student } });
										let studentMajorToRemove = await this.studentMajorRepository.find({ where: { sID: student } });
										let studentHoldToRemove = await this.studentHoldRepo.findOne({ where: { sID: student } });

										if (studentHoldToRemove) {
											await this.studentHoldRepo.delete(studentHoldToRemove);
										}

										if (studentMinorToRemove) {
											for (let i = 0; i < studentMinorToRemove.length; i++) {
												await this.studentMinorRepository.delete(studentMinorToRemove[i]);
											}
										}

										if (studentMajorToRemove) {
											for (let i = 0; i < studentMajorToRemove.length; i++) {
												await this.studentMajorRepository.delete(studentMajorToRemove[i]);
											}
										}
										// console.log(advisorToRemove);
										if (advisorToRemove) {
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
				return { done: true, msg: "Student User has been removed" };
			}

			async updateInfo(request: Request, response: Response, next: NextFunction) {
				//Gimme userID, userName, userEmail, userPhone and I'll update it
				let user = await this.userRepository.findOne(request.params.userID);
				if (user) {
					if (user.userType == "Student") {
						//Student
						let student = await this.studentRepository.findOne(request.params.userID);
						if (student) {
							if (student.studentType == "undergraduate") {
								//Undergraduate student
								let ugStu = await this.undergraduateRepository.findOne(request.params.userID);
								if (ugStu) {
									if (ugStu.isFullTime) {
										//Undergrad Full Time
										let ugFTStu = await this.undergraduateFullTime.findOne(request.params.userID);
										if (ugFTStu) {
											//Have to update 3 fields in 3 spots
											ugFTStu.userName = request.params.userName;
											ugFTStu.userPhone = request.params.userPhone;
											ugFTStu.userEmail = request.params.userEmail;
											await this.undergraduateFullTime.save(ugFTStu);

											ugStu.userName = request.params.userName;
											ugStu.userPhone = request.params.userPhone;
											ugStu.userEmail = request.params.userEmail;
											await this.undergraduateRepository.save(ugStu);

											student.userName = request.params.userName;
											student.userPhone = request.params.userPhone;
											student.userEmail = request.params.userEmail;
											await this.studentRepository.save(student);

											user.userName = request.params.userName;
											user.userPhone = request.params.userPhone;
											user.userEmail = request.params.userEmail;
											await this.userRepository.save(user);

											return { done: true, msg: request.params.userID + ": This ugFTStu has been updated" }
										}
										return { done: false, msg: "This should never happen. 111" }
									} else {
										//Undergrad Part Time
										let ugPTStu = await this.undergraduatePartTime.findOne(request.params.userID)
										if (ugPTStu) {
											//Have to update 3 fields in 3 spots
											ugPTStu.userName = request.params.userName;
											ugPTStu.userPhone = request.params.userPhone;
											ugPTStu.userEmail = request.params.userEmail;
											await this.undergraduatePartTime.save(ugPTStu);

											ugStu.userName = request.params.userName;
											ugStu.userPhone = request.params.userPhone;
											ugStu.userEmail = request.params.userEmail;
											await this.undergraduateRepository.save(ugStu);

											student.userName = request.params.userName;
											student.userPhone = request.params.userPhone;
											student.userEmail = request.params.userEmail;
											await this.studentRepository.save(student);

											user.userName = request.params.userName;
											user.userPhone = request.params.userPhone;
											user.userEmail = request.params.userEmail;
											await this.userRepository.save(user);

											return { done: true, msg: request.params.userID + ": This ugPTStu has been updated" }
										}
										return { done: false, msg: "This should never happen. 222" }
									}
								}
								return { done: false, msg: "This should never happen. 333" }
							} else {
								//Graduate Student
								let gStu = await this.graduateRepository.findOne(request.params.userID);
								if (gStu) {
									if (gStu.isFullTime) {
										//Graduate Full Time
										let gFTStu = await this.graduateFullTime.findOne(request.params.userID);
										if (gFTStu) {
											//Have to update 3 fields in 3 spots
											gFTStu.userName = request.params.userName;
											gFTStu.userPhone = request.params.userPhone;
											gFTStu.userEmail = request.params.userEmail;
											await this.graduateFullTime.save(gFTStu);

											gStu.userName = request.params.userName;
											gStu.userPhone = request.params.userPhone;
											gStu.userEmail = request.params.userEmail;
											await this.graduateRepository.save(gStu);

											student.userName = request.params.userName;
											student.userPhone = request.params.userPhone;
											student.userEmail = request.params.userEmail;
											await this.studentRepository.save(student);

											user.userName = request.params.userName;
											user.userPhone = request.params.userPhone;
											user.userEmail = request.params.userEmail;
											await this.userRepository.save(user);

											return { done: true, msg: request.params.userID + ": This gFTStu has been updated" }
										}
										return { done: false, msg: "This should never happen. 444" }
									} else {
										//Graduate Part Time
										let gPTStu = await this.graduatePartTime.findOne(request.params.userID)
										if (gPTStu) {
											//Have to update 3 fields in 3 spots
											gPTStu.userName = request.params.userName;
											gPTStu.userPhone = request.params.userPhone;
											gPTStu.userEmail = request.params.userEmail;
											await this.graduatePartTime.save(gPTStu);

											gStu.userName = request.params.userName;
											gStu.userPhone = request.params.userPhone;
											gStu.userEmail = request.params.userEmail;
											await this.graduateRepository.save(gStu);

											student.userName = request.params.userName;
											student.userPhone = request.params.userPhone;
											student.userEmail = request.params.userEmail;
											await this.studentRepository.save(student);

											user.userName = request.params.userName;
											user.userPhone = request.params.userPhone;
											user.userEmail = request.params.userEmail;
											await this.userRepository.save(user);

											return { done: true, msg: request.params.userID + ": This gPTStu has been updated" }
										}
										return { done: false, msg: "This should never happen. 555" }
									}
								}
								return { done: false, msg: "This should never happen. 666" }
							}
						}
						return { done: false, msg: "This should never happen. 777" }
					} else if (user.userType == "Faculty") {
						//Faculty
						let fac = await this.facultyRepository.findOne(request.params.userID)
						if (fac) {
							if (fac.isFullTime) {
								//Full Time Faculty
								let ftFac = await this.facultyFullTime.findOne(request.params.userID)
								if (ftFac) {
									ftFac.userName = request.params.userName;
									ftFac.userPhone = request.params.userPhone;
									ftFac.userEmail = request.params.userEmail;
									await this.facultyFullTime.save(ftFac);

									fac.userName = request.params.userName;
									fac.userPhone = request.params.userPhone;
									fac.userEmail = request.params.userEmail;
									await this.facultyRepository.save(fac);

									user.userName = request.params.userName;
									user.userPhone = request.params.userPhone;
									user.userEmail = request.params.userEmail;
									await this.userRepository.save(user);

									return { done: true, msg: request.params.userID + ": This ftFac has been updated" }
								}
								return { done: false, msg: "This should never happen. 888" }
							} else {
								//Part Time Faculty
								let ptFac = await this.facultyPartTime.findOne(request.params.userID)
								if (ptFac) {
									ptFac.userName = request.params.userName;
									ptFac.userPhone = request.params.userPhone;
									ptFac.userEmail = request.params.userEmail;
									await this.facultyPartTime.save(ptFac);

									fac.userName = request.params.userName;
									fac.userPhone = request.params.userPhone;
									fac.userEmail = request.params.userEmail;
									await this.facultyRepository.save(fac);

									user.userName = request.params.userName;
									user.userPhone = request.params.userPhone;
									user.userEmail = request.params.userEmail;
									await this.userRepository.save(user);

									return { done: true, msg: request.params.userID + ": This ptFac has been updated" }
								}
								return { done: false, msg: "This should never happen. 999" }
							}
						}
						return { done: false, msg: "This should never happen. 101010" }
					} else if (user.userType == "Administrator") {
						//Administrator
						let admin = await this.administrator.findOne(request.params.userID)
						if (admin) {
							admin.userName = request.params.userName;
							admin.userPhone = request.params.userPhone;
							admin.userEmail = request.params.userEmail;
							await this.administrator.save(admin);

							user.userName = request.params.userName;
							user.userPhone = request.params.userPhone;
							user.userEmail = request.params.userEmail;
							await this.userRepository.save(user);

							return { done: true, msg: request.params.userID + ": This admin has been updated" }
						}
						return { done: false, msg: "This should never happen. 111111" }
					} else if (user.userType == "Researcher") {
						let research = await this.researcherRepository.findOne(request.params.userID)
						if (research) {
							research.userName = request.params.userName;
							research.userPhone = request.params.userPhone;
							research.userEmail = request.params.userEmail;
							await this.researcherRepository.save(research);

							user.userName = request.params.userName;
							user.userPhone = request.params.userPhone;
							user.userEmail = request.params.userEmail;
							await this.userRepository.save(user);

							return { done: true, msg: request.params.userID + ": This admin has been updated" }
						}
						return { done: false, msg: "This should never happen. 121212" }
					}
					return { done: false, msg: "This should never happen. 131313" } //Probs mispelled a userType == "wHaTeVeR"
				}
				return { done: false, msg: request.params.userID + ": No user with that ID was found" }
			}

			// // finds users of type faculty
			// if( user.userType == "Faculty"){
			// 	let faculty = await this.facultyRepository.findOne(request.params.fID);
			// 	if(faculty){
			// 		if(faculty.isFullTime == false){
			// 			let facPT = await this.facultyPartTime.findOne(request.params.fID);
			// 			if(facPT){
			// 				let classToRemove = await this.classRepository.find({where: {fID: faculty}});
			// 				let advisorToRemove = await this.advisorRepository.find({where: {fID: faculty}});
			// 				let facultyDep = await this.facultyDeptRepo.find({where: { fID: faculty}});
			// 				// let deptToRemove = await this.departmentRepository.find({where: {deptHeadID: faculty}});
			// 				// let courseToRemove = await this.courseRepository.find({where: {deptID: deptToRemove}});

			// 				// if(courseToRemove){
			// 				// 	for(let i = 0; i < courseToRemove.length; i++){
			// 				// 		await this.courseRepository.delete(courseToRemove[i]);
			// 				// 	}
			// 				// }

			// 				if(facultyDep){
			// 					for(let i = 0; i < facultyDep.length; i++){
			// 						await this.facultyDeptRepo.delete(facultyDep[i]);
			// 					}
			// 				}

			// 				// if(deptToRemove){
			// 				// 	for(let i = 0; i < deptToRemove.length; i++){
			// 				// 		await this.departmentRepository.delete(deptToRemove[i]);
			// 				// 	}
			// 				// }

			// 				if(advisorToRemove){
			// 					for(let i = 0; i <advisorToRemove.length; i++){
			// 						await this.advisorRepository.delete(advisorToRemove[i]);
			// 					}
			// 				}

			// 				for(let i = 0; i < classToRemove.length; i++){
			// 					await this.classRepository.delete(classToRemove[i]);
			// 				}
			// 				await this.facultyPartTime.delete(facPT);
			// 			}
			// 		}

			// await this.facultyRepository.delete(faculty);

			// 		if(faculty.isFullTime == true){
			// 			let facFT = await this.facultyFullTime.findOne(request.params.fID);
			// 			if(facFT){
			// 				let classToRemove = await this.classRepository.find({where: { fID: faculty}});
			// 				let advisorToRemove = await this.advisorRepository.find({where: {fID: faculty}});
			// 				let facultyDep = await this.facultyDeptRepo.find({where: {fID: faculty}});
			// 				// let deptToRemove = await this.departmentRepository.find({where: {deptHeadID: faculty}});
			// 				// let courseToRemove = await this.courseRepository.find({where: {deptID: deptToRemove}});

			// 				// if(courseToRemove){
			// 				// 	for(let i = 0; i < courseToRemove.length; i++){
			// 				// 		await this.courseRepository.delete(courseToRemove[i]);
			// 				// 	}
			// 				// }

			// 				if(facultyDep){
			// 					for(let i = 0; i < facultyDep.length; i++){
			// 						await this.facultyDeptRepo.delete(facultyDep[i]);
			// 					}
			// 				}

			// 				// if(deptToRemove){
			// 				// 	for(let i = 0; i < deptToRemove.length; i++){
			// 				// 		await this.departmentRepository.delete(deptToRemove[i]);
			// 				// 	}
			// 				// }

			// 				if(advisorToRemove){
			// 					for(let i = 0; i < advisorToRemove.length; i++){
			// 						await this.advisorRepository.delete(advisorToRemove[i]);
			// 					}
			// 				}

			// 				for(let i = 0; i < classToRemove.length; i++){
			// 					await this.classRepository.delete(classToRemove[i]);
			// 				}
			// 				await this.facultyFullTime.delete(facFT);
			// 			}
			// 		}
			// 		await this.facultyRepository.delete(faculty);
			// 	}
			// 	await this.userRepository.delete(user);
			// 	return {done: true, msg: "Faculty User has been removed"};
			// }

			// find users of type admin
			if (user.userType == "Administrator") {
				let admin = await this.administrator.findOne(request.params.userID);
				if (admin) {
					// delete the admin from the adminRepository
					await this.administrator.delete(admin);
				}
				// deletes user after all children are deleted
				await this.userRepository.delete(user);
				return { done: true, msg: "Administrator User has been removed" };

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
				return { done: true, msg: "Researcher User has been removed" };

			}
			return { done: false, msg: "No user with that ID" };
		}
	}

}
