import { Entity, getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Class } from '../../entity/ClassRelated/Class';
import { validate, validateOrReject } from 'class-validator';
import { TimeSlot } from '../../entity/TimeRelated/TimeSlot';
import { Faculty } from '../../entity/Users/Faculty';
import { Lecture } from '../../entity/Locations/Lecture';
import { Enrollment } from '../../entity/JoinTables/Enrollment';
import { Room } from '../../entity/Locations/Room';
import { Course } from '../../entity/ClassRelated/Course';
import { Semester } from '../../entity/TimeRelated/Semester';
const nodemailer = require('nodemailer');


export class ClassController {
	private classRepository = getRepository(Class);
	private timeslotRepository = getRepository(TimeSlot);
	private facRepository = getRepository(Faculty);
	private lectureRepository = getRepository(Lecture);
	private enrollmentRepository = getRepository(Enrollment);
	private roomRepository = getRepository(Room);
	private courseRepository = getRepository(Course);
	private semesterRepitory = getRepository(Semester);

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

	async removeClass(request: Request, response: Response, next: NextFunction) {
		// Give a classCRN and I will delete the enrollments, and the class
		try {
			let classToRemove = await this.classRepository.findOne(request.params.classCRN);
			let enrollment = await this.enrollmentRepository.find({ where: { classCRN: classToRemove } });
			console.log(enrollment);
			console.log('------------------------------------------------------------')
			console.log(classToRemove);
			console.log(request.params.classCRN);

			if (classToRemove) {
				// let facEmail = classToRemove.fID.userEmail;
				// let studentEmail = "";
				if (enrollment === []) {
					let bool = await this.classRepository.delete(classToRemove);
					console.log('--------------------------AA---------------------------------')
					console.log(bool);
					return {done:  true, msg: "Class without enrollments has been removed "};
				}
				 else {
					for (let i = 0; i < enrollment.length; i++) {
						console.log('heerrrere')
						if (enrollment[i]) {
							console.log('--------here')
							await this.enrollmentRepository.delete(enrollment[i]);
						}
					}


						let bool = await this.classRepository.delete(classToRemove);
						console.log('-------------------------A----------------------------------')
						console.log(bool);

				}

				
			
					let bool = await this.classRepository.delete(classToRemove);
					return { done: true, msg: "Class Removed " }
				}
				else { 
					return { done: false, msg: "No class found with this paramater" } 
				}
			
			
		} catch (error) {
			console.error(error);
			return { done: false, msg: error } 
		}

	}

