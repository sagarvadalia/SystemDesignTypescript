import { seeds } from './../index';
import { createConnection } from 'typeorm';
import { Hold } from '../../entity/StudentRelated/Hold';

createConnection()
  .then(async (connection) => {

    const holdsSeed = seeds.holds.default
    for (let i = 0; i < holdsSeed.length; i++) {
      try {
        const hold = await connection.manager.create(Hold, holdsSeed[i])
        await connection.manager.save(hold)
      } catch (error) {

      }
    }
    const holds = await connection.manager.find(Hold)
  }
  )
