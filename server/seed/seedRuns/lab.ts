import { seeds } from './../index';
import { createConnection } from 'typeorm';
import { Building } from '../../entity/Locations/Building';
import { Lab } from '../../entity/Locations/Lab';

createConnection()
    .then(async (connection) => {

        let labsSeed = seeds.lab.default;
        for (let i = 0; i < labsSeed.length; i++) {
            try {
                const building = await connection.manager.findOne(Building, labsSeed[i].buildingID);
                const lab = await connection.manager.create(Lab, labsSeed[i]);
                building ? lab.buildings = building : console.log("Building doesn't exist")

                await connection.manager.save(lab);
            } catch (error) {
                //console.error(error);
            }
        }
    }
    )
