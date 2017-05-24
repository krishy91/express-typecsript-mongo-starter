import {Router, Request, Response, NextFunction} from 'express';
import mongoose = require("mongoose");
import {User} from "../models/user";
import {IUser} from "../interfaces/user";

export class UserRouter{
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  public createUser(req: Request, res: Response, next: NextFunction) {
    let someUser = new User(req.body);
    someUser.save().then(user => {
      console.log({success: true, message: "User added to db."});
      res.json({
          message: "User added to db."
      });
    }).catch(err => {
      console.log({success: false, message: "User not added to db."});
      res.json({
          message: "User not added to db."
      });
    });
  }

  public getAllUsers(req: Request, res: Response, next: NextFunction) {
    User.find({}, function(err, users) {
      res.json({users: users});
    });
  }

  init() {
    this.router.post('/', this.createUser);
    this.router.get('/', this.getAllUsers);
  }
}

const userRoutes = new UserRouter();
userRoutes.init();

export default userRoutes.router;
