import { seeds } from './../index';
import { createConnection } from 'typeorm';
import { Building } from '../../entity/Locations/Building';
createConnection()
  .then(async (connection) => {
    //----------------------BUILDING------------------------------------------
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