	async changeTime(request: Request, response: Response, next: NextFunction) {
		//Give me a classCRN and a new slotID
		let oldClass = await this.classRepository.findOne(request.params.classCRN);
		let newSlot = await this.timeslotRepository.findOne(request.params.slotID);
		

		// ensure the teacher isnt busy at the new time
		let slotFull = await this.classRepository.findOne({where: {slotID: newSlot, fID: oldClass?.fID, semesterID: oldClass?.semesterID}});
		if(slotFull){
				return{done: false, msg: " This teacher is busy during the new time provided"};
			}
		// checks if the room at the new time is being used
		let roomFull = await this.classRepository.findOne({where: {slotID: newSlot, roomID: oldClass?.roomID, semesterID: oldClass?.semesterID}});
		if(roomFull){
			return{done: false, msg: "Room is already occupied at that time"};
		}
		
		console.log(oldClass);

		try {
		

			if (newSlot && oldClass) {
				let facEmail = oldClass.fID.userEmail;
				let studentEmail = "";
				let enrollment = await this.enrollmentRepository.find({ where: { classCRN: oldClass } });
				for (let i = 0; i < enrollment.length; i++) {
					let stuEmail = enrollment[i].sID.userEmail;
					studentEmail += `${stuEmail},`;
				}
				oldClass.slotID = newSlot;
				console.log(oldClass);
				this.classRepository.save(oldClass);


				// // nodemailer
				// let testAccount = await nodemailer.createTestAccount();

				// let transporter = nodemailer.createTransport({
				// 	host: "smtp.ethereal.email",
				// 	port: 587,
				// 	secure: false, // true for 465, false for other ports
				// 	auth: {
				// 		user: testAccount.user, // generated ethereal user
				// 		pass: testAccount.pass, // generated ethereal password
				// 	},
				// });
				// if (studentEmail !== "") {
				// 		let info = await transporter.sendMail({
				// 	from: '"Administration " <Administration@guptaUniversity.edu>', // sender address
				// 	to: studentEmail, // list of receivers
				// 	subject: "Class Time Changed", // Subject line
				// 	text: "Dear student, " + "\n" + " This is an automated message to alert you that one of your currently enrolled courses, "+ oldClass.courseID.courseName +  ", has changed timeslots. It is now on these days, " + oldClass.slotID.days + ", And it will now start at: " + oldClass.slotID.periodID.startTime + " and end at: " + oldClass.slotID.periodID.endTime, // plain text body
				// 	// html: "<b>Hello world?</b>", // html body
				// });

				// console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
				// }

				// nodemailer
				// let testAccount = await nodemailer.createTestAccount();

				// let transporter = nodemailer.createTransport({
				// 	host: "smtp.ethereal.email",
				// 	port: 587,
				// 	secure: false, // true for 465, false for other ports
				// 	auth: {
				// 		user: testAccount.user, // generated ethereal user
				// 		pass: testAccount.pass, // generated ethereal password
				// 	},
				// });
				// if (studentEmail !== "") {
				// 	let info = await transporter.sendMail({
				// 		from: '"Administration " <Administration@guptaUniversity.edu>', // sender address
				// 		to: studentEmail, // list of receivers
				// 		subject: "Class Time Changed", // Subject line
				// 		text: "Dear student, " + "\n" + " This is an automated message to alert you that one of your currently enrolled courses, " + oldClass.courseID.courseName + ", has changed timeslots. It is now on these days, " + oldClass.slotID.days + ", And it will now start at: " + oldClass.slotID.periodID.startTime + " and end at: " + oldClass.slotID.periodID.endTime, // plain text body
				// 		// html: "<b>Hello world?</b>", // html body
				// 	});

				// 	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
				// }



				return { done: true, msg: 'changed time' };
			}
			else {
				return { done: false, msg: 'timeslot could not be updated' }
			}
		} catch (error) {
			console.error(error);
		}
		return false;
	}

	async changeTeacher(request: Request, response: Response, next: NextFunction) {
		//Give me a classCRN and new fID. I DO NOT check deptIDs
		let thisClass = await this.classRepository.findOne(request.params.classCRN);
		let newTeacher = await this.facRepository.findOne(request.params.fID);
		let slotFull = await this.classRepository.findOne({where: {slotID: thisClass?.slotID, fID: newTeacher?.userID, semesterID: thisClass?.semesterID}})
		
		if(slotFull){
			return{done: false, msg: newTeacher?.userName + " Is already teaching a class from " + thisClass?.slotID.periodID.startTime + thisClass?.slotID.periodID.endTime};

		}

		if (newTeacher) {
			if (thisClass) {
				let facEmail = thisClass.fID.userEmail;
				let studentEmail = "";
				let enrollment = await this.enrollmentRepository.find({ where: { classCRN: thisClass } });
				for (let i = 0; i < enrollment.length; i++) {
					let stuEmail = enrollment[i].sID.userEmail;
					studentEmail = `${stuEmail}`;
				}
				thisClass.fID = newTeacher;
				this.classRepository.save(thisClass);


				// // nodemailer
				// let testAccount = await nodemailer.createTestAccount();

				// let transporter = await nodemailer.createTransport({
				// 	host: 'smtp.ethereal.email',
				// 	port: 587,
				// 	secure: false,
				// 	auth: {
				// 		user: testAccount.user,
				// 		pass: testAccount.pass,
				// 	},

				// });
				// if (studentEmail !== '') {
				// 	let info = await transporter.sendMail({
				// 	from: '"Administration" <Administration@guptaUniversity.edu',
				// 	to: studentEmail,
				// 	subject: "New Teacher",
				// 	text: "Dear student, " + "\n" + "This is an automated message to alert you that one of your currently enrolled coureses, " + thisClass.courseID.courseName + " is now being taught by professor, " + newTeacher.userName,
				// 	//html: not used
				// 	});
				// 	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
				// }

				// nodemailer
				// let testAccount = await nodemailer.createTestAccount();

				// let transporter = await nodemailer.createTransport({
				// 	host: 'smtp.ethereal.email',
				// 	port: 587,
				// 	secure: false,
				// 	auth: {
				// 		user: testAccount.user,
				// 		pass: testAccount.pass,
				// 	},

				// });
				// if (studentEmail !== '') {
				// 	let info = await transporter.sendMail({
				// 		from: '"Administration" <Administration@guptaUniversity.edu',
				// 		to: studentEmail,
				// 		subject: "New Teacher",
				// 		text: "Dear student, " + "\n" + "This is an automated message to alert you that one of your currently enrolled coureses, " + thisClass.courseID.courseName + " is now being taught by professor, " + newTeacher.userName,
				// 		//html: not used
				// 	});
				// 	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
				// }






				return { done: true, msg: "Teacher of " + thisClass.classCRN + ' has been successfully changed to ' + newTeacher.userID }
			}
			return { done: false, msg: "Class with CRN " + request.params.classCRN + ' not found' }
		}
		return { done: false, msg: "No teacher found with id " + request.params.fID }
	}

