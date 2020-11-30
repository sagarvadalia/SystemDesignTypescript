import { seeds } from '../index';
import { createConnection } from 'typeorm';
import { Building } from '../../entity/Locations/Building';
import { Office } from '../../entity/Locations/Office';

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

        const officesSeed = seeds.office.default;
        for (let i = 0; i < officesSeed.length; i++) {
            try {
                const building = await connection.manager.findOne(Building, officesSeed[i].buildingID);
                const office = await connection.manager.create(Office, officesSeed[i]);
                building ? office.buildings = building : console.log("Building doesn't exist");

                await connection.manager.save(office);
            } catch (error) {
                //console.error(error);
            }
        }
    }
    )
