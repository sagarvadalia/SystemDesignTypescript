import { seeds } from './../index';
import { createConnection } from 'typeorm';
import { Day } from '../../entity/TimeRelated/Day';

createConnection()
	.then(async (connection) => {

		const daysSeed = seeds.day.default;
		for (let i = 0; i < daysSeed.length; i++) {
			try {
				const days = await connection.manager.create(Day, daysSeed[i]);
				await connection.manager.save(days);
			} catch (error) {
				// console.error(error);
			}
		}
	}
	)
