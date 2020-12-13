import { Entity, getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Class } from '../../entity/ClassRelated/Class';
import { validate, validateOrReject } from 'class-validator';
import { TimeSlot } from '../../entity/TimeRelated/TimeSlot';
import { Faculty } from '../../entity/Users/Faculty';
import { Lecture } from '../../entity/Locations/Lecture';
import { Enrollment } from '../../entity/JoinTables/Enrollment';
const nodemailer = require('nodemailer');
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
			console.log(classToRemove);
			console.log(request.params.classCRN);

			if (classToRemove) {
				let facEmail = classToRemove.fID.userEmail;
				let studentEmail = "";
				if (enrollment === []) {
					let bool = await this.classRepository.delete(classToRemove);
					console.log('--------------------------AA---------------------------------')
					console.log(bool);
				}else {
					for (let i = 0; i < enrollment.length; i++){
						let stuEmail = enrollment[i].sID.userEmail;
						studentEmail += `${stuEmail},`;
						console.log('heerrrere')
						if (enrollment[i]) {
							console.log('--------here')
                    		await this.enrollmentRepository.delete(enrollment[i]);
						}
           		 }
			
				let bool = await this.classRepository.delete(classToRemove);
				let testAccount = await nodemailer.createTestAccount();

				let transporter = nodemailer.createTransport({
					host: "smtp.ethereal.email",
					port: 587,
					secure: false, // true for 465, false for other ports
					auth: {
						user: testAccount.user, // generated ethereal user
						pass: testAccount.pass, // generated ethereal password
					},
				});

			

				let info = await transporter.sendMail({
					from: '"Administration " <Administration@guptaUniversity.edu>', // sender address
					to: studentEmail, // list of receivers
					subject: "Course Deletion", // Subject line
					text: "Dear student, " + "\n" + " This is an automated message to alert you that,"+ classToRemove.courseID.courseName +  " has been removed from the " + classToRemove.semesterID.semesterName + classToRemove.semesterID.yearNum + " semester.", // plain text body
					// html: "<b>Hello world?</b>", // html body
				});

		  		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
				console.log('-------------------------A----------------------------------')
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
				let facEmail = oldClass.fID.userEmail;
				let studentEmail = "";
				let enrollment = await this.enrollmentRepository.find({where: {classCRN: oldClass}});
				for(let i = 0; i < enrollment.length; i++){
					let stuEmail = enrollment[i].sID.userEmail;
					studentEmail += `${stuEmail},`;
				}
				oldClass.slotID = newSlot;
				console.log(oldClass);
				this.classRepository.save(oldClass);

				// nodemailer
				let testAccount = await nodemailer.createTestAccount();

				let transporter = nodemailer.createTransport({
					host: "smtp.ethereal.email",
					port: 587,
					secure: false, // true for 465, false for other ports
					auth: {
						user: testAccount.user, // generated ethereal user
						pass: testAccount.pass, // generated ethereal password
					},
				});

				let info = await transporter.sendMail({
					from: '"Administration " <Administration@guptaUniversity.edu>', // sender address
					to: studentEmail, // list of receivers
					subject: "Class Time Changed", // Subject line
					text: "Dear student, " + "\n" + " This is an automated message to alert you that one of your currently enrolled courses, "+ oldClass.courseID.courseName +  ", has changed timeslots. It is now on these days, " + oldClass.slotID.days + ", And it will now start at: " + oldClass.slotID.periodID.startTime + " and end at: " + oldClass.slotID.periodID.endTime, // plain text body
					// html: "<b>Hello world?</b>", // html body
				});

				console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

				return true;
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

		if (newTeacher) {
			if (thisClass) {
				let facEmail = thisClass.fID.userEmail;
				let studentEmail = "";
				let enrollment = await this.enrollmentRepository.find({where: {classCRN: thisClass}});
				for(let i = 0; i < enrollment.length; i++){
					let stuEmail = enrollment[i].sID.userEmail;
					studentEmail = `${stuEmail}`;
				}
				thisClass.fID = newTeacher;
				this.classRepository.save(thisClass);

				// nodemailer
				let testAccount = await nodemailer.createTestAccount();

				let transporter = await nodemailer.createTransport({
					host: 'smtp.ethereal.email',
					port: 587,
					secure: false,
					auth:{
						user: testAccount.user,
						pass: testAccount.pass,
					},

				});

				let info = await transporter.sendMail({
					from: '"Administration" <Administration@guptaUniversity.edu',
					to: studentEmail,
					subject: "New Teacher",
					text: "Dear student, " + "\n" + "This is an automated message to alert you that one of your currently enrolled coureses, " + thisClass.courseID.courseName + " is now being taught by professor, " + newTeacher.userName,
					//html: not used
				});

				console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));


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
				let facEmail = thisClass.fID.userEmail;
				let studentEmail = "";
				let enrollment = await this.enrollmentRepository.find({where: {classCRN: thisClass}});
				for(let i = 0; i < enrollment.length; i++ ){
					let stuEmail = enrollment[i].sID.userEmail;
					studentEmail = `${stuEmail}`;
				}
				thisClass.roomID = newRoom;
				this.classRepository.save(thisClass);

				// nodemailer
				let testAccount = await nodemailer.createTestAccount();

				  let transporter = await nodemailer.createTransport({
                    host: 'smtp.ethereal.email',
                    port: 587,
                    secure: false,
                    auth:{
                        user: testAccount.user,
                        pass: testAccount.pass,
                    },

				});
				
				let info = await transporter.sendMail({
                    from: '"Administration" <Administration@guptaUniversity.edu',
                    to: studentEmail,
                    subject: "Room Change",
                    text: "Dear student, " + "\n" + "This is an automated message to alert you that one of your currently enrolled coureses, " + thisClass.courseID.courseName + " is now being taught in Room, " + newRoom.roomType + newRoom.roomNum,
                    //html: not used
				});
				

				console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));


				return "Room of " + thisClass.classCRN + ' has been successfully changed to ' + newRoom.roomID;
			}
			return "Class with CRN " + request.params.classCRN + ' not found'
		}
		return "No room found with id " + request.params.newRoom
	}

	async changeTotalSeats(request: Request, response: Response, next: NextFunction){
		// Give me a classCRN and new Number of seats
		let thisClass = await this.classRepository.findOne(request.params.classCRN);
		if(thisClass){
			thisClass.totalSeats = parseInt(request.params.numSeats);
			await this.classRepository.save(thisClass);
		}

	}
	async changeOpenSeats(request: Request, response: Response, next: NextFunction){
		// Give me a classCRN and new Number of seats
		let thisClass = await this.classRepository.findOne(request.params.classCRN);
		if(thisClass){
			thisClass.openSeats = parseInt(request.params.numSeats);
			await this.classRepository.save(thisClass);
		}
		return{done:false, msg: "Invalid classCRN entered"};
	}

	async changeClassSection(request: Request, response: Response, next: NextFunction){
		// Give me a classCRN and new Number of seats
		let thisClass = await this.classRepository.findOne(request.params.classCRN);
		if(thisClass){
			let str = "";
			if(parseInt(request.params.section) == 1){
				str = "001";
			}
			else if(parseInt(request.params.section) == 2){
				str = "002";
			}
			else if(parseInt(request.params.section) == 3){
				str = "003";
			}
			else{
				return{done: false, msg: "Invalid class section entered."};
			}
			thisClass.classSection = str;
			await this.classRepository.save(thisClass);
			return{done: true, msg: "Class section has been updated."};
		}
		return{done: false, msg: "Invalid classCRN entered."};
	}


}
