import { seeds } from './../index';
import { createConnection } from 'typeorm';
import { Faculty } from '../../entity/Users/Faculty';
import { FacultyPartTime } from '../../entity/Users/FacultyPartTime';
import { Users } from '../../entity/Users/Users';

createConnection()
	.then(async (connection) => {

		const partTimeFacultySeed = seeds.partTimeFaculty.default;
		for (let i = 0; i < partTimeFacultySeed.length; i++) {
			try {
				const user = await connection.manager.create(Users, partTimeFacultySeed[i]);
				const fac = await connection.manager.create(Faculty, partTimeFacultySeed[i]);
				const partTimeFac = await connection.manager.create(FacultyPartTime, partTimeFacultySeed[i]);
				await connection.manager.save(user);
				await connection.manager.save(fac);
				await connection.manager.save(partTimeFac);
			} catch (error) {
				// console.error(error);
			}
		}
	}
	)
