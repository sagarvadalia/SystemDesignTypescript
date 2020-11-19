import { seeds } from './../index';
import { createConnection } from 'typeorm';
import { Course } from '../../entity/ClassRelated/Course';
import { Department } from '../../entity/Locations/Department';

createConnection({
	type: "postgres",
	host: "localhost",
	port: 5432,
	database: "studentregistration",
	synchronize: true,
	logging: true,
	entities: [__dirname + "./../../entity/**/*.ts"],
	migrations: [__dirname + "./../../migration/**/*.ts"],
	subscribers: [__dirname + "./../../subscriber/**/*.ts"],
	"cli": {
		"entitiesDir": __dirname + "./../../entity",
		"migrationsDir": __dirname + "./../../migration",
		"subscribersDir": __dirname + "./../../subscriber"
	}
})
	.then(async (connection) => {

		const coursesSeed = seeds.course.default;
		for (let i = 0; i < coursesSeed.length; i++) {
			try {

				const course = await connection.manager.create(Course, coursesSeed[i]);
				const department = await connection.manager.findOne(Department, coursesSeed[i].deptIDNum)
				console.log('-----------------', department);
				department ? course.deptID = department : console.log(department);
				await connection.manager.save(course);
			} catch (error) {
				// console.error(error);
			}
		}
	}
	)
