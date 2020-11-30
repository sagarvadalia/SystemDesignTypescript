import { seeds } from '../index';
import { createConnection } from 'typeorm';
import { Building } from '../../entity/Locations/Building';

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

    const buildingsSeed = seeds.building.default;
    for (let i = 0; i < buildingsSeed.length; i++) {
      try {
        const buildings = await connection.manager.create(Building, buildingsSeed[i]);
        //console.log(buildings);
        await connection.manager.save(buildings);
      } catch (error) {
        // console.error(error);
      }
    }
  })