	async changeRoom(request: Request, response: Response, next: NextFunction) {
		//Give me a classCRN and new roomID. I DO NOT check for conflicts
		let thisClass = await this.classRepository.findOne(request.params.classCRN);
		let newRoom = await this.lectureRepository.findOne(request.params.roomID);
		let roomFull = await this.classRepository.findOne({where: {slotID: thisClass?.slotID, roomID: newRoom, semesterID: thisClass?.semesterID}});

		
		if(roomFull){
			return{done: false, msg: "Room is already occupied at that time"};
		}
		

		if (newRoom) {
			if (thisClass) {
				let facEmail = thisClass.fID.userEmail;
				let studentEmail = "";
				let enrollment = await this.enrollmentRepository.find({ where: { classCRN: thisClass } });
				for (let i = 0; i < enrollment.length; i++) {
					let stuEmail = enrollment[i].sID.userEmail;
					studentEmail = `${stuEmail}`;
				}
				thisClass.roomID = newRoom;
				this.classRepository.save(thisClass);


				// // nodemailer
				// let testAccount = await nodemailer.createTestAccount();

				//   let transporter = await nodemailer.createTransport({
                //     host: 'smtp.ethereal.email',
                //     port: 587,
                //     secure: false,
                //     auth:{
                //         user: testAccount.user,
                //         pass: testAccount.pass,
                //     },

				// });
				// if (studentEmail !== "") {
				// 	let info = await transporter.sendMail({
                //     from: '"Administration" <Administration@guptaUniversity.edu',
                //     to: studentEmail,
                //     subject: "Room Change",
                //     text: "Dear student, " + "\n" + "This is an automated message to alert you that one of your currently enrolled coureses, " + thisClass.courseID.courseName + " is now being taught in Room, " + newRoom.roomType + newRoom.roomNum,
                //     //html: not used
				// 	});
				// 	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
				// }

				// // nodemailer
				// let testAccount = await nodemailer.createTestAccount();

				// let transporter = await nodemailer.createTransport({
				// 	host: 'smtp.ethereal.email',
				// 	port: 587,
				// 	secure: false,
				// 	auth: {
				// 		user: testAccount.user,
				// 		pass: testAccount.pass,
				// 	},

				// });
				// if (studentEmail !== "") {
				// 	let info = await transporter.sendMail({
				// 		from: '"Administration" <Administration@guptaUniversity.edu',
				// 		to: studentEmail,
				// 		subject: "Room Change",
				// 		text: "Dear student, " + "\n" + "This is an automated message to alert you that one of your currently enrolled coureses, " + thisClass.courseID.courseName + " is now being taught in Room, " + newRoom.roomType + newRoom.roomNum,
				// 		//html: not used
				// 	});
				// 	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
				// }



				return { done: true, msg: "Room of " + thisClass.classCRN + ' has been successfully changed to ' + newRoom.roomID }
			}
			return { done: false, msg: "Class with CRN " + request.params.classCRN + ' not found' }
		}
		return { done: false, msg: "No room found with id " + request.params.newRoom }
	}

	async changeTotalSeats(request: Request, response: Response, next: NextFunction) {
		// Give me a classCRN and new Number of seats
		let thisClass = await this.classRepository.findOne(request.params.classCRN);
		if (thisClass) {
			thisClass.totalSeats = parseInt(request.params.numSeats);
			await this.classRepository.save(thisClass);
			return { done: true, msg: 'class saved' }
		}
		return { done: false, msg: "Invalid classCRN entered" };

	}
	async changeOpenSeats(request: Request, response: Response, next: NextFunction) {
		// Give me a classCRN and new Number of seats
		let thisClass = await this.classRepository.findOne(request.params.classCRN);
		if (thisClass) {
			thisClass.openSeats = parseInt(request.params.numSeats);
			await this.classRepository.save(thisClass);
			return { done: true, msg: 'saved' }
		}
		return { done: false, msg: "Invalid classCRN entered" };
	}

