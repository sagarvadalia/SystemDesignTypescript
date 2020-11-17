import { seeds } from './../index';
import { createConnection } from 'typeorm';
import { Student } from '../../entity/Users/Student';
import { UnderGraduate } from '../../entity/Users/UnderGraduate';
import { UnderGraduateFullTime } from '../../entity/Users/UnderGraduateFullTime';
import { Users } from '../../entity/Users/Users';
import { Graduate } from '../../entity/Users/Graduate';
import { GraduateFullTime } from '../../entity/Users/GraduateFullTime';
import { GraduatePartTime } from '../../entity/Users/GraduatePartTime';
import { UnderGraduatePartTime } from '../../entity/Users/UnderGraduatePartTime';

createConnection()
    .then(async (connection) => {

        const undergraduatePartTimeSeed = seeds.undergraduatePartTime.default;
        for (let i = 0; i < undergraduatePartTimeSeed.length; i++) {
            try {
                const user = await connection.manager.create(Users, undergraduatePartTimeSeed[i])
                const student = await connection.manager.create(Student, undergraduatePartTimeSeed[i])
                const undergrad = await connection.manager.create(UnderGraduate, undergraduatePartTimeSeed[i])
                const undergradPartTime = await connection.manager.create(UnderGraduatePartTime, undergraduatePartTimeSeed[i]);
                await connection.manager.save(user);
                await connection.manager.save(student);
                await connection.manager.save(undergrad);
                await connection.manager.save(undergradPartTime);
            } catch (error) {
                // console.error(error);
            }
        }


        const undergraduateFullTimeSeed = seeds.undergraduateFullTime.default;
        for (let i = 0; i < undergraduateFullTimeSeed.length; i++) {
            try {
                const user = await connection.manager.create(Users, undergraduateFullTimeSeed[i])
                const student = await connection.manager.create(Student, undergraduateFullTimeSeed[i])
                const undergrad = await connection.manager.create(UnderGraduate, undergraduateFullTimeSeed[i])
                const undergradFullTime = await connection.manager.create(UnderGraduateFullTime, undergraduateFullTimeSeed[i]);
                await connection.manager.save(user);
                await connection.manager.save(student);
                await connection.manager.save(undergrad);
                await connection.manager.save(undergradFullTime);
            } catch (error) {
                // console.error(error);
            }
        }

        const graduateFullTimeSeed = seeds.graduateFullTime.default;
        for (let i = 0; i < graduateFullTimeSeed.length; i++) {
            try {
                const user = await connection.manager.create(Users, graduateFullTimeSeed[i])
                const student = await connection.manager.create(Student, graduateFullTimeSeed[i])
                const grad = await connection.manager.create(Graduate, graduateFullTimeSeed[i])
                const fullTimeGrad = await connection.manager.create(GraduateFullTime, graduateFullTimeSeed[i]);
                await connection.manager.save(user);
                await connection.manager.save(student);
                await connection.manager.save(grad);
                await connection.manager.save(fullTimeGrad);
            } catch (error) { }
        }


        const graduatePartTimeSeed = seeds.graduatePartTime.default;
        for (let i = 0; i < graduatePartTimeSeed.length; i++) {
            try {
                const user = await connection.manager.create(Users, graduatePartTimeSeed[i])
                const student = await connection.manager.create(Student, graduatePartTimeSeed[i])
                const grad = await connection.manager.create(Graduate, graduatePartTimeSeed[i])
                const partTimeGrad = await connection.manager.create(GraduatePartTime, graduatePartTimeSeed[i]);
                await connection.manager.save(user);
                await connection.manager.save(student);
                await connection.manager.save(grad);
                await connection.manager.save(partTimeGrad);
            } catch (error) {
                // console.error(error);
            }
        }
    }
    )
