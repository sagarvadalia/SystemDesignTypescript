import { seeds } from '../index';
import { createConnection } from 'typeorm';
import { Graduate } from '../../entity/Users/Graduate';
import { GraduatePartTime } from '../../entity/Users/GraduatePartTime';
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

		const graduatePartTimeSeed = seeds.graduatePartTime.default;
		for (let i = 0; i < graduatePartTimeSeed.length; i++) {
			try {
				const user = await connection.manager.create(Users, graduatePartTimeSeed[i])
				const student = await connection.manager.create(Student, graduatePartTimeSeed[i])
				const grad = await connection.manager.create(Graduate, graduatePartTimeSeed[i])
				const partTimeGrad = await connection.manager.create(GraduatePartTime, graduatePartTimeSeed[i]);
				await connection.manager.save(user);
				await connection.manager.save(student);
				await connection.manager.save(grad);
				await connection.manager.save(partTimeGrad);
			} catch (error) {
				// console.error(error);
			}
		}
	}
	)
