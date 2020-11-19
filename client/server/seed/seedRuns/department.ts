import { seeds } from './../index';
import { createConnection } from 'typeorm';
import { Department } from '../../entity/Locations/department';
import { Office } from '../../entity/Locations/Office';
import { FacultyFullTime } from '../../entity/Users/FacultyFullTime';

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

		const departmentsSeed = seeds.department.default;
		for (let i = 0; i < departmentsSeed.length; i++) {
			try {
				const departments = await connection.manager.create(Department, departmentsSeed[i]);
				try {
					console.log(departmentsSeed[i].deptHeadIDNum)
					// const faculty = await connection.manager.findOne(Faculty, department[i].deptHeadIDNum)
					const faculty2 = await connection.manager.findOne(FacultyFullTime, departmentsSeed[i].deptHeadIDNum)
					// const faculty3 = await connection.manager.findOne(FacultyPartTime, department[i].deptHeadIDNum)
					const room = await connection.manager.findOne(Office, departmentsSeed[i].roomIDNum)
					// console.log(faculty);
					console.log(faculty2);
					// console.log(faculty3);
					// console.log(room)
					if (room && faculty2) {
						departments.roomID = room;
						departments.deptHeadID = faculty2;
						let dept = await connection.manager.save(departments);
						console.log(dept)
					}
				} catch (error) {

				}

			} catch (error) {
				// console.error(error);
			}
		}
	}
	)
