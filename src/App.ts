import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import mongoose = require("mongoose");
import {User} from "./models/user";
import {IUser} from "./interfaces/user";

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.dbConfig();
    this.middleware();
    this.routes();
  }

  private dbConfig(): void{
    global.Promise = require("q").Promise;

    mongoose.Promise = global.Promise;
    //connect to mongoose

    let connection = "mongodb://localhost:27017/test";

    mongoose.connect(connection);

   mongoose.connection.on("connected", () => {
     console.log("Connected to database " + connection);
   });
   mongoose.connection.on("error", (err) => {
     console.log("Database error " + err);
   });
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router();
    // placeholder route handler
    router.get('/', (req, res, next) => {
      let someUser = new User({
      email: "foo@bar.com",
      firstName: "Brian",
      lastName: "Love"
    });
    someUser.save().then(user => {
      console.log({success: true, message: "User added to db."});
    }).catch(err => {
      console.log({success: false, message: "User not added to db."});
    });
    res.json({
        message: 'Hello World!'
      });
    });
    this.express.use('/', router);
  }

}

export default new App().express;
