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

export class UserController {
	private userRepository = getRepository(Users);
	private undergraduatePartTime = getRepository(UnderGraduatePartTime)
	private undergraduateFullTime = getRepository(UnderGraduateFullTime)
	private graduatePartTime = getRepository(GraduatePartTime)
	private graduateFullTime = getRepository(GraduateFullTime)
	private facultyPartTime = getRepository(FacultyPartTime)
	private facultyFullTime = getRepository(FacultyFullTime)
	private administrator = getRepository(Administrator)
	private researcher = getRepository(Researcher)

	async login(request: Request, response: Response, next: NextFunction) {
		let email = request.query.email
		let password = request.query.password

		try {
			if (email && typeof password === 'string') {
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
						let research = await this.researcher.findOne({ where: { userEmail: email } })
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
}
