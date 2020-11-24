import { seeds } from './../index';
import { createConnection } from 'typeorm';
import { Administrator } from '../../entity/Users/Administrator';
import { Users } from '../../entity/Users/Users';

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
				const user1 = await connection.manager.create(Users, administratorsSeed[i])
				const administrators = await connection.manager.create(Administrator, administratorsSeed[i]);

				await connection.manager.save(user1);
				await connection.manager.save(administrators);
			} catch (error) {
				// console.error(error);
			}
		}
	}
	)
