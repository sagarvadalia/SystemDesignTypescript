import { seeds } from './../index';
import { createConnection } from 'typeorm';
import { Building } from '../../entity/Locations/Building';
import { Office } from '../../entity/Locations/Office';

createConnection()
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
