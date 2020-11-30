import { seeds } from '../index';
import { createConnection } from 'typeorm';

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

    }
    )
