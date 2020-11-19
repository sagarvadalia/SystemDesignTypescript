import { seeds } from './../index';
import { createConnection } from 'typeorm';
import { FacultyDepartment } from '../../entity/JoinTables/FacultyDepartment';
import { Faculty } from '../../entity/Users/Faculty';
import { Department } from '../../entity/Locations/Department';

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

        //Faculty Departments
        const departments = await connection.manager.find(Department)
        for (let i = 0; i < departments.length; i++) {
            try {
                const head = departments[i].deptHeadID
                const deptHead = await connection.manager.findOne(Faculty, head)
                if (deptHead) {
                    const facDep = await connection.manager.create(FacultyDepartment, {
                        fID: deptHead,
                        deptID: departments[i],
                        percentOfTime: '100%',
                        dateAppointed: new Date('November 12, 2020 04:28:00')

                    })
                    await connection.manager.save(facDep)
                }

            } catch (error) {
                console.error(error)
            }

        }

    }
    )
