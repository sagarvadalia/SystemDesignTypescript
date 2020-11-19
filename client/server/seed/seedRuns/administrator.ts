import { seeds } from './../index';
import { createConnection } from 'typeorm';
import { Administrator } from '../../entity/Users/Administrator';

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

		const administratorsSeed = seeds.administrator.default;
		for (let i = 0; i < administratorsSeed.length; i++) {
			try {
				const administrators = await connection.manager.create(Administrator, administratorsSeed[i]);
				await connection.manager.save(administrators);
			} catch (error) {
				// console.error(error);
			}
		}
	}
	)
