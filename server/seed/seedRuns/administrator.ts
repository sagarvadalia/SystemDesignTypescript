import { seeds } from './../index';
import { createConnection } from 'typeorm';
import { Administrator } from '../../entity/Users/Administrator';

createConnection()
	.then(async (connection) => {

		const administratorsSeed = seeds.administrator.default;
		for (let i = 0; i < administratorsSeed.length; i++) {
			try {
				const administrators = await connection.manager.create(Administrator, administratorsSeed[i]);
				await connection.manager.save(administrators);
			} catch (error) {
				// console.error(error);
			}
		}
	}
	)
