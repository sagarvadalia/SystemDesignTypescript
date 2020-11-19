import { seeds } from './../index';
import { createConnection } from 'typeorm';
import { Hold } from '../../entity/StudentRelated/Hold';

createConnection({
  type: "postgres",
  host: "localhost",
  port: 5432,
  database: "studentregistration",
  synchronize: true,
  logging: true,
  entities: [__dirname + "./../../entity/**/*.ts"],
  migrations: [__dirname + "./../../migration/**/*.ts"],
  subscribers: [__dirname + "./../../subscriber/**/*.ts"],
  "cli": {
    "entitiesDir": __dirname + "./../../entity",
    "migrationsDir": __dirname + "./../../migration",
    "subscribersDir": __dirname + "./../../subscriber"
  }
})
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
