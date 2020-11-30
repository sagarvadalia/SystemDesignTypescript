import { seeds } from '../index';
import { createConnection } from 'typeorm';
import { Graduate } from '../../entity/Users/Graduate';
import { GraduateFullTime } from '../../entity/Users/GraduateFullTime';
import { Student } from '../../entity/Users/Student';
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

		const graduateFullTimeSeed = seeds.graduateFullTime.default;
		for (let i = 0; i < graduateFullTimeSeed.length; i++) {
			try {
				const user = await connection.manager.create(Users, graduateFullTimeSeed[i])
				const student = await connection.manager.create(Student, graduateFullTimeSeed[i])
				const grad = await connection.manager.create(Graduate, graduateFullTimeSeed[i])
				const fullTimeGrad = await connection.manager.create(GraduateFullTime, graduateFullTimeSeed[i]);
				await connection.manager.save(user);
				await connection.manager.save(student);
				await connection.manager.save(grad);
				await connection.manager.save(fullTimeGrad);
			} catch (error) { }
		}
	}
	)
