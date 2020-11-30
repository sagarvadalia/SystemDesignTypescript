import { seeds } from '../index';
import { createConnection } from 'typeorm';
import { Period } from '../../entity/TimeRelated/Period';

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

		const periodsSeed = seeds.period.default;
		for (let i = 0; i < periodsSeed.length; i++) {
			try {
				const period = await connection.manager.create(Period, periodsSeed[i]);
				await connection.manager.save(period);
			} catch (error) {
				// console.error(error);
			}
		}
	}
	)
