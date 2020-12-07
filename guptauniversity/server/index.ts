import * as bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import { createConnection } from 'typeorm';
import { Routes } from './routes';
import { ResponseError } from './util/ResponseError';
import morgan from 'morgan';
import session from 'express-session';
import path from 'path';
import compression from 'compression';

createConnection({
	type: "postgres",
	host: "localhost",
	port: 5432,
	database: "studentregistration",
	synchronize: true,
	logging: true,
	entities: [__dirname + "/entity/**/*.ts"],
	migrations: [__dirname + "/migration/**/*.ts"],
	subscribers: [__dirname + "/subscriber/**/*.ts"],
	"cli": {
		"entitiesDir": __dirname + "/entity",
		"migrationsDir": __dirname + "/migration",
		"subscribersDir": __dirname + "/subscriber"
	}
})
	.then(async connection => {
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
		app.use((req, res, next) => {
			if (path.extname(req.path).length) {
				const err: ResponseError = new Error('Not Found');
				err.status = 404;
				next(err);
			} else {
				next();
			}
		});

		app.use((err, req, res, next) => {
			console.error(err);
			console.error(err.stack);
			res.status(err.status || 500).send(err.message || 'Internal server error.');
		});

		//TODO: Will worry about this when we are working on the client side of things
		// static file-serving middleware
		// app.use(express.static(path.join(__dirname, '..', 'public')))


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


		// start express server
		// Example of creating an Advisor

		app.listen(8080);

		console.log('Express server has started on port 8080. Open http://localhost:8080/api/users to see results');
	})
	.catch((error) => console.log(error));

