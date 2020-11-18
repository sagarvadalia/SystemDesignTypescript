import { seeds } from './../index';
import { createConnection } from 'typeorm';
import { Period } from '../../entity/TimeRelated/Period';

createConnection()
	.then(async (connection) => {

		const periodsSeed = seeds.period.default;
		for (let i = 0; i < periodsSeed.length; i++) {
			try {
				const period = await connection.manager.create(Period, periodsSeed[i]);
				await connection.manager.save(period);
			} catch (error) {
				// console.error(error);
			}
		}
	}
	)