	async changeClassSection(request: Request, response: Response, next: NextFunction) {
		// Give me a classCRN and new Number of seats
		let thisClass = await this.classRepository.findOne(request.params.classCRN);
		if (thisClass) {
			let str = "";
			if (parseInt(request.params.section) == 1) {
				str = "001";
			}
			else if (parseInt(request.params.section) == 2) {
				str = "002";
			}
			else if (parseInt(request.params.section) == 3) {
				str = "003";
			}
			else {
				return { done: false, msg: "Invalid class section entered." };
			}
			thisClass.classSection = str;
			await this.classRepository.save(thisClass);
			return { done: true, msg: "Class section has been updated." };
		}
		return { done: false, msg: "Invalid classCRN entered." };
	}


	async addClassToMasterSchedule(request: Request, response: Response, next: NextFunction) {
		// Give me a CRN, a Section, a Faculty ID, RoomID, totalSeats, and Timeslot and I will create a new class
		let classCRN = await this.classRepository.findOne(request.params.classCRN);
		let newClass: Class = new Class();
		let faculty = await this.facRepository.findOne(request.params.fID);
		let room = await this.lectureRepository.findOne(request.params.roomID);
		let timeSlot = await this.timeslotRepository.findOne(request.params.slotID);
		let course = await this.courseRepository.findOne(request.params.courseID);
		let semester = await this.semesterRepitory.findOne(request.params.semesterID);

		let slotFull = await this.classRepository.findOne({where: {slotID: timeSlot, fID: faculty, semesterID: semester}});
		let roomFull = await this.classRepository.findOne({where: {slotID: timeSlot, roomID: room, semesterID: semester}});

		if(slotFull){
			return{done: false, msg: " Teacher is busy at this time"}
		}
		if(roomFull){
			return{done: false, msg:" This room is occupied during requested time frame"};
		}

		console.log('-------------')
		console.log('we are here');
		console.log(classCRN, 'classCRN')
		console.log(newClass, 'newClass')
		console.log(faculty, 'faculty')
		console.log(room, 'room')
		console.log(timeSlot, 'timeSlot')
		console.log(course, 'course')
		console.log(semester, 'semester')
		if (classCRN) {
			return { done: false, msg: "A class with this CRN already exists." };
		}
		// creates new classCRN
		newClass.classCRN = parseInt(request.params.classCRN);

		// console.log(newClass);
		// checks if classSection exists
		let str = "";
		if (parseInt(request.params.section) == 1) {
			str = "001";
		}
		else if (parseInt(request.params.section) == 2) {
			str = "002";
		}
		else if (parseInt(request.params.section) == 3) {
			str = "003";
		}
		else {
			return { done: false, msg: "Invalid class section entered." };
		}

		// sets classSection
		newClass.classSection = str;


		// sets facID
		if (faculty) {
			newClass.fID = faculty;
		}
		else {
			return { done: false, msg: "FacultyID entered does not exist" };
		}

		//sets roomID
		if (room) {
			newClass.roomID = room;
		}
		else {
			return { done: false, msg: "RoomID entered does not exist" };
		}

		//sets num of totalSeats and openSeats
		newClass.totalSeats = (parseInt(request.params.totalSeats));
		newClass.openSeats = (parseInt(request.params.openSeats));

		// sets slotID
		if (timeSlot) {
			newClass.slotID = timeSlot;
		}
		else {
			return { done: false, msg: "TimeSlot entered does not exist" };
		}

		// sets courseID
		if (course) {
			newClass.courseID = course;
		}
		else {
			return { done: false, msg: "CourseID entered does not exist" };
		}

		// sets semesterID
		if (semester) {
			newClass.semesterID = semester;
		}
		else {
			return { done: false, msg: "SemesterID entered does not exist" };
		}

		// creates the new class in the master schedule
		await this.classRepository.save(newClass);
		console.log(newClass, 'saved new class')
		return { done: true, msg: "Class " + newClass.classCRN + " has been added to the master schedule " };
	}

}
