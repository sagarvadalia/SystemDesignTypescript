import {createConnection} from "typeorm";
import express, { Request, Response } from 'express'
import { User } from "./../entity/User";
const router = express.Router();

router.get('/allusers', async (req, res, next) => {
  try {
    let connection = await createConnection()
    // let user = new User();
    // user.firstName = "abc"
    // user.lastName = "abcasasdasdd"
    // user.age = 5
    // await connection.manager.save(connection.manager.create(User, { firstName: "abc", lastName: "abcasd", age: 5 }))
    // await connection.manager.save(connection.manager.create(User, user))
    let users = await connection.manager.find(User)
    return res.json(users)
  } catch (error) {
    console.error(error);
  }



});
module.exports = router;
