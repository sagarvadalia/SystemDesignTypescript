import { seeds } from './../index';
import { createConnection } from 'typeorm';
import { TimeSlot } from '../../entity/TimeRelated/TimeSlot';

createConnection()
  .then(async (connection) => {

    const timeslotsSeed = seeds.timeslots.default
    for (let i = 0; i < timeslotsSeed.length; i++) {
      try {
        const timeslot = await connection.manager.create(TimeSlot, timeslotsSeed[i])
        await connection.manager.save(timeslot)
      } catch (error) {
      }
    }
  }
  )
