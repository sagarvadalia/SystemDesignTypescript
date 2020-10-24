import * as bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Class } from './entity/Class';
import { Routes } from './routes';
import { ResponseError } from './util/ResponseError';
import { Room } from './entity/Room';
import morgan = require('morgan');
import compression = require('compression');
import session = require('express-session');
import path = require('path');
import { Semester } from './entity/Semester';
import { Researcher } from './entity/Researcher';
import { Advisor } from './entity/Advisor';
import { Student } from './entity/Student';
import { Faculty } from './entity/Faculty';

createConnection()
	.then(async (connection) => {
		// create express app
		const app = express();
		app.use(bodyParser.json());
		app.use(morgan('dev'));
		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));
		app.use(compression());
		app.use(
			session({
				secret: process.env.SESSION_SECRET || 'no secret yet',
				resave: false,
				saveUninitialized: false,
			}),
		);


		//TODO: Will worry about this when we are working on the client side of things
		// static file-serving middleware
		// app.use(express.static(path.join(__dirname, '..', 'public')))

		app.use((req, res, next) => {
			if (path.extname(req.path).length) {
				const err: ResponseError = new Error('Not Found');
				err.status = 404;
				next(err);
			} else {
				next();
			}
		});

		// TODO: index.html ---> we havent made this yet
		// app.use('*', (req, res) => {
		// 		res.sendFile(path.join(__dirname, '..', 'public/index.html'))
		// })

		// register express routes from defined application routes
		Routes.forEach((route) => {
			(app as any)[route.method](route.route, (req: Request, res: Response, next: Response) => {
				const result = new (route.controller as any)()[route.action](req, res, next);
				if (result instanceof Promise) {
					result.then((result) => (result !== null && result !== undefined ? res.send(result) : undefined));
				} else if (result !== null && result !== undefined) {
					res.json(result);
				}
			});
		});

		// setup express app here
		// ...
		// error handling endware
		app.use((err, req, res, next) => {
			console.error(err);
			console.error(err.stack);
			res.status(err.status || 500).send(err.message || 'Internal server error.');
		});

		// start express server
		app.listen(3000);
		const semester = [
			{ semesterName: 'spring', yearNum: 2019 },
			{ semesterName: 'fall', yearNum: 2020 },
		];

		for (let i = 0; i < semester.length; i++) {
			await connection.manager.save(connection.manager.create(Semester, semester[i]));
		}


		await connection.manager.save(
			connection.manager.create(Semester, {
				semesterName: 'spring',
				yearNum: 2020,
			}),
		);

		//The following comment is a test including a tuple for each: Student, Faculty, Advisor (THIS IS BROKEN AFTER FACULTY SCHEMA REVISION)
		/* 		await connection.manager.save(
					connection.manager.create(Student, {
						userID: 700505,
						userName: "Tyler Heinsohn",
						userEmail: "tjheinzo@aol.com",
						userPassword: "password",
						userPhone: '2',
						userAddress: "239 lanelane lane lane",
						userType: "Student",
						sGPA: 4.0,
						sGradYear: 2021,
						sDOB: "10/19/1996",
						totalCredits: 1003,
						studentType: "undergrad",
					}),
				);
		
				await connection.manager.save(
					connection.manager.create(Faculty, {
						userID: 10034,
						userName: "Tyler Heinsohn",
						userEmail: "tjheinzo@aol.com",
						userPassword: "password",
						userPhone: '2',
						userAddress: "239 lanelane lane lane",
						userType: "Faculty",
						fTenure: false,
						fOfficeNumber: "2021",
						isFullTime: true,
					}),
				);
		
				await connection.manager.save(
					connection.manager.create(Advisor, {
						sID: 700505,
						fID: 10034,
						dateAssigned: "1/1/1111",
					}),
				); */






		//await connection.manager.save(
		//	connection.manager.create(Researcher, {
		//		researchSalary: 'spring',
		//		resarchOfficeNum: 12,
		//	}),
		//	);

		// test for creating a room
		// await connection.manager.save(
		// 	connection.manager.create(Room, {
		// 		roomNum: 32,
		// 		capacity: 2,
		// 		roomType: 'lecture',
		// 	}),
		// );
		// test for creating a class
		// await connection.manager.save(
		// 	connection.manager.create(Class, {
		// 		classSection: 'a-24',
		// 		numOfSeats: 2,
		// 	}),
		// );
		// insert new minor for test
		// await connection.manager.save(
		// 	connection.manager.create(Minor, {
		// 		minorName: 'science',
		// 	}),
		// );

		// insert new faculty for test
		// await connection.manager.save(connection.manager.create(Faculty, {
		//     ftenure: true,
		//     fOfficeNumber: 'a-3',
		//     isFullTime: false,
		//     userName: "Timber23",
		//     userEmail: "Saw@23.com",
		//     userPassword: 'ab3ccas',
		//     userPhone: "51634344443",
		//     userAddress: '12433 Main St',
		//     userType: 'Student'
		// }));
		// Insert new days
		// await connection.manager.save(connection.manager.create(Day, {
		//     dayName: 'Monday3'
		// }));
		// await connection.manager.save(connection.manager.create(Day, {
		//     dayName: 'Tuesday3'
		// }));

		console.log('Express server has started on port 3000. Open http://localhost:3000/users to see results');
	})
	.catch((error) => console.log(error));
