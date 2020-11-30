import { seeds } from '../index';
import { createConnection } from 'typeorm';
import { Student } from '../../entity/Users/Student';
import { UnderGraduate } from '../../entity/Users/UnderGraduate';
import { UnderGraduatePartTime } from '../../entity/Users/UnderGraduatePartTime';
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

		const undergraduatePartTimeSeed = seeds.undergraduatePartTime.default;
		for (let i = 0; i < undergraduatePartTimeSeed.length; i++) {
			try {
				const user = await connection.manager.create(Users, undergraduatePartTimeSeed[i])
				const student = await connection.manager.create(Student, undergraduatePartTimeSeed[i])
				const undergrad = await connection.manager.create(UnderGraduate, undergraduatePartTimeSeed[i])
				const undergradPartTime = await connection.manager.create(UnderGraduatePartTime, undergraduatePartTimeSeed[i]);
				await connection.manager.save(user);
				await connection.manager.save(student);
				await connection.manager.save(undergrad);
				await connection.manager.save(undergradPartTime);
			} catch (error) {
				// console.error(error);
			}
		}
	}
	)
