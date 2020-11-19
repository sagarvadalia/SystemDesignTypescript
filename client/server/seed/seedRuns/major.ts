import { seeds } from './../index';
import { createConnection } from 'typeorm';
import { Major } from '../../entity/ClassRelated/Major';
import { Department } from '../../entity/Locations/Department';

createConnection()
	.then(async (connection) => {

		const majorsSeed = seeds.major.default;
		for (let i = 0; i < majorsSeed.length; i++) {
			try {
				const majors = await connection.manager.create(Major, majorsSeed[i]);
				const dept = await connection.manager.findOne(Department, majorsSeed[i].deptID)
				dept ? majors.department = dept : console.log('no department found')
				await connection.manager.save(majors);
			} catch (error) {
				// console.error(error);
			}
		}
	}
	)
