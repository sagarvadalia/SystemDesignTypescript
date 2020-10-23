import "reflect-metadata";
import {createConnection} from "typeorm";
import express, {Request, Response} from 'express'
import * as bodyParser from "body-parser";
import {Routes} from "./routes";
import { User } from "./entity/User";
import { ResponseError } from './util/ResponseError';
import morgan = require("morgan");
import compression = require("compression");
import session = require("express-session");
import path = require("path");






createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(morgan('dev'));
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }));
    app.use(compression());
    app.use(session({
        secret: process.env.SESSION_SECRET || 'no secret yet',
        resave: false,
        saveUninitialized: false
    }));

    //TODO: Will worry about this when we are working on the client side of things
	// static file-serving middleware
	// app.use(express.static(path.join(__dirname, '..', 'public')))

    app.use((req, res, next) => {
        if (path.extname(req.path).length) {
            const err: ResponseError = new Error('Not Found')
            err.status = 404
            next(err)
        }
        else {
            next()
        }
    })

    // index.html ---> we havent made this yet
    // app.use('*', (req, res) => {
	// 		res.sendFile(path.join(__dirname, '..', 'public/index.html'))
    // })

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // setup express app here
    // ...
      	// error handling endware
	app.use((err, req, res, next) => {
			console.error(err)
			console.error(err.stack)
			res
				.status(err.status || 500)
				.send(err.message || 'Internal server error.')
		})


    // start express server
    app.listen(3000);




    // insert new users for test
    await connection.manager.save(connection.manager.create(User, {
        userName: "Timber",
        userEmail: "Saw@Timber.com",
        userPassword: 'abccas',
        userPhone: 5163444444,
        userAddress: '123 Main St',
        userType: 'Student'
    }));

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));
