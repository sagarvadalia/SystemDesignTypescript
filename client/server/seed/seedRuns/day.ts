import { seeds } from './../index';
import { createConnection } from 'typeorm';
import { Day } from '../../entity/TimeRelated/Day';

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

		const daysSeed = seeds.day.default;
		for (let i = 0; i < daysSeed.length; i++) {
			try {
				const days = await connection.manager.create(Day, daysSeed[i]);
				await connection.manager.save(days);
			} catch (error) {
				// console.error(error);
			}
		}
	}
	)
