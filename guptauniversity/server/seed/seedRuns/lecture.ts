import { seeds } from '../index';
import { createConnection } from 'typeorm';
import { Building } from '../../entity/Locations/Building';
import { Lecture } from '../../entity/Locations/Lecture';

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

        let lecturesSeed = seeds.lecture.default;
        for (let i = 0; i < lecturesSeed.length; i++) {
            try {
                const building = await connection.manager.findOne(Building, lecturesSeed[i].buildingID);
                const lecture = await connection.manager.create(Lecture, lecturesSeed[i]);
                building ? lecture.buildings = building : console.log("Building Doesn't exist");

                await connection.manager.save(lecture);
            } catch (error) {
                //console.error(error);
            }
        }
    }
    )
