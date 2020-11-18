import { seeds } from './../index';
import { createConnection } from 'typeorm';
import { Graduate } from '../../entity/Users/Graduate';
import { GraduateFullTime } from '../../entity/Users/GraduateFullTime';
import { Student } from '../../entity/Users/Student';
import { Users } from '../../entity/Users/Users';

createConnection()
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
