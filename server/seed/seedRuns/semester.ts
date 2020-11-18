import { seeds } from './../index';
import { createConnection } from 'typeorm';
import { Semester } from '../../entity/TimeRelated/Semester';

createConnection()
	.then(async (connection) => {

		const semestersSeed = seeds.semester.default;
		for (let i = 0; i < semestersSeed.length; i++) {
			try {
				const semester = await connection.manager.create(Semester, semestersSeed[i]);
				await connection.manager.save(semester);
			} catch (error) {
				// console.error(error);
			}
		}
	}
	)
