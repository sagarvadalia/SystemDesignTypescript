import { seeds } from '../index';
import { createConnection } from 'typeorm';
import { Semester } from '../../entity/TimeRelated/Semester';

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

		const semestersSeed = seeds.semester.default;
		for (let i = 0; i < semestersSeed.length; i++) {
			try {
				const semester = await connection.manager.create(Semester, semestersSeed[i]);
				await connection.manager.save(semester);
			} catch (error) {
				// console.error(error);
			}
		}
	}
	)
