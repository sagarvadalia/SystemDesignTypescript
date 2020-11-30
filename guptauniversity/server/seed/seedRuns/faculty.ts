import { seeds } from '../index';
import { createConnection } from 'typeorm';
import { FacultyFullTime } from '../../entity/Users/FacultyFullTime';
import { Office } from '../../entity/Locations/Office';
import { Faculty } from '../../entity/Users/Faculty';
import { Users } from '../../entity/Users/Users';
import { FacultyPartTime } from '../../entity/Users/FacultyPartTime';

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

        const fullTimeFacultySeed = seeds.fullTimeFaculty.default;
        for (let i = 0; i < fullTimeFacultySeed.length; i++) {
            try {
                const user = await connection.manager.create(Users, fullTimeFacultySeed[i]);
                const fac = await connection.manager.create(Faculty, fullTimeFacultySeed[i]);
                const fullTimeFac = await connection.manager.create(FacultyFullTime, fullTimeFacultySeed[i]);
                let room = await connection.manager.findOne(Office, fullTimeFacultySeed[i].roomIDNum)
                if (room) {
                    fullTimeFac.roomID = room;

                    await connection.manager.save(user);
                    await connection.manager.save(fac);
                    await connection.manager.save(fullTimeFac);
                    // let facCheck = await connection.manager.findOne(FacultyFullTime, faculty.userID)
                    // console.log(facCheck);
                }

            } catch (error) {
                console.error(error);
            }
        }



        const partTimeFacultySeed = seeds.partTimeFaculty.default;
        for (let i = 0; i < partTimeFacultySeed.length; i++) {
            try {
                const user = await connection.manager.create(Users, partTimeFacultySeed[i]);
                const fac = await connection.manager.create(Faculty, partTimeFacultySeed[i]);
                const partTimeFac = await connection.manager.create(FacultyPartTime, partTimeFacultySeed[i]);
                await connection.manager.save(user);
                await connection.manager.save(fac);
                await connection.manager.save(partTimeFac);
            } catch (error) {
                // console.error(error);
            }
        }
    }
    )
