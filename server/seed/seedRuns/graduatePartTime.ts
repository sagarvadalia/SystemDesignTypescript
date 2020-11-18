import { seeds } from './../index';
import { createConnection } from 'typeorm';
import { Graduate } from '../../entity/Users/Graduate';
import { GraduatePartTime } from '../../entity/Users/GraduatePartTime';
import { Student } from '../../entity/Users/Student';
import { Users } from '../../entity/Users/Users';

createConnection()
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
