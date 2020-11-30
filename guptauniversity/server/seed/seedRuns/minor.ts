import { seeds } from '../index';
import { createConnection } from 'typeorm';
import { Department } from '../../entity/Locations/Department';
import { Minor } from '../../entity/ClassRelated/Minor';

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

    const minorsSeed = seeds.minor.default;
    for (let i = 0; i < minorsSeed.length; i++) {
      try {
        const minors = await connection.manager.create(Minor, minorsSeed[i]);
        const dept = await connection.manager.findOne(Department, minorsSeed[i].deptID)
        dept ? minors.department = dept : console.log('no department found')
        await connection.manager.save(minors);
      } catch (error) {
        // console.error(error);
      }
    }
  }
  )
