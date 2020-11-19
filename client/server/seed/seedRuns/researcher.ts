import { seeds } from './../index';
import { createConnection } from 'typeorm';
import { Researcher } from '../../entity/Users/Researcher';
import { Users } from '../../entity/Users/Users';

createConnection()
	.then(async (connection) => {

		const researchersSeed = seeds.researcher.default;
		for (let i = 0; i < researchersSeed.length; i++) {
			try {
				const user = await connection.manager.create(Users, researchersSeed[i])
				const researchers = await connection.manager.create(Researcher, researchersSeed[i]);
				await connection.manager.save(user);
				await connection.manager.save(researchers);
			} catch (error) {
				// console.error(error);
			}
		}

	}
	)
