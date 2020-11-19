import { seeds } from './../index';
import { createConnection } from 'typeorm';
import { FacultyFullTime } from '../../entity/Users/FacultyFullTime';
import { Office } from '../../entity/Locations/Office';
import { Faculty } from '../../entity/Users/Faculty';
import { Users } from '../../entity/Users/Users';

createConnection()
	.then(async (connection) => {

		const fullTimeFacultySeed = seeds.fullTimeFaculty.default;
		for (let i = 0; i < fullTimeFacultySeed.length; i++) {
			try {
				const user = await connection.manager.create(Users, fullTimeFacultySeed[i]);
				const fac = await connection.manager.create(Faculty, fullTimeFacultySeed[i]);
				const fullTimeFac = await connection.manager.create(FacultyFullTime, fullTimeFacultySeed[i]);
				let room = await connection.manager.findOne(Office, fullTimeFacultySeed[i].roomIDNum)
				if (room) {
					fullTimeFac.roomID = room;

					await connection.manager.save(user);
					await connection.manager.save(fac);
					await connection.manager.save(fullTimeFac);
					// let facCheck = await connection.manager.findOne(FacultyFullTime, faculty.userID)
					// console.log(facCheck);
				}

			} catch (error) {
				console.error(error);
			}
		}
	}
	)
